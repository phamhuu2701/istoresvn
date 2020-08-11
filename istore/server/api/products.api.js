const express = require('express');
const router = express.Router();
const config = require('config');

const ProductDao = require('../dao/product.dao');
const StoreDao = require('../dao/store.dao');
const UserDao = require('../dao/user.dao');

const ProductModel = require('../models/product.model');

const mailer = require('../util/mailer');
const slug = require('../util/slug');
const upload = require('../util/multer');

var pathModule = require('path');
var cloudinary = require('../../config/coudinaryConfig');
var multiparty = require('../../config/multipartyConfig');
var fs = require('../../config/fsConfig');

router
    .route('/')
    .get(async (req, res, next) => {
        if (req.query.search) {
            const { lat, lng, distance } = req.query;

            const search = slug(req.query.search, '.*');

            // Find product by product name
            ProductDao.searchByName(search)
                .then(products => {
                    if (products.length > 0) {
                        // Get product ids

                        let results;
                        // Find store by products list
                        addStoreIntoProduct(
                            products,
                            [parseFloat(lng), parseFloat(lat)],
                            distance,
                            results => {
                                if (results.length > 0) {
                                    return res.status(200).json(results);
                                } else {
                                    return res.status(201).json({
                                        mesage:
                                            'Không tìm thấy sản phẩm mong muốn!'
                                    });
                                }
                            }
                        );
                    } else {
                        return res.status(201).json({
                            mesage: 'Không tìm thấy sản phẩm mong muốn!'
                        });
                    }
                })
                .catch(err => console.log(err));
        } else {
            ProductDao.find()
                .then(products => {
                    res.json(products);
                })
                .catch(err => console.log(err));
        }
    })
    .post((req, res) => {
        upload.array('files', 10)(req, res, async err => {
            // Add new product
            const storeId = req.body.storeId;
            let images = [];
            // Local - Just comment, Don't Delete !important
            // req.files.forEach(file => {
            //     const p = file.path;
            //     const index = p.indexOf('img');
            //     const path = '/' + p.slice(index);
            //     images.push(path);
            // });
            for (let i = 0; i < req.files.length; i++) {
                let file = req.files[i];
                // check file type image
                let ext = pathModule.extname(file.path);
                if (
                    ext !== '.png' &&
                    ext !== '.jpg' &&
                    ext !== '.gif' &&
                    ext !== '.jpeg'
                ) {
                    console.log('error: only image are allowed');
                } else {
                    // save file into cloudinary
                    await cloudinary.uploadFile('image', file).then(
                        result => {
                            console.log('image saved into cloudinary');

                            // set avatar link into user
                            // console.log(result);
                            console.log(result.url);

                            images.push(result.url);
                        },
                        error => {
                            console.log(
                                'error: save image into cloudinary fail'
                            );
                        }
                    );
                }
            }
            for (let i = 0; i < req.files.length; i++) {
                let file = req.files[i];
                // delete file in server
                let b = fs.deleteFileInServer(file.path);
                if (!b) {
                    console.log('error: delete file in server fail');
                } else {
                    console.log('file in server deleted');
                }
            }

            const product = {
                name: req.body.productName,
                nameRemoveAccents: slug(req.body.productName, ' '),
                productCategory: req.body.productCategory,
                description: req.body.productDecription,
                price: req.body.productPrice,
                saleoff: req.body.productSaleOff,
                producerCode: req.body.productProducerCode,
                images: images
            };
            const productModel = new ProductModel(product);
            const newProduct = await ProductDao.save(productModel);

            // Push product id into store
            StoreDao.addProductIntoStore(storeId, newProduct._id)
                .then(result => {
                    // Check store is VIP?
                    // if (
                    //     req.session.user.maxStoresCountCreated.count > 1 &&
                    //     req.session.user.maxStoresCountCreated.timeLimited -
                    //         Date.now() >
                    //         0
                    // ) {
                    // Check interest from user
                    const productNameRemoveAccent = slug(
                        req.body.productName,
                        '.*'
                    );
                    UserDao.findInterest(productNameRemoveAccent)
                        .then(users => {
                            if (users.length > 0) {
                                // send mail
                                users.forEach(user => {
                                    const interests = user.interests;
                                    let interestId;
                                    if (interests.length === 1) {
                                        interestId = interests[0]._id;
                                    } else {
                                        const i = interests.findIndex(
                                            interest => {
                                                return (
                                                    interest.productNameRemoveAccent.includes(
                                                        ...nameRemoveAccents.split(
                                                            ' '
                                                        )
                                                    ) === true
                                                );
                                            }
                                        );
                                        interestId = interests[i]._id;
                                    }
                                    let mailOption = {
                                        from: config.get('domainName'),
                                        to: user.email,
                                        subject: `${config.get(
                                            'domainName'
                                        )} - Gợi ý sản phẩm`,
                                        html: `Chúng tôi tìm thấy sản phẩm phù hợp cho bạn.<br>
                                            Sẩn phẩm: <a href="${config.get(
                                                'localhost'
                                            )}/store/${result.template}/${
                                            result._id
                                        }/products/${newProduct._id}">${
                                            newProduct.name
                                        }</a>.<br>
                                            Giá: ${(newProduct.price *
                                                (100 - newProduct.saleoff)) /
                                                100}.<br>
                                            Cửa hàng: ${result.name}.<br>
                                        Chúng tôi gợi ý đến bạn sản phẩm này do bạn muốn nhận thông tin từ chúng tôi. Nếu bạn không cần đến gợi ý này vùi lòng click vào <a href="${config.get(
                                            'localhost'
                                        )}/cancel-notify/${
                                            req.session.user._id
                                        }/${interestId}">hủy nhận thông báo</a>`
                                    };
                                    mailer
                                        .sendMail(mailOption)
                                        .then(result => {
                                            //console.log(result);
                                        })
                                        .catch(err => console.log(err));
                                });
                            }
                        })
                        .catch(err => console.log(err));
                    // }
                    res.status(200).json(result);
                })
                .catch(err => console.log(err));
        });
    });

router.route('/findRecentProducts').get((req, res) => {
    const ids = JSON.parse(req.query.ids);
    ProductDao.findByIds(ids)
        .then(products => {
            addStoreIntoRecentProduct(products, ids, async results => {
                if (results.length > 0) {
                    // const productArr = await ids.map(id => {
                    //     return results[
                    //         results.findIndex(result => {
                    //             return result._doc._id == id;
                    //         })
                    //     ];
                    // });
                    return res.status(200).json(results);
                } else {
                    return res.status(201).json({
                        mesage: 'Chưa có sản phẩm được xem gần đây!'
                    });
                }
            });
        })
        .catch(err => console.log(err));
});

router
    .route('/:id')
    .get(async (req, res, next) => {
        let id = req.params.id;
        let product = await ProductDao.findById(id);
        if (!product) {
            res.json(null);
        } else {
            // update views count
            ProductDao.updateViewCount(product);

            res.json(product);
        }
    })
    .put(async (req, res, next) => {
        let id = req.params.id;
        let product = await ProductDao.findById(id);

        // update rate
        if (req.body.rate) {
            product.rates.push(req.body.rate);
        }

        let productUpdate = await ProductDao.update(product);
        res.json(productUpdate);
    });

const addStoreIntoProduct = async (products, latlng, distance, cb) => {
    let stores = [],
        results = [];
    for (var i = 0; i < products.length; i++) {
        const store = await StoreDao.findByProduct(
            products[i]._id,
            latlng,
            distance
        );
        if (store) {
            stores.push(store);
        } else {
            products.splice(i, 1);
            i--;
        }
    }

    results = products.map(product => {
        return {
            ...product,
            store:
                stores[
                    stores.findIndex(store => {
                        return store.products.includes(product._id);
                    })
                ],
            distance: ''
        };
    });
    cb(results);
};

const addStoreIntoRecentProduct = async (products, ids, cb) => {
    let stores = [],
        results = [];
    stores = await StoreDao.findByProducts(ids);
    // Sort stores
    results = await ids.map(id => {
        return {
            ...products[
                products.findIndex(product => {
                    return product._doc._id == id;
                })
            ],
            store:
                stores[
                    stores.findIndex(sto => {
                        return sto.products.includes(id);
                    })
                ],
            distance: ''
        };
    });
    // results.forEach((result, index) => {
    //     console.log(ids[index], result._doc._id);
    //     console.log(result.store.name);
    // });
    cb(results);
};

module.exports = router;

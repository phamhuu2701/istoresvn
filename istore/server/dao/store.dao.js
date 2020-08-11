const Model = require('../models/store.model');

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {
            Model.find({})
                .populate('storeCategory')
                .populate('user')
                .populate('city')
                .populate('district')
                .populate('street')
                .populate('products')
                .exec((err, results) => {
                    if (err) return reject(null);
                    return resolve(results);
                });
        }).catch(() => null);
    },
    findByUser: user => {
        return new Promise((resolve, reject) => {
            Model.find({ user: user })
                .populate('storeCategory')
                .populate('user')
                .populate('city')
                .populate('district')
                .populate('street')
                .populate('products')
                .exec((err, results) => {
                    if (err) return reject(null);
                    return resolve(results);
                });
        }).catch(() => null);
    },
    findById: id => {
        return new Promise((resolve, reject) => {
            Model.findById(id)
                .populate('storeCategory')
                .populate('user')
                .populate('city')
                .populate('district')
                .populate('street')
                .populate('products')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    findByName: name => {
        return new Promise((resolve, reject) => {
            Model.findOne({ name: name })
                .populate('storeCategory')
                .populate('user')
                .populate('city')
                .populate('district')
                .populate('street')
                .populate('products')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    searchByName: search => {
        //return Model.find({nameRemoveAccents: {$search: "\" }})
        //return Model.find({nameRemoveAccents: {$regex: /.bong.den./, $options: 'i'}});
        return Model.find({
            nameRemoveAccents: { $regex: new RegExp(search, 'i') }
        });
    },
    save: model => {
        return new Promise((resolve, reject) => {
            model.save((err, result) => {
                if (err) {
                    console.log(err);
                    return reject(null);
                }
                return resolve(result);
            });
        }).catch(() => {
            console.log(err);
            return null;
        });
    },
    update: model => {
        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(
                model._id,
                {
                    products: model.products
                },
                { new: true },
                (err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                }
            );
        }).catch(() => null);
    },
    delete: model => {
        return new Promise((resolve, reject) => {
            Model.findByIdAndDelete(model.id, err => {
                if (err) return reject(false);
                return resolve(true);
            });
        }).catch(() => false);
    },
    findByProducts: productIds => {
        return Model.find({ products: { $in: productIds } });
        //return Model.find();
    },
    findByProduct: (productId, latlng, distance) => {
        return new Promise((resolve, reject) => {
            Model.findOne({
                products: productId,
                location: {
                    $near: {
                        $maxDistance: distance,
                        $geometry: {
                            type: 'Point',
                            coordinates: latlng
                        }
                    }
                }
            })
                .populate('storeCategory')
                .exec((err, store) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(store);
                });
        });
    },
    addProductIntoStore: (storeId, productId) => {
        return Model.findByIdAndUpdate(
            storeId,
            {
                $push: { products: productId }
            },
            { useFindAndModify: false }
        );
    }
};

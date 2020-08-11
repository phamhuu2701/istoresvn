const Model = require('../models/product.model');
const SearchKey = require('../models/searchKey.model');
const slug = require('../util/slug');
const stringFormat = require('../util/stringFormatUtils');
const SearchKeyDao = require('../dao/searchKey.dao');

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {
            Model.find({})
                .populate('productCategory')
                .exec((err, results) => {
                    if (err) return reject(null);
                    return resolve(results);
                });
        }).catch(() => null);
    },
    findById: id => {
        return new Promise((resolve, reject) => {
            Model.findById(id)
                .populate('productCategory')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        });
    },
    findByIds: ids => {
        return new Promise((resolve, reject) => {
            Model.find({ _id: { $in: ids } })
                .populate('productCategory')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    findByName: name => {
        return new Promise((resolve, reject) => {
            Model.find({ name: name })
                .populate('productCategory')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    searchByName: search => {
        // console.log(slug(stringFormat(search)).replace(/-/g, ' '));
        let value = slug(stringFormat(search)).replace(/-/g, ' ');
        SearchKeyDao.findByValue(value).then(
            result => {
                if (result) {
                    SearchKeyDao.update(result);
                } else {
                    const newSearchKey = new SearchKey({
                        value: value,
                        count: [new Date()]
                    });
                    SearchKeyDao.save(newSearchKey);
                }
            },
            err => {
                const newSearchKey = new SearchKey({
                    value: value,
                    count: [new Date()]
                });
                SearchKeyDao.save(newSearchKey);
            }
        );
        //return Model.find({nameRemoveAccents: {$search: "\" }})
        //return Model.find({nameRemoveAccents: {$regex: /.bong.den./, $options: 'i'}});
        return Model.find({
            $or: [
                { nameRemoveAccents: { $regex: new RegExp(search, 'i') } },
                {
                    producerCode: {
                        $regex: new RegExp(search.toUpperCase(), 'i')
                    }
                }
            ]
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
        }).catch(() => null);
    },
    update: model => {
        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(
                model._id,
                {
                    rates: model.rates,
                    viewsCount: model.viewsCount
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
    updateViewCount: model => {
        let views = model.viewsCount;
        views.push(new Date());
        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(
                model._id,
                {
                    viewsCount: views
                },
                { new: true },
                (err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                }
            );
        }).catch(() => null);
    }
};

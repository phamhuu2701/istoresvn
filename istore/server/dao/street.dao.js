const Model = require("../models/street.model");

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {
            Model.find({})
            .populate("district")
            .exec((err, results) => {
                if (err) return reject(null);
                return resolve(results);
            });
        }).catch(() => null);
    },
    findById: id => {
        return new Promise((resolve, reject) => {
            Model.findById(id)
            .populate("district")
            .exec((err, result) => {
                if (err) return reject(null);
                return resolve(result);
            });
        }).catch(() => null);
    },
    findOneByName: name => {
        return new Promise((resolve, reject) => {
            Model.findOne({ name: name })
            .populate("district")
            .exec((err, result) => {
                if (err) return reject(null);
                return resolve(result);
            });
        }).catch(() => null);
    },
    findByDistrict: district => {
        return new Promise((resolve, reject) => {
            Model.find({ district: district })
            .populate("district")
            .exec((err, results) => {
                if (err) return reject(null);
                return resolve(results);
            });
        }).catch(() => null);
    },
    save: model => {
        return new Promise((resolve, reject) => {
            model.save((err, result) => {
                if (err) return reject(null);
                return resolve(result);
            });
        }).catch(() => null);
    },
    update: model => {
        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(
                model._id,
                {
                    name: model.name
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
        }).catch(() => null);
    }
};

const Model = require('../models/user.model');

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {
            Model.find({})
                .populate('authorization')
                .exec((err, results) => {
                    if (err) return reject(null);
                    return resolve(results);
                });
        }).catch(() => null);
    },
    findById: id => {
        return new Promise((resolve, reject) => {
            Model.findById(id)
                .populate('authorization')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    findByName: name => {
        return new Promise((resolve, reject) => {
            Model.find({ name: name })
                .populate('authorization')
                .exec((err, results) => {
                    if (err) return reject(null);
                    return resolve(results);
                });
        }).catch(() => err);
    },
    findOneByEmail: email => {
        return new Promise((resolve, reject) => {
            Model.findOne({ email: email })
                .populate('authorization')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    findOneByEmailAndPassword: (email, password) => {
        return Model.findOne({ email: email, password: password }).populate(
            'authorization'
        );
    },
    findOrCreate: user => {
        return Model.findOrCreate({ email: user.email }, user);
    },
    findOneByPhone: phone => {
        return new Promise((resolve, reject) => {
            Model.findOne({ phone: phone })
                .populate('authorization')
                .exec((err, result) => {
                    if (err) return reject(null);
                    return resolve(result);
                });
        }).catch(() => null);
    },
    save: model => {
        return new Promise((resolve, reject) => {
            model.save((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }).catch(err => err);
    },
    verify: (id, mailVerifyToken) => {
        return Model.findOneAndUpdate(
            { _id: id, mailVerifyToken: mailVerifyToken },
            { isEmailActivated: true },
            { useFindAndModify: false }
        );
    },
    update: model => {
        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(
                model._id,
                {
                    fullname: model.fullname,
                    phone: model.phone,
                    email: model.email,
                    password: model.password,
                    address: model.address,
                    gender: model.gender,
                    birthday: model.birthday,
                    about: model.about,
                    maxStoresCountCreated: model.maxStoresCountCreated
                },
                { new: true },
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(new Error(err));
                    }
                    return resolve(result);
                }
            );
        });
    },
    deleteUser: id => {
        return Model.findByIdAndDelete(id);
    },
    updateAvatar: (id, path) => {
        return Model.findByIdAndUpdate(
            id,
            { avatars: [path] },
            { useFindAndModify: false }
        );
    },
    updateInterest: (id, search) => {
        return Model.findByIdAndUpdate(
            id,
            {
                $push: { interests: search }
            },
            { useFindAndModify: false }
        );
    },
    findInterest: search => {
        return Model.find({
            'interests.productNameRemoveAccent': {
                $regex: new RegExp(search, 'i')
            }
        });
    },
    removeInterest: (id, interestId) => {
        return Model.findByIdAndUpdate(
            id,
            {
                $pull: {
                    interests: {
                        _id: interestId
                    }
                }
            },
            { useFindAndModify: false }
        );
    },
    updateForgetPasswordToken: (email, token) => {
        return Model.findOneAndUpdate(
            { email: email },
            {
                forgetPasswordToken: token,
                forgetPasswordTokenExpire: Date.now() + 900000
            },
            { useFindAndModify: false }
        );
    },
    comparePassword: (id, password) => {
        return Model.findOne({ _id: id, password: password });
    },
    updateNewPassword: (email, password) => {
        return Model.findOneAndUpdate(
            { email: email },
            { password: password },
            { useFindAndModify: false }
        );
    },
    delete: model => {
        return new Promise((resolve, reject) => {
            Model.findByIdAndDelete(model.id, err => {
                if (err) return reject(false);
                return resolve(true);
            });
        }).catch(() => false);
    },
    addAvatar: (user, avatarUrl) => {
        let avatarUrls = user.avatars;
        avatarUrls.push(avatarUrl);

        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(
                user._id,
                {
                    avatars: avatarUrls
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

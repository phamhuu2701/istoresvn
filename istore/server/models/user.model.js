const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const options = {
    autoCreate: true
};

const userSchema = new Schema(
    {
        authorization: { type: Schema.Types.ObjectId, ref: 'Authorization' },
        fullname: {
            firstname: {
                type: String,
                required: true,
                maxlength: 30,
                trim: true
            },
            lastname: {
                type: String,
                required: true,
                maxlength: 30,
                trim: true
            }
        },
        phone: { type: String, maxlength: 10, trim: true },
        isPhoneActivated: { type: Boolean, required: true, default: true },
        email: { type: String, maxlength: 30, trim: true },
        isEmailActivated: { type: Boolean, required: true, default: false },
        mailVerifyToken: {
            type: String,
            maxlength: 10,
            trim: true,
            unique: true
        },
        phoneVerifyToken: {
            type: String,
            maxlength: 6,
            trim: true,
            unique: true
        },
        phoneVerifyTokenExpire: { type: Date },
        forgetPasswordToken: {
            type: String,
            maxlength: 10,
            trim: true,
            unique: true
        },
        forgetPasswordTokenExpire: { type: Date },
        password: { type: String, required: true, maxlength: 50, trim: true },
        address: { type: String, maxlength: 100, trim: true },
        gender: { type: Boolean, default: false },
        birthday: { type: Date, default: Date.now },
        timeRegister: { type: Date, required: true, default: Date.now },
        avatars: {
            type: Array,
            default: ['https://img.icons8.com/bubbles/2x/user.png']
        },
        about: { type: String, maxlength: 2500 },
        maxStoresCountCreated: {
            count: { type: Number, default: 1 },
            timeLimited: { type: Date }
        },
        interests: [
            {
                productName: {
                    type: String,
                    trim: true
                },
                productNameRemoveAccent: {
                    type: String,
                    trim: true
                },
                receivedEmailCount: {
                    type: Number,
                    default: 0
                }
            }
        ]
    },
    options
);

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);

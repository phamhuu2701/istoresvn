const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    autoCreate: true
};

const productSchema = new Schema(
    {
        productCategory: {
            type: Schema.Types.ObjectId,
            ref: 'ProductCategory'
        },
        producerCode: {
            type: String,
            require: true,
            trim: true
        },
        name: { type: String, required: true, maxlength: 100, trim: true },
        nameRemoveAccents: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 2500,
            trim: true
        },
        price: { type: Number, required: true, min: 0 },
        saleoff: { type: Number, required: true, default: 0 },
        images: [{ type: String, required: true, maxlength: 300, trim: true }],
        videos: [{ type: String, maxlength: 300, trim: true }],
        rates: [
            {
                fullname: {
                    type: String,
                    maxlength: 50,
                    trim: true
                },
                email: {
                    type: String,
                    maxlength: 30,
                    trim: true
                },
                content: {
                    type: String,
                    required: true,
                    maxlength: 250,
                    trim: true
                },
                stars: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 5,
                    default: 0
                },
                timestamp: { type: Date, required: true, default: Date.now }
            }
        ],
        rateAvg: { type: Number, required: true, default: 0 },
        timestamp: { type: Date, required: true, default: Date.now },
        url: { type: String, maxlength: 300, trim: true },
        viewsCount: [{ type: Date, default: Date.now }]
    },
    options
);

module.exports = mongoose.model('Product', productSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: true
};

const storeCategorySchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 30, trim: true }
    },
    options
);

module.exports = mongoose.model("StoreCategory", storeCategorySchema);

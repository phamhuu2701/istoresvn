const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: true
};

const productCategorySchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 50, trim: true }
    },
    options
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);

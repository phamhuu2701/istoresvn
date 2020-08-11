const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: true
};

const searchKeySchema = new Schema(
    {
        value: { type: String, trim: true },
        count: [{ type: Date, required: true, default: Date.now }]
    },
    options
);

module.exports = mongoose.model("SearchKey", searchKeySchema);

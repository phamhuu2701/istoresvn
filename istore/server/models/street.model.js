const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    autoCreate: true
};

const streetSchema = new Schema(
    {
        district: { type: Schema.Types.ObjectId, ref: "District" },
        name: { type: String, required: true, maxlength: 30, trim: true }
    },
    options
);

module.exports = mongoose.model("Street", streetSchema);

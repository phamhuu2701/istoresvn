const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
  autoCreate: true
};

const commentSchema = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: "Store" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true, maxlength: 250, trim: true },
    timestamp: { type: Date, required: true, default: Date.now },
    replyComments: [
      {
        content: { type: String, required: true, maxlength: 250, trim: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, required: true, default: Date.now }
      }
    ]
  },
  options
);

module.exports = mongoose.model("Comment", commentSchema);

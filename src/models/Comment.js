const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tweet"
    },
    username: {
      type: String,
      required: true
    },
    handle: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;

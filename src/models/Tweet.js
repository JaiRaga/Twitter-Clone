const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 280
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;

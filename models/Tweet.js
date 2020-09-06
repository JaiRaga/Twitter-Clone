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
    },
    likes: [
      {
        owner: {
          type: Schema.Types.ObjectId,
          required: true
        }
      }
    ],
    retweets: [
      {
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        text: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;

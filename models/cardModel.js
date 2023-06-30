const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, "Please add the title"],
    },
    question: {
      type: String,
      required: [true, "Please add the question"],
    },
    answer: {
      type: String,
      required: [true, "Please add the answer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
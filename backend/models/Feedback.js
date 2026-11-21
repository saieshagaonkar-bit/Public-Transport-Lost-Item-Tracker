const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    feedbackId: {
      type: String,
      unique: true,
      default: function () {
        return `FDB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Ease of use',
        'Reporting an item',
        'Search & matching',
        'Claim process',
        'Bug / problem',
        'Suggestion',
        'Other',
      ],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Feedback', feedbackSchema);

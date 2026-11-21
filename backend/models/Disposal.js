const mongoose = require('mongoose');

const disposalSchema = new mongoose.Schema(
  {
    disposalId: {
      type: String,
      unique: true,
      default: function () {
        return `DSP-${Math.floor(7000 + Math.random() * 1000)}`;
      },
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      default: null,
    },
    itemTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    station: {
      type: String,
      required: true,
    },
    daysHeld: {
      type: Number,
      required: true,
      default: 90,
    },
    method: {
      type: String,
      required: true,
      default: 'Donate to charity',
    },
    status: {
      type: String,
      enum: ['Due for Disposal', 'Hold Extended', 'Disposed'],
      default: 'Due for Disposal',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Disposal', disposalSchema);

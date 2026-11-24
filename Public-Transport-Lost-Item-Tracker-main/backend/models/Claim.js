const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    claimId: {
      type: String,
      unique: true,
      index: true,
      default: function () {
        return `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
      },
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
      index: true,
    },
    itemId: {
      type: String, // String representation of customId (e.g. TRX-XXXXXX)
      required: true,
      index: true,
    },
    itemTitle: {
      type: String,
      required: true,
    },
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    claimantName: {
      type: String,
      required: [true, 'Please provide legal claimant name'],
      trim: true,
    },
    claimantPhone: {
      type: String,
      required: [true, 'Please provide contact phone number'],
      trim: true,
    },
    secretDetails: {
      type: String,
      required: [true, 'Please provide private verification evidence'],
      trim: true,
    },
    pickupStation: {
      type: String,
      required: [true, 'Please select a preferred handover station'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Submitted', 'Pending Review', 'Under Review', 'Approved', 'Rejected', 'Completed'],
      default: 'Pending Review',
      index: true,
    },
    adminReview: {
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
      reviewerName: {
        type: String,
        default: null,
      },
      reviewNotes: {
        type: String,
        default: '',
      },
      reviewedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret.claimId || ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Claim', claimSchema);

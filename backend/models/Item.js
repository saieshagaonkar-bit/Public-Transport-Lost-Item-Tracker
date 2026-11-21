const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      index: true,
      default: function () {
        return `TRX-${Math.floor(100000 + Math.random() * 900000)}`;
      },
    },
    title: {
      type: String,
      required: [true, 'Please provide an item title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: [true, 'Please specify whether item is Lost or Found'],
      index: true,
    },
    category: {
      type: String,
      enum: [
        'Electronics',
        'Bags & Wallets',
        'Documents',
        'Accessories',
        'Clothing',
        'Keys',
        'Other',
      ],
      required: [true, 'Please select a category'],
      index: true,
    },
    color: {
      type: String,
      required: [true, 'Please provide primary color'],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      default: 'Unspecified',
    },
    description: {
      type: String,
      required: [true, 'Please provide detailed description'],
      minlength: [10, 'Description must be at least 10 characters'],
      trim: true,
    },
    transitType: {
      type: String,
      enum: ['Metro', 'Bus', 'Train', 'Station'],
      required: [true, 'Please specify transport mode'],
      index: true,
    },
    route: {
      type: String,
      required: [true, 'Please provide route / service details'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide boarding / station location'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Please provide incident date'],
    },
    timeApprox: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    custodyLocation: {
      type: String,
      trim: true,
      default: 'Pending Custodial Match',
    },
    status: {
      type: String,
      enum: ['Open', 'Possible Match', 'Claim Pending', 'Recovered', 'Archived'],
      default: 'Open',
      index: true,
    },
    image: {
      type: String,
      default: null,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    reporterName: {
      type: String,
      required: true,
      trim: true,
    },
    reporterEmail: {
      type: String,
      required: true,
      trim: true,
    },
    reporterRole: {
      type: String,
      enum: ['Passenger', 'Conductor', 'Driver', 'Station Staff'],
      default: 'Passenger',
    },
    claimed: {
      type: Boolean,
      default: false,
    },
    activeClaim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Claim',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret.customId || ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Composite text index for searching
itemSchema.index({
  title: 'text',
  description: 'text',
  color: 'text',
  brand: 'text',
  route: 'text',
  location: 'text',
});

module.exports = mongoose.model('Item', itemSchema);

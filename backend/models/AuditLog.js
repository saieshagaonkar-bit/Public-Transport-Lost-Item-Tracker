
const mongoose = require('mongoose');
const crypto = require('crypto');

const auditLogSchema = new mongoose.Schema(
  {
    auditId: {
      type: String,
      unique: true,
      index: true,
      default: () =>
        `AUD-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    },

    actor: {
      type: String,
      required: true,
      default: 'System',
      trim: true,
    },

    email: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ['Passenger', 'Staff', 'Admin', 'System'],
      default: 'System',
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    target: {
      type: String,
      default: '',
      trim: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for frequently searched audit records
auditLogSchema.index({ email: 1, timestamp: -1 });
auditLogSchema.index({ category: 1, timestamp: -1 });
auditLogSchema.index({ role: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);

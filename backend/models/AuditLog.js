const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    auditId: {
      type: String,
      unique: true,
      default: function () {
        return `AUD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      },
    },
    actor: {
      type: String,
      required: true,
      default: 'System',
    },
    email: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'System',
    },
    category: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);

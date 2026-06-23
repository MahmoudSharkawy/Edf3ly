const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  merchantId: { type: String, required: true, unique: true }, // مربوط مع Laravel
  merchantName: { type: String, required: true },
  balance: { type: Number, required: true, default: 0.00 }, // الرصيد بالجنيه المصري EGP
  currency: { type: String, default: 'EGP' },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);

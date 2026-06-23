const Wallet = require('../models/Wallet');

// استقبال وتأكيد عملية دفع بنجاح (Process Incoming Payment)
const processPayment = async (req, res) => {
  try {
    const { merchantId, amount, paymentMethod, referenceNumber } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: 'برجاء إدخال مبلغ صحيح أكبر من الصفر' });
    }

    // 🚀 تحديث ذري (Atomic Update) لشحن رصيد المحفظة بالجنيه المصري فوراً وبأمان
    const updatedWallet = await Wallet.findOneAndUpdate(
      { merchantId, status: 'active' },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!updatedWallet) {
      return res.status(404).json({ error: 'المحفظة غير موجودة أو تم تعليق حساب التاجر' });
    }

    // الرد بنجاح العملية وإرسال إشعار فوري
    res.status(200).json({
      success: true,
      message: `تم استلام مبلغ ${amount} ج.م بنجاح عبر ${paymentMethod}`,
      transactionRef: referenceNumber,
      currentBalance: `${updatedWallet.balance} EGP`
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { processPayment };

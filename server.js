const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/gateway', paymentRoutes);

// بورت بعيد تماماً عن منطقة الـ 8000 والـ 6000
const PORT = 5555;
app.listen(PORT, () => {
  console.log(`⚡ Edf3ly Payment Gateway API is roaring on port ${PORT} (EGP Enabled)`);
});

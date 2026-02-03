const express = require('express');
const connectDB = require('./config/db');

const app = express();

/* =======================
   CONNECT DATABASE
======================= */
connectDB();

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.use('/users', require('./routes/user.route'));
app.use('/auth', require('./routes/auth.route'));

/* =======================
   HEALTH CHECK
======================= */
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API is running 🚀'
  });
});

/* =======================
   PORT (IMPORTANT)
   Hostinger uses process.env.PORT
======================= */
const PORT = process.env.PORT || 3000;

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

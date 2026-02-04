const express = require('express');
const connectDB = require('./config/db');

console.log("ENV PORT:", process.env.PORT);
console.log("ENV MONGO:", process.env.MONGO_URI ? "OK" : "MISSING");

const app = express();

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
   PORT
======================= */
const PORT = process.env.PORT || 3000;

/* =======================
   START SERVER AFTER DB
======================= */
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

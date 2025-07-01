import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://proticketing.onrender.com'  
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

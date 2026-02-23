//src/app.js
import express from 'express';
import cors from 'cors';

//pages
import adminRoutes from './routes/admin.routes.js'
import adminAuthRoutes from "./routes/adminAuth.routes.js"
import contactRoutes from './routes/contact.routes.js';
import jobRoutes from './routes/job.routes.js';
import postRoutes from "./routes/post.route.js"

const app = express();

app.use(cors());
app.use(express.json());

//home page
app.get('/', (req, res) => {
  res.send('Hello, Horizon Group!');
});

//API
app.use('/api/admin', adminRoutes);
app.use('/api/admin-auth', adminAuthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/post', postRoutes);


// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors,
    });
  }

  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({
      success: false,
      message: 'Database error',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    });
  }

  // Type errors (e.g., invalid input types)
  if (err instanceof TypeError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request format',
      error: err.message,
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;

import 'dotenv/config';
import prisma from './config/prisma.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database');
    console.error(error);
    process.exit(1);
  }
}

startServer();
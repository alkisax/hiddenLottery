// backend\src\server.ts
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectMongo } from './db/mongo';
import { connectPostgres } from './db/postgres';

const PORT = process.env.BACK_END_PORT || 3001;

const start = async () => {
  await connectPostgres();
  await connectMongo(); 

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();

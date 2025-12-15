# init backend with mongo and postgress
```ts
// backend\src\prisma\client.ts
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({ adapter })
```

```ts
// backend\src\db\postgres.ts
import { prisma } from '../prisma/client';

export const connectPostgres = async () => {
  await prisma.$connect();
  console.log('Connected to PostgreSQL (Prisma)');
};
```

```ts
// backend\src\db\mongo.ts
import mongoose from 'mongoose';

export const connectMongo = async () => {
  if (!process.env.MONGODB_URI) return;

  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};
```

```ts
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
```

```ts
// backend\src\app.ts
/* eslint-disable quotes */
/* eslint-disable no-console */
 
import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
// import type { NextFunction } from 'express';
import path from 'path';
import userRoutes from './users/user.routes';

const app = express();

app.use(cors());

app.use(express.json());

// app.use((req: Request, _res: Response, next: NextFunction) => {
//   console.log("Request reached Express!");
//   console.log(`Incoming request: ${req.method} ${req.path}`);
//   next();
// });

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.use('/api/users', userRoutes);

app.use(express.static('dist')); 

// ✅ SERVE UPLOADS BEFORE DIST
// ΠΡΟΣΟΧΗ το ../ στο path είναι συμαντικο. τα αρχεια μας βρίσκονται τελικά στον φάκελο dist
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// για να σερβίρει τον φακελο dist του front μετα το npm run build
// app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, '../../dist')));

//αυτο είναι για να σερβίρει το index.html του front όταν ο χρήστης επισκέπτεται το root path ή οποιοδήποτε άλλο path που δεν είναι api ή api-docs
app.get(/^\/(?!api|api-docs).*/, (_req, res) => {
  // res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

export default app;
```
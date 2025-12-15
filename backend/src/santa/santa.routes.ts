// backend/src/santa/santa.routes.ts
import express from 'express';
import { runSanta } from './santa.controller';

const router = express.Router();

// guest mode – no auth for now
router.post('/run', runSanta);

export default router;

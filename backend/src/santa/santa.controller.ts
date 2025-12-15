// backend\src\santa\santa.controller.ts
import type { Request, Response } from "express";
import { runSecretSanta } from "./santa.service";

export const runSanta = async (req: Request, res: Response) => {
  const { participants } = req.body;

  if (!participants || participants.length < 3) {
    return res.status(400).json({ message: "Invalid participants" });
  }

  // emails στέλνονται async
  const results = await runSecretSanta(participants);

  // debug
  console.log("[SANTA DEBUG] Results:");
  results.forEach((r) => {
    console.log(`${r.giver.email} → ${r.receiver.email}`);
  });

  // DEBUG ONLY
  return res.status(200).json({
    status: true,
    results,
  });
};

// αυτό το αρχείο φτιάχτικε για να κάνουμε τεστ στην σύνδεσή μας με ζοχο. μπορεί και σβηστεί. δεν παίζει κάποιο άλλο ρόλο

import express from 'express';
import { sendEmail } from './mailer.service';

const router = express.Router();

router.get('/test', async (_req, res) => {
  try {
    const receipt = await sendEmail({
      to: process.env.EMAIL_USER!, // στέλνουμε στον εαυτό μας
      subject: 'HiddenLottery – SMTP test',
      text: `
This is a test email.

If you received this, Zoho SMTP + Nodemailer works 🎉
`,
    });

    return res.status(200).json({
      status: true,
      message: 'Test email sent',
      data: receipt,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      status: false,
      message: 'Unknown error',
    });
  }
});

export default router;

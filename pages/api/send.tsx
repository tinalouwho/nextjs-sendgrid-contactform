import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type Data = {
  success: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const {
      name,
      email,
      message,
    }: { name: string; email: string; message: string } = req.body;
    const msg = {
      to: "contact@uxschema.com",
      from: "contact@uxschema.com",
      subject: `${name.toUpperCase()} sent you a message`,
      text: `Sender Email: ${email}\n\nMessage: ${message}`,
      html: `<p><strong>Sender Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    };
    try {
      await sgMail.send(msg);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false });
  }
};

// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.privateemail.com",
        port: 465,
        secure: true,
        auth: {
          user: "contactus@startupmaxim.com",
          pass: "Contactus-startupmaxim",
        },
      });

    try {
      await transporter.sendMail({
        from: email,
        to: "contactus@startupmaxim.com",
        subject: `New contact form submission from ${name}`,
        text: message,
        html: `<p>You have a new contact form submission</p><br>
               <p><strong>Name: </strong> ${name} </p><br>
               <p><strong>Email: </strong> ${email} </p><br>
               <p><strong>Message: </strong> ${message} </p><br>`,
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

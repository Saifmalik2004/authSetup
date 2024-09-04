import { getUserByEmail } from '@/data/user';
import nodemailer from 'nodemailer';

// Create a transporter object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
  },
});

// Function to send an email
export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const user=await getUserByEmail(email)
  const confirmLink=`http://localhost:3000/auth/new-verification?token=${token}`
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // Your Gmail address
      to: email,
      subject: 'Confirm your Email  ',
      html: `<p>Hello ${user?.name},</p><p>Thank you for registering. Please use the following link for confirm email :</p><a href="${confirmLink}"> click here</a>`,
    });

}
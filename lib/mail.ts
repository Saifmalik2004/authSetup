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
  
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // Your Gmail address
      to: email,
      subject: ' Confirm your Email',
      html: `<p>Hello ,</p><p>Thank you for registering. Please use the following verification code to complete your registration:</p><h1>${token}</h1><p>If you did not request this code, please ignore this email.</p>`,
    });

}
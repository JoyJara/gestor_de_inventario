import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'soportestorageplus@gmail.com',     // Define en .env
    pass: 'aufmmntdolultmwn',
  },
});

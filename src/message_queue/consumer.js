'use strict';

const nodemailer = require('nodemailer');
const { connRabbitMQ } = require('../dbs/init.rabbit.js');

const sendEmail = async ({ to, subject, content }) => {
  // Bạn có thể thay config này bằng real SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourapppassword'
    }
  });

  await transporter.sendMail({
    from: '"Xác thực hệ thống" <no-reply@example.com>',
    to,
    subject,
    text: content
  });
};

const runConsumer = async () => {
  const { channel } = await connRabbitMQ();
  const queue = 'email_queue';

  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in ${queue}...`);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log(' Received message:', data);
      try {
        await sendEmail(data);
        channel.ack(msg); // Đánh dấu đã xử lý
      } catch (error) {
        console.error(' Failed to send email:', error);
      }
    }
  });
};

runConsumer();

'use strict';
const { connRabbitMQ } = require('../dbs/init.rabbit.js');

const sendMessage = async (queue, message) => {
  const { connection, channel } = await connRabbitMQ();
  await channel.assertQueue(queue, { durable: true });
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true
  });
  setTimeout(() => {
    connection.close();
  }, 100000000);
//   await connection.close();
};

module.exports = { sendMessage };

'use strict';

const amqp = require('amqplib');
const connRabbitMQ =  async () => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');

        if(!connection){
            throw new Error('Failed to connect to RabbitMQ');
        }

        const channel = await connection.createChannel();

        return {
            connection,
            channel
        };
    } catch (error) {
        
    }

}

const connForTest = async () => {
    try {
            const { connection, channel } = await connRabbitMQ();

            //Push a message to the queue
            const queue = 'test_queue';
            const message = 'Hello World!';
            await channel.assertQueue(queue);
            await channel.sendToQueue(queue, Buffer.from(message));

            await connection.close();
    } catch (error) {
        console.error('Error in RabbitMQ connection:', error);
    }
}

module.exports = {
    connRabbitMQ,
    connForTest
}
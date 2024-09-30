const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    return channel;
  } catch (err) {
    console.error('RabbitMQ connection error:', err);
  }
}

async function sendMessage(queueName, message) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message sent to queue: ${queueName}`);

    await channel.close();
    await connection.close();
  } catch (err) {
    console.error('Error sending message to RabbitMQ:', err);
  }
}

async function consumeMessages(queueName, callback) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for messages in queue: ${queueName}`);

    channel.consume(queueName, (message) => {
      if (message !== null) {
        const content = message.content.toString();
        console.log(`Received message from queue: ${queueName} - ${content}`);
        callback(content);
        channel.ack(message);
      }
    });
  } catch (err) {
    console.error('Error consuming messages from RabbitMQ:', err);
  }
}

module.exports = {
  sendMessage,
  consumeMessages,
};

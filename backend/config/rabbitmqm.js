const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      const channel = await connection.createChannel();
      // You can also set up your queues here if needed
      return channel; // Return the channel
  } catch (error) {
      console.error('RabbitMQ connection error:', error);
      throw error; // Rethrow the error
  }
}

async function sendMessage(queueName, message) {
  try {
    if (!channel) {
      await connectRabbitMQ(); // Підключення, якщо канал ще не створено
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message sent to queue: ${queueName}`);
  } catch (err) {
    console.error('Error sending message to RabbitMQ:', err);
  }
}

async function consumeMessages(queueName, callback) {
  try {
    if (!channel) {
      await connectRabbitMQ(); // Підключення, якщо канал ще не створено
    }
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
  connectRabbitMQ, // Експортуйте connectRabbitMQ, якщо буде потрібно
};

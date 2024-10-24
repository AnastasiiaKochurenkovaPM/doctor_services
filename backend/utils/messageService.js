// const {connectRabbitMQ} = require('../config/rabbitmqm');
// let channel;

// // Підключитися до RabbitMQ
// connectRabbitMQ().then((ch) => {
//   channel = ch; // Зберігайте канал для подальшого використання
// });

// // Функція для відправки повідомлень
// async function sendBusinessMessage(message) {
//   if (!channel) {
//     console.error('Channel is not available. Please connect to RabbitMQ first.');
//     return;
//   }
//   await sendMessage(QUEUE_NAME, message);
// }

// // Функція для прослуховування черги
// function listenForBusinessMessages(callback) {
//   if (!channel) {
//     console.error('Channel is not available. Please connect to RabbitMQ first.');
//     return;
//   }
//   consumeMessages(QUEUE_NAME, callback);
// }

// module.exports = {
//   sendBusinessMessage,
//   listenForBusinessMessages,
// };

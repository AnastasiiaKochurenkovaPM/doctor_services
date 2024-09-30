const { sendMessage, consumeMessages } = require('../config/rabbitmq');

const QUEUE_NAME = 'business_queue';

// Функція для надсилання повідомлень
async function sendBusinessMessage(message) {
  await sendMessage(QUEUE_NAME, message);
}

// Функція для прослуховування черги
function listenForBusinessMessages(callback) {
  consumeMessages(QUEUE_NAME, callback);
}

module.exports = {
  sendBusinessMessage,
  listenForBusinessMessages,
};

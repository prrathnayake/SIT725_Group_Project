const amqp = require("amqplib");

const URL = process.env.RABBITMQ_URL;

let connection;

async function connectToRabbitMQ() {
  if (!connection) {
    connection = await amqp.connect(URL);
  }
  declareQueues;
  return connection;
}

async function declareQueues() {
  const channel = await connection.createChannel();

  // Declare the queues
  await channel.assertQueue("adminQueue");
  await channel.assertQueue("employeeQueue");
  await channel.assertQueue("messageQueue");

  // Close the channel
  await channel.close();
}

async function sendMessageToQueue(queue, data) {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
}

module.exports = {
  connectToRabbitMQ,
  sendMessageToQueue,
};

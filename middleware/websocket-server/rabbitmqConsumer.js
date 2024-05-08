const { connectToRabbitMQ } = require("./rabbitmqProducer");
const {
  emitMessage,
  emitMessageToAdmins,
  emitMessageToAdminRoom,
  emitMessageToEmployeeRoom,
} = require("./emmiter");

async function consumeMessageQueue() {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();

  channel.consume("messageQueue", (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      // Handle the received message
      emitMessage(data);
      channel.ack(msg);
    }
  });

  channel.consume("adminQueue", (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      // Handle the received message
      emitMessageToAdminRoom(data);
      channel.ack(msg);
    }
    connection;
  });

  channel.consume("employeeQueue", (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      // Handle the received message
      emitMessageToEmployeeRoom(data);
      channel.ack(msg);
    }
  });
}

consumeMessageQueue().catch(console.error);

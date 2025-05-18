const amqp = require("amqplib");

let channel;
const QUEUE = "notifications";

exports.connectQueue = async() => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE);
};

exports.sendToQueue = (notification) => {
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)));
};

exports.consumeQueue = (callback) => {
    channel.consume(QUEUE, (msg) => {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        channel.ack(msg);
    });
};

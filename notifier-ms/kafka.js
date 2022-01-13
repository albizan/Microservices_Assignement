const { Kafka: k } = require("kafkajs");

class Kafka {
  instance;
  consumer;
  bot;

  constructor(bot) {
    this.bot = bot;
    this.instance = new k({
      clientId: "notifier-ms",
      brokers: process.env.KAFKA_BOOTSTRAP_SERVERS.split(","),
      retry: {
        initialRetryTime: 5000,
        retries: 12,
      },
    });

    this.consumer = this.instance.consumer({ groupId: "notifier" });
  }

  run = async () => {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: process.env.KAFKA_TOPIC_NAME, fromBeginning: true });
    this.bot.telegram.sendMessage(process.env.TELEGRAM_ID, "Connected to kafka as consumer...");
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(message.value.toString());
        this.bot.telegram.sendMessage(process.env.TELEGRAM_ID, message.value.toString());
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        // console.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  };
}

module.exports = Kafka;

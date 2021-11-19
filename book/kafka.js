const { Kafka: k } = require("kafkajs");

class Kafka {
  instance;
  admin;
  producer;

  init = () => {
    this.instance = new k({
      clientId: "book-ms",
      brokers: process.env.KAFKA_BOOTSTRAP_SERVERS.split(","),
      retry: {
        initialRetryTime: 1000,
        retries: 60,
      },
    });
  };

  createTopic = async (topicName) => {
    const topics = await this.admin.listTopics();
    if (topics.includes(topicName)) {
      console.log(
        `Skipping topic creation, ${process.env.KAFKA_TOPIC_NAME} already exists`
      );
      return;
    }
    await this.admin.createTopics({ topics: [{ topic: topicName }] });
  };

  connect = async () => {
    if (!this.instance) {
      this.init();
    }
    this.admin = this.instance.admin();
    await this.admin.connect();
    this.producer = this.instance.producer();
  };
}

module.exports = Kafka;

const { Kafka: k } = require("kafkajs");

class Kafka {
  instance;
  admin;
  producer;

  init = () => {
    if (!this.instance) {
      this.instance = new k({
        clientId: "book-ms",
        brokers: process.env.KAFKA_BOOTSTRAP_SERVERS.split(","),
        retry: {
          initialRetryTime: 5000,
          retries: 12,
        },
      });
    }
  };

  async publish(message) {
    const dateOpts = { weekday: "long", month: "2-digit", day: "2-digit" };
    await this.producer.send({
      topic: process.env.KAFKA_TOPIC_NAME,
      messages: [{ value: `[${new Date().toLocaleDateString("it-IT", dateOpts)}] - ${message}` }],
    });
  }

  createTopic = async (topicName) => {
    const topics = await this.admin.listTopics();
    if (topics.includes(topicName)) {
      console.log(`Skipping topic creation, '${process.env.KAFKA_TOPIC_NAME}' already exists`);
      return;
    }
    await this.admin.createTopics({ topics: [{ topic: topicName }] });
  };

  connect = async () => {
    this.init();
    this.admin = this.instance.admin();
    await this.admin.connect();
    await this.createTopic(process.env.KAFKA_TOPIC_NAME);
    this.producer = this.instance.producer();
    await this.producer.connect();
  };
}

module.exports = new Kafka();

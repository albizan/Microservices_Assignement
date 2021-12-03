const server = require("./server");
const kafka = require("./kafka");
const logger = require("./logger");

class App {
  async start() {
    try {
      // Kafka configuration
      await kafka.connect();
      logger.info("Connected to Kafka cluster");

      await server.listen({
        port: process.env.SERVER_PORT,
        host: "0.0.0.0", // Default is 127.0.0.1, to be avoided because it refuses connections from other containers or from the main host
      });
      logger.info(`Server listening on port ${process.env.SERVER_PORT}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

module.exports = App;

const server = require("./server");
const kafka = require("./kafka");

class App {
  async start() {
    try {
      // Kafka configuration
      await kafka.connect();
      console.log("Connected to Kafka cluster\n");

      await server.listen({
        port: process.env.SERVER_PORT,
        host: "0.0.0.0", // Default is 127.0.0.1, to be avoided because it refuses connections from other containers or from the main host
      });
      console.log(`Server listening on port ${process.env.SERVER_PORT}\n`);
    } catch (error) {
      console.error(err);
      process.exit(1);
    }
  }
}

module.exports = App;

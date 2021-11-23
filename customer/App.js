const server = require("./graphql/server");
const mongo = require("./mongo");

class App {
  async start() {
    try {
      console.log("Connecting to mongo...");
      await mongo.connect();
      console.log("Connection to MongoDB established");
      const settings = await server.listen({ port: process.env.SERVER_PORT });
      console.log(`Server ready at ${settings.url}`);
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

module.exports = App;

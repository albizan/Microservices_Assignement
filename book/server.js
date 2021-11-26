if (process.env.NODE_ENV !== "production") {
  // Load env variables from local .env file
  console.log("Loading local env vars\n");
  require("dotenv").config();
}
const fastify = require("fastify")({ logger: false });
const { v4: uuidv4 } = require("uuid");
const { getBooksController, getBookController } = require("./controller");
const kafka = require("./kafka");
const knex = require("./database");

const bookSchema = {
  type: "object",
  properties: {
    author: {
      type: "string",
    },
    title: {
      type: "string",
    },
  },
  required: ["author", "title"],
};

// Declare routes
fastify.get("/book", getBooksController);

fastify.get("/book/:id", getBookController);

fastify.post("/book", {
  handler: async (request, reply) => {
    // console.log(request.body);
    knex("book")
      .insert({ ...request.body, id: uuidv4() })
      .then((res) => {
        reply.statusCode = 201;
        reply.send(request.body);
      })
      .catch((err) => {
        reply.sendCode = 500;
      });
  },
  schema: {
    body: bookSchema,
  },
});

fastify.put("/book/:id", async (request, reply) => {
  knex("book")
    .where({ id: request.params.id })
    .update(request.body, ["id"])
    .then((affectedRows) => {
      reply.statusCode = 200;
      reply.send(affectedRows ? { affected: affectedRows.length } : { affected: 0 });
    });
});

fastify.delete("/book/:id", async (request, reply) => {
  knex("book")
    .where({ id: request.params.id })
    .delete(["id"])
    .then((returnings) => {
      // console.log(returnings)
      reply.statusCode = 204;
      reply.send();
    });
});

const start = async () => {
  // Kafka configuration
  await kafka.connect();
  console.log("Connected to Kafka cluster\n");

  try {
    await fastify.listen({
      port: process.env.SERVER_PORT,
      host: "0.0.0.0", // Default is 127.0.0.1, to be avoided because it refuses connections from other containers or from the main host
    });
    console.log(`Server listening on port ${process.env.SERVER_PORT}\n`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();

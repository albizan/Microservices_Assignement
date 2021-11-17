const fastify = require("fastify")({ logger: false });
const { v4: uuidv4 } = require("uuid");

if (process.env.NODE_ENV !== "production") {
  // Load env variables from local .env file
  console.log("Loading local env vars...");
  require("dotenv").config();
}

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

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
fastify.get("/book", async (request, reply) => {
  knex("book")
    .then((rows) => {
      reply.statusCode = 200;
      reply.send(rows);
    })
    .catch((err) => {
      reply.sendCode = 500;
      reply.send();
    });
});

fastify.get("/book/:id", async (request, reply) => {
  knex("book")
    .where({
      id: request.params.id,
    })
    .first()
    .then((rows) => {
      if (rows) {
        reply.statusCode = 200;
        reply.send(rows);
      } else {
        reply.statusCode = 404;
        reply.send();
      }
    })
    .catch((err) => {
      reply.statusCode = 500;
      reply.send();
    });
});

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
      reply.send(
        affectedRows ? { affected: affectedRows.length } : { affected: 0 }
      );
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

// Start the server!
const start = async () => {
  try {
    console.log("Starting server on port", process.env.SERVER_PORT);
    await fastify.listen({
      port: process.env.SERVER_PORT,
      host: "0.0.0.0", // Default is 127.0.0.1, to be avoided because it refuses connections from other containers or from the main host
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

const fastify = require("fastify")({ logger: false });
const { getBooksController, getBookController, postBookController, updateBookController, deleteBookController } = require("./controller");
const { bookSchema } = require("./schema");

// Declare routes
fastify.get("/book", getBooksController);

fastify.get("/book/:id", getBookController);

fastify.post("/book", {
  handler: postBookController,
  schema: {
    body: bookSchema,
  },
});

fastify.put("/book/:id", {
  handler: updateBookController,
  schema: bookSchema,
});

fastify.delete("/book/:id", deleteBookController);

module.exports = fastify;

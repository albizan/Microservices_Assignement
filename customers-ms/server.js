const fastify = require("fastify")({ logger: false });
const {
  getCustomersController,
  getCustomerController,
  postCustomerController,
  updateCustomerController,
  deleteCustomerController,
} = require("./controller");
const { customerSchema } = require("./schema");

// Declare routes
fastify.get("/customer", getCustomersController);

fastify.get("/customer/:id", getCustomerController);

fastify.post("/customer", {
  handler: postCustomerController,
  schema: {
    body: customerSchema,
  },
});

fastify.put("/customer/:id", {
  handler: updateCustomerController,
  schema: customerSchema,
});

fastify.delete("/customer/:id", deleteCustomerController);

module.exports = fastify;

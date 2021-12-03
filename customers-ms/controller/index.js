const { getCustomer, getCustomers, createCustomer, updateCustomer, deleteCustomer } = require("../service");
const kafka = require("../kafka");

const getCustomersController = async (_, reply) => {
  try {
    // Retreive all book from service
    const allCustomers = (await getCustomers()) || [];

    // Send retreived dato to client
    reply.statusCode = 200;
    reply.send(allCustomers);

    // Send notification on a kafka topic
    await kafka.producer.connect();
    await kafka.producer.send({
      topic: process.env.KAFKA_TOPIC_NAME,
      messages: [{ value: `${rows.length} customers retreived with a GET /customer` }],
    });
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const getCustomerController = async (request, reply) => {
  try {
    const { id } = request.params;
    const customer = await getCustomer(id);
    if (customer) {
      reply.statusCode = 200;
      reply.send(customer);
    } else {
      reply.statusCode = 404;
      reply.send();
    }
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const postCustomerController = async (request, reply) => {
  try {
    const result = await createCustomer(request.body);
    reply.statusCode = 201;
    reply.send(result);
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const updateCustomerController = async (request, reply) => {
  try {
    const { id } = request.params;
    const affectedRows = await updateCustomer(id, request.body);
    reply.statusCode = 200;
    reply.send({ affectedRows: affectedRows });
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const deleteCustomerController = async (request, reply) => {
  try {
    const { id } = request.params;
    await deleteCustomer(id);
    reply.statusCode = 204;
    reply.send();
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

module.exports = {
  getCustomersController,
  getCustomerController,
  postCustomerController,
  updateCustomerController,
  deleteCustomerController,
};

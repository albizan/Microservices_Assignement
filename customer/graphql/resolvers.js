const mongo = require("../mongo");

const resolvers = {
  Query: {
    customers: async () => {
      return Array.from(await mongo.getCustomers());
    },
    customer: async (_, { _id }) => {
      return await mongo.getCustomer(_id);
    },
  },
  Mutation: {
    createCustomer: async (_, customer) => {
      return await mongo.createCustomer(customer);
    },
    deleteCustomer: async (_, { _id }) => {
      return await mongo.deleteCustomer(_id);
    },
    updateCustomer: async (_, data) => {
      return await mongo.updateCustomer(data);
    },
  },
};

module.exports = resolvers;

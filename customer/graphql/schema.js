const { gql } = require("apollo-server");

const typeDefs = gql`
  type Customer {
    _id: String
    name: String
    address: String
    phone: String
  }

  type Query {
    customers: [Customer]
    customer(_id: String!): Customer
  }

  type Mutation {
    createCustomer(name: String, address: String, phone: String): String
    updateCustomer(_id: String!, name: String, address: String, phone: String): Int
    deleteCustomer(_id: String): Int
  }
`;

module.exports = typeDefs;

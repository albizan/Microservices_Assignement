const customerSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    privateAddress: {
      type: "string",
    },
  },
  required: ["firstName", "lastName", "privateAddress"],
};

module.exports = { customerSchema };

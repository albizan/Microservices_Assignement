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

module.exports = { bookSchema };

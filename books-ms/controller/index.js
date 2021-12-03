const { getBooks, getBook, createBook, updateBook, deleteBook } = require("../service");
const kafka = require("../kafka");

const getBooksController = async (_, reply) => {
  try {
    // Retreive all book from service
    const allBooks = (await getBooks()) || [];

    // Send retreived dato to client
    reply.statusCode = 200;
    reply.send(allBooks);

    // Send notification on a kafka topic
    await kafka.producer.connect();
    await kafka.producer.send({
      topic: process.env.KAFKA_TOPIC_NAME,
      messages: [{ value: `${rows.length} books retreived with a GET /book` }],
    });
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const getBookController = async (request, reply) => {
  try {
    const { id } = request.params;
    const book = await getBook(id);
    if (book) {
      reply.statusCode = 200;
      reply.send(book);
    } else {
      reply.statusCode = 404;
      reply.send();
    }
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const postBookController = async (request, reply) => {
  try {
    const result = await createBook(request.body);
    reply.statusCode = 201;
    reply.send(result);
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const updateBookController = async (request, reply) => {
  try {
    const { id } = request.params;
    const affectedRows = await updateBook(id, request.body);
    reply.statusCode = 200;
    reply.send({ affectedRows: affectedRows });
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

const deleteBookController = async (request, reply) => {
  try {
    const { id } = request.params;
    await deleteBook(id);
    reply.statusCode = 204;
    reply.send();
  } catch (error) {
    reply.statusCode = 500;
    reply.send();
  }
};

module.exports = {
  getBooksController,
  getBookController,
  postBookController,
  updateBookController,
  deleteBookController,
};

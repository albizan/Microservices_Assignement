const { getBooks, getBook } = require("../service");
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

module.exports = {
  getBooksController,
  getBookController,
};

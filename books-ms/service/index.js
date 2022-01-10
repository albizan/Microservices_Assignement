const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const logger = require("../logger");

const getBooks = async () => {
  const allBooks = await db.select("*").from("book");
  return allBooks;
};

const getBook = async (id) => {
  const book = await db.select("*").from("book").where({ id }).first();
  logger.info("Requested book with id: " + id);
  if (!book) {
    logger.info("Book with id " + id + " does not exist");
  }
  return book;
};

const createBook = async (bookDTO) => {
  const newBook = {
    id: uuidv4(),
    ...bookDTO,
  };
  await db.insert(newBook).into("book");
  logger.info("Created book with id: " + newBook.id);
  return newBook;
};

const updateBook = async (id, updateBookDTO) => {
  const affectedRows = await db("book").where({ id }).update(updateBookDTO);
  logger.info("Updated book with id: " + id);
  return affectedRows;
};

const deleteBook = async (id) => {
  try {
    const result = await db("book").where({ id }).del();
    logger.info("Delete request, deleted books: " + result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };

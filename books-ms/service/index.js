const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const logger = require("../logger");

const getBooks = async () => {
  const allBooks = await db.select("*").from("book");
  return allBooks;
};

const getBook = async (id) => {
  logger.info(`GET /book/${id}`);
  const book = await db.select("*").from("book").where({ id }).first();
  return book;
};

const createBook = async (bookDTO) => {
  const newBook = {
    id: uuidv4(),
    ...bookDTO,
  };
  await db.insert(newBook).into("book");
  logger.info(`New book created\n - id: ${newBook.id}\n - Title: ${newBook.title}\n - Author: ${newBook.author}`);
  return newBook;
};

const updateBook = async (id, updateBookDTO) => {
  const affectedRows = await db("book").where({ id }).update(updateBookDTO);
  logger.info(`Book updated\n - id: ${id}\n - Title: ${updateBookDTO.title}\n - Author: ${updateBookDTO.author}`);
  return affectedRows;
};

const deleteBook = async (id) => {
  logger.info(`DELETE /book/${id}`);
  const result = await db("book").where({ id }).del();
  return result;
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };

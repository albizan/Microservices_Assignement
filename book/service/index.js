const db = require("../database");
const { v4: uuidv4 } = require("uuid");

const getBooks = async () => {
  try {
    const allBooks = await db.select("*").from("book");
    return allBooks;
  } catch (error) {
    console.error(error);
  }
};

const getBook = async (id) => {
  try {
    const book = await db.select("*").from("book").where({ id }).first();
    return book;
  } catch (error) {
    console.error(error);
  }
};

const createBook = async (bookDTO) => {
  try {
    const newBook = {
      id: uuidv4(),
      ...bookDTO,
    };
    await db.insert(newBook).into("book");
    return newBook;
  } catch (error) {
    console.error(error);
  }
};

const updateBook = async (id, updateBookDTO) => {
  try {
    const affectedRows = await db("book").where({ id }).update(updateBookDTO);
    return affectedRows;
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (id) => {
  try {
    await db("book").where({ id }).del();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };

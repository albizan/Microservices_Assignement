const db = require("../database");

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

module.exports = { getBooks, getBook };

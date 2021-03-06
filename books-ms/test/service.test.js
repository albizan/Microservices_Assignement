const validator = require("validator");
const db = require("../database");
const kafka = require("../kafka");
const { getBooks, getBook, createBook, updateBook, deleteBook } = require("../service");

// Mock publish method used by services
jest.mock("../kafka", () => ({
  publish: jest.fn(),
}));

beforeAll(async () => {
  // run the migrations and do any other setup here
  await db.migrate.latest();
  await db.seed.run();
});

describe("Test CRUD operations", () => {
  test("Test getBooks method", async () => {
    const result = await getBooks();
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ id: "1", author: "Autore 1", title: "Libro 1", total: 1, borrowed: 1 });
    expect(result[1]).toEqual({ id: "2", author: "Autore 2", title: "Libro 2", total: 34, borrowed: 12 });
    expect(result[2]).toEqual({ id: "3", author: "Autore 3", title: "Libro 3", total: 5, borrowed: 2 });
  });

  test("Test getBook method", async () => {
    const result = await getBook("3");
    expect(result).toEqual({ id: "3", author: "Autore 3", title: "Libro 3", total: 5, borrowed: 2 });
  });

  test("Test createBook method", async () => {
    const mockBook = {
      author: "Autore 4",
      title: "Libro 4",
      total: 4,
      borrowed: 0,
    };
    const book = await createBook(mockBook);
    expect(typeof book.id).toBe("string");
    expect(validator.isUUID(book.id)).toBe(true);

    const books = await getBooks();
    expect(books.length).toBe(4);
    expect(books[3].id).toBe(book.id);
    expect(books[3].author).toBe(mockBook.author);
    expect(books[3].title).toBe(mockBook.title);
  });

  test("Test updateBook method", async () => {
    const mockUpdate = {
      author: "Autore 4b",
      title: "Libro 4b",
    };
    let books = await getBooks();
    const { id } = books[3];
    const affectedRows = await updateBook(id, mockUpdate);
    expect(affectedRows).toBe(1);

    books = await getBooks();
    expect(books.length).toBe(4);
    expect(books[3].id).toBe(id);
    expect(books[3].author).toBe(mockUpdate.author);
    expect(books[3].title).toBe(mockUpdate.title);
  });

  test("Test deleteBook", async () => {
    let books = await getBooks();
    expect(books.length).toBe(4);
    await deleteBook(1);
    books = await getBooks();
    expect(books.length).toBe(3);
    expect(books[0].id).toBe("2");
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  db.destroy();
  done();
});

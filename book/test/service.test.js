const db = require("../database");
const { getBooks, getBook } = require("../service");

beforeAll(async () => {
  // run the migrations and do any other setup here
  await db.migrate.latest();
  await db.seed.run();
});

test("Test environment is enbled", () => {
  process.env.NODE_ENV === "test";
});

describe("Test data retrieval from db", () => {
  test("Test getBooks service", async () => {
    const result = await getBooks();
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ id: "1", author: "Autore 1", title: "Libro 1" });
    expect(result[1]).toEqual({ id: "2", author: "Autore 2", title: "Libro 2" });
    expect(result[2]).toEqual({ id: "3", author: "Autore 3", title: "Libro 3" });
  });

  test("Test getBook service", async () => {
    const result = await getBook("3");
    expect(result).toEqual({ id: "3", author: "Autore 3", title: "Libro 3" });
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  db.destroy();
  done();
});

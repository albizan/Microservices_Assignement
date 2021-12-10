import { Service } from "typedi";
import Book from "../types/Book";

const axios = require("axios").default;

@Service()
class BookDataSource {
  private http;
  constructor() {
    this.http = axios.create({
      baseURL: `http://${process.env.BOOKS_MS_HOST}:${process.env.BOOKS_MS_PORT}/book`,
    });
  }

  async retrieveAllBooks(): Promise<Book[]> {
    try {
      const { data } = await this.http.get(``);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async retrieveBookById(id): Promise<Book> {
    const { data } = await this.http.get(`/${id}`);
    return data;
  }

  async updateBook(id, newBookData): Promise<Book[]> {
    return await this.http.put(`/${id}`, newBookData);
  }
}

export default BookDataSource;

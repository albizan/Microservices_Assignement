import { Service, Inject } from "typedi";
import BookDataSource from "../datasources/book.datasource";
import Book from "../types/Book";

@Service()
class BookService {
  @Inject()
  private dataSource: BookDataSource;

  async retriveAllBooks(): Promise<Book[]> {
    const books = await this.dataSource.retrieveAllBooks();
    return books;
  }

  async retrieveBookById(id: string): Promise<Book> {
    const book = await this.dataSource.retrieveBookById(id);
    return book;
  }
}

export default BookService;

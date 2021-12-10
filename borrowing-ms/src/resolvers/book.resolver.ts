import { Resolver, Query, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import BookService from "../services/book.service";
import Book from "../types/Book";

@Service()
@Resolver(Book)
class BookResolver {
  constructor(@Inject() private bookService: BookService) {}

  @Query((returns) => [Book])
  async books() {
    const books = await this.bookService.retriveAllBooks();
    return books;
  }
  @Query((returns) => Book)
  async book(@Arg("id") id: string) {
    const book = await this.bookService.retrieveBookById(id);
    return book;
  }
}

export default BookResolver;

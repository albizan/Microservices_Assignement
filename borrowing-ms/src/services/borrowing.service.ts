import { Inject, Service } from "typedi";
import BorrowingDatasource from "../datasources/borrowing.datasource";
import BorrowingEntity from "../entities/borrowing.entity";
import AddBorrowingInput from "../types/AddBorrowingInput";
import Borrowing from "../types/Borrowing";
import BookService from "./book.service";
import CustomerService from "./customer.service";

@Service()
class BorrowingService {
  @Inject()
  private dataSource: BorrowingDatasource;

  @Inject()
  private bookService: BookService;

  @Inject()
  private customerService: CustomerService;

  async createBorrowing(addBorrowingInput: AddBorrowingInput) {
    const { bookId, customerId } = addBorrowingInput;

    // Check if book is available in the library
    const book = await this.bookService.retrieveBookById(bookId);
    if (!book) return;

    // Check if customer is present in the database
    const customer = await this.customerService.retrieveCustomerById(customerId);
    if (!customer) return;

    const borrowing = new Borrowing(book, customer);

    // Add data to datasource
    borrowing._id = await this.dataSource.addBorrowing(borrowing);

    return borrowing;
  }

  async findBorrowingById(id: string): Promise<Borrowing> {
    const borrowing = await this.dataSource.findBorrowingById(id);
    return borrowing;
  }

  async getAllBorrowings(): Promise<Borrowing[]> {
    const allBorrowings = await this.dataSource.getAllBorrowings();
    return allBorrowings;
  }

  async getBorrowingsByBookId(bookId: string): Promise<Borrowing[]> {
    return await this.dataSource.getBorrowingsByBookId(bookId);
  }
}

export default BorrowingService;

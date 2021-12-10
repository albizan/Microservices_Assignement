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
    // Check if book is available in the library
    const { bookId, customerId } = addBorrowingInput;
    const book = await this.bookService.retrieveBookById(bookId);
    const customer = await this.customerService.retrieveCustomerById(customerId);

    const entity = new BorrowingEntity(bookId, customerId);
    // Add data to datasource
    const _id = await this.dataSource.addBorrowing(entity);
    entity._id = _id;
    const borrowing = new Borrowing();
    borrowing.mapFromModel(entity);
    borrowing.addBook(book);
    borrowing.addCustomer(customer);
    return borrowing;
  }

  async findBorrowingById(id: string): Promise<Borrowing> {
    const b = await this.dataSource.findBorrowingById(id);
    const bookId = b.bookId;
    const customerId = b.customerId;

    const book = await this.bookService.retrieveBookById(bookId);
    const customer = await this.customerService.retrieveCustomerById(customerId);
    const borrowing = new Borrowing();
    borrowing.mapFromModel(b);
    borrowing.addBook(book);
    borrowing.addCustomer(customer);

    return borrowing;
  }
}

export default BorrowingService;

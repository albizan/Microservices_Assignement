import { Field, ID, ObjectType } from "type-graphql";
import BorrowingEntity from "../entities/borrowing.entity";
import Book from "./Book";
import Customer from "./Customer";

@ObjectType()
class Borrowing {
  @Field((type) => ID)
  id: string;

  @Field()
  date: Date;

  @Field()
  returned: Boolean;

  @Field((type) => Customer)
  customer: Customer;

  @Field((type) => Book)
  book: Book;

  mapFromModel(m: BorrowingEntity) {
    this.id = m._id.toString();
    this.date = m.date;
    this.returned = m.returned;
  }

  addBook(b: Book) {
    this.book = b;
  }

  addCustomer(c: Customer) {
    this.customer = c;
  }
}

export default Borrowing;

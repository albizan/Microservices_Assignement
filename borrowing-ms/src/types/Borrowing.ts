import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import BorrowingEntity from "../entities/borrowing.entity";
import Book from "./Book";
import Customer from "./Customer";

@ObjectType()
class Borrowing {
  @Field((type) => ID)
  _id: ObjectId;

  @Field()
  date: Date;

  @Field()
  returned: Boolean;

  @Field((type) => Customer)
  customer: Customer;

  @Field((type) => Book)
  book: Book;

  constructor(book: Book, customer: Customer) {
    this.date = new Date();
    this.returned = false;
    this.book = book;
    this.customer = customer;
  }

  mapFromModel(m: BorrowingEntity) {
    this._id = m._id;
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

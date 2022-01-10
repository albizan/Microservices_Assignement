import { ObjectId } from "mongodb";

class BorrowingEntity {
  _id: ObjectId;
  date: Date;
  returned: boolean;

  constructor(public bookId: string, public customerId: string) {
    this.date = new Date();
    this.returned = false;
  }
}

export default BorrowingEntity;

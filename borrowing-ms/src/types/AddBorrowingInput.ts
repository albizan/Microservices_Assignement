import { Field, InputType } from "type-graphql";

@InputType({ description: "Create new borring, requires bookId and customerId" })
class AddBorrowingInput {
  @Field()
  bookId: string;

  @Field()
  customerId: string;
}

export default AddBorrowingInput;

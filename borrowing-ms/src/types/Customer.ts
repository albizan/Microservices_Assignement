import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Customer {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  privateAddress: string;
}

export default Customer;

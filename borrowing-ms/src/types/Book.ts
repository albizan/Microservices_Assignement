import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
class Book {
  @Field((type) => ID)
  id: string;

  @Field()
  author: string;

  @Field()
  title: string;

  @Field((type) => Int)
  total: number;

  @Field((type) => Int)
  borrowed: number;
}

export default Book;

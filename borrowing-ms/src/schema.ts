import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { BookResolver, CustomerResolver, BorrowingResolver } from "./resolvers";

export default async function createSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [BookResolver, CustomerResolver, BorrowingResolver],
    container: Container,
  });
}

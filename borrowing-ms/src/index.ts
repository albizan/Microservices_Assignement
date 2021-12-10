import "reflect-metadata";
import "./env";
import { ApolloServer } from "apollo-server";
import createSchema from "./schema";
import { Container } from "typedi";
import BorrowingDatasource from "./datasources/borrowing.datasource";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Init database connection before bootstrapping the server
    console.log("Connecting to database...");
    const db = Container.get(BorrowingDatasource);
    await db.connect();

    const server = new ApolloServer({
      schema: await createSchema(),
    });
    const { url } = await server.listen(process.env.SERVER_PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (error) {
    console.log(error);
  }
}

start();

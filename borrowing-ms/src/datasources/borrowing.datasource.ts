import { MongoClient, Collection, ObjectId } from "mongodb";
import { Service } from "typedi";
import BorrowingEntity from "../entities/borrowing.entity";

@Service()
class BorrowingDatasource {
  client: MongoClient;
  borrowingCollection: Collection<BorrowingEntity>;
  constructor() {
    this.client = new MongoClient(process.env.DB_URI);
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to database");
    this.borrowingCollection = await this.client.db("borrowings_db").collection("borrowings");
  }

  async getAllBorrowings() {
    const borrowings = await this.borrowingCollection.find().toArray();
    return borrowings;
  }

  async findBorrowingById(id: string) {
    const borrowing = await this.borrowingCollection.findOne({
      _id: new ObjectId(id),
    });
    return borrowing;
  }

  async addBorrowing(b: BorrowingEntity) {
    try {
      const { insertedId } = await this.borrowingCollection.insertOne(b);
      return insertedId;
    } catch (error) {
      console.log(error);
    }
  }
}

export default BorrowingDatasource;

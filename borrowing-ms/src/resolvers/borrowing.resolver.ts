import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Inject, Service } from "typedi";
import BorrowingService from "../services/borrowing.service";
import AddBorrowingInput from "../types/AddBorrowingInput";
import Borrowing from "../types/Borrowing";

@Service()
@Resolver(Borrowing)
class BorrowingResolver {
  constructor(@Inject() private borrowingService: BorrowingService) {}

  @Query((returns) => [Borrowing])
  async borrowings(): Promise<Borrowing[]> {
    const borrowings = await this.borrowingService.getAllBorrowings();
    return borrowings;
  }
  @Query((returns) => Borrowing)
  async borrowing(@Arg("id") id: string): Promise<Borrowing> {
    return await this.borrowingService.findBorrowingById(id);
  }

  @Mutation((type) => Borrowing)
  async createBorrowing(@Arg("addBorrowingInput") addBorrowingInput: AddBorrowingInput) {
    return this.borrowingService.createBorrowing(addBorrowingInput);
  }
}

export default BorrowingResolver;

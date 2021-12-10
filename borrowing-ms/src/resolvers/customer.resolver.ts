import { Resolver, Query, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import CustomerService from "../services/customer.service";
import Customer from "../types/Customer";

@Service()
@Resolver(Customer)
class CustomerResolver {
  constructor(@Inject() private customerService: CustomerService) {}

  @Query((returns) => [Customer])
  async customers() {
    const customers = await this.customerService.retriveAllCustomers();
    return customers;
  }
  @Query((returns) => Customer)
  async customer(@Arg("id") id: string) {
    const customer = await this.customerService.retrieveCustomerById(id);
    return customer;
  }
}

export default CustomerResolver;

import { Service, Inject } from "typedi";
import CustomerDataSource from "../datasources/customer.datasource";
import Customer from "../types/Customer";

@Service()
class CustomerService {
  @Inject()
  private dataSource: CustomerDataSource;

  async retriveAllCustomers(): Promise<Customer[]> {
    const customers = await this.dataSource.retrieveAllCustomers();
    return customers;
  }

  async retrieveCustomerById(id: string): Promise<Customer> {
    const customer = await this.dataSource.retrieveCustomerById(id);
    return customer;
  }
}

export default CustomerService;

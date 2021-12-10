import { Service } from "typedi";
import Customer from "../types/Customer";

const axios = require("axios").default;

@Service()
class CustomerDataSource {
  private http;
  constructor() {
    this.http = axios.create({
      baseURL: `http://${process.env.CUSTOMERS_MS_HOST}:${process.env.CUSTOMERS_MS_PORT}/customer`,
    });
  }

  async retrieveAllCustomers(): Promise<Customer[]> {
    try {
      const { data } = await this.http.get(``);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async retrieveCustomerById(id): Promise<Customer> {
    const { data } = await this.http.get(`/${id}`);
    return data;
  }

  async updateCustomer(id, newCustomerData): Promise<Customer[]> {
    return await this.http.put(`/${id}`, newCustomerData);
  }
}

export default CustomerDataSource;

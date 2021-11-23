const { MongoClient, ObjectId } = require("mongodb");

class Mongo {
  client;
  customerCollection;
  constructor(uri) {
    this.client = new MongoClient(uri);
  }

  async connect() {
    await this.client.connect();
    this.customerCollection = await this.client.db("customer_db").collection("customers");
  }

  async getCustomers() {
    const allCustomers = await this.customerCollection.find().toArray();
    return allCustomers;
  }
  async getCustomer(id) {
    const customer = await this.customerCollection.findOne({ _id: ObjectId(id) });
    return customer;
  }
  async createCustomer(customer) {
    const result = await this.customerCollection.insertOne(customer);
    if (result.acknowledged) {
      return result.insertedId.toString();
    }
  }
  async deleteCustomer(id) {
    const customer = await this.customerCollection.findOne({ _id: ObjectId(id) });
    console.log(customer);
    if (customer) {
      const result = await this.customerCollection.deleteOne(customer);
      console.log(result);
      return result.deletedCount;
    }
  }
  async updateCustomer(data) {
    const _id = data._id;
    delete data._id;
    const result = await this.customerCollection.updateOne(
      { _id: ObjectId(_id) },
      {
        $set: data,
      }
    );
    if (result.modifiedCount) {
      return result.modifiedCount;
    }
  }
}

module.exports = new Mongo(process.env.MONGO_URI);

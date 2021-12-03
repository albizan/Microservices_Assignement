const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const logger = require("../logger");

const getCustomers = async () => {
  try {
    const allCustomers = await db.select("*").from("customer");
    return allCustomers;
  } catch (error) {
    console.error(error);
  }
};

const getCustomer = async (id) => {
  try {
    const customer = await db.select("*").from("customer").where({ id }).first();
    logger.info("Requested customer with id: " + id);
    if (!customer) {
      logger.info("Customer with id " + id + " does not exist");
    }
    return customer;
  } catch (error) {
    console.error(error);
  }
};

const createCustomer = async (customerDTO) => {
  try {
    const newCustomer = {
      id: uuidv4(),
      ...customerDTO,
    };
    await db.insert(newCustomer).into("customer");
    logger.info("Created customer with id: " + newCustomer.id);
    return newCustomer;
  } catch (error) {
    console.error(error);
  }
};

const updateCustomer = async (id, updateCustomerDTO) => {
  try {
    const affectedRows = await db("customer").where({ id }).update(updateCustomerDTO);
    logger.info("Updated customer with id: " + id);
    return affectedRows;
  } catch (error) {
    console.error(error);
  }
};

const deleteCustomer = async (id) => {
  try {
    await db("customer").where({ id }).del();
    logger.info("Deleted customer with id: " + id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getCustomer, getCustomers, createCustomer, updateCustomer, deleteCustomer };

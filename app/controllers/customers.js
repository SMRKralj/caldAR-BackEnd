const Customers = require("../models/customers");
require("slf4n-logging");

const logger = LoggerFactory.getLogger("Customers");

//Create new customer
exports.create = (req, res) => {
  logger.info("Endpoint called:create new Customer");

  if (!req.body.cuit || !req.body.name||!req.body.email || !req.body.address||!req.body.buildings) {
    res.status(400).send({ message: "Content cannot be empty " });
  }
  const cuitValid = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
  const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const addressValid = /^\s*\S+(?:\s+\S+){2}/;;
  if (!req.body) {
    return res.status(400).send({
      message: "Data cannot be empty",
    });
  }
  if (!req.body.cuit.match(cuitValid)) {
    res.status(400).send({ message: "Error: Invalid cuit" });
  }
  if (!req.body.email.match(emailValid)) {
    return res.status(400).send({ message: "Error: Invalid Email" });
  }
  if (!req.body.address.match(addressValid) ) {
    return res.status(400).send({ message: "Error: Invalid Address" });
  }
  const customer = new Customers({
    cuit: req.body.cuit,
    name:req.body.name,
    email: req.body.email,
    address: req.body.address,
    buildings: req.body.buildings,
  });

  customer
    .save(customer)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the customer."',
      });
    });
};

//Get all customers
exports.findAll = (req, res) => {
  logger.info("Endpoint called: getAllCustomers");
  Customers.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers",
      });
    });
};

//Get customer by ID
exports.findOne = (req, res) => {
  logger.info("Endpoint called:get Customer by ID");

  Customers.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Customer was not found.",
        });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customer",
      });
    });
};

//Delete customer
exports.delete = (req, res) => {
  logger.info("Endpoint called:delete Customer");

  Customers.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(200).send({
        message: "Customer deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleted customer",
      });
    });
};

//Update customer
exports.update = (req, res) => {
  logger.info("Endpoint called:update Customer");
  
  //const cuitValid = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
  const cuitValid = /^\d{9}$/;
  const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const addressValid = /^\s*\S+(?:\s+\S+){2}/;

  console.log(req.body);
  if (!req.body || req.body === {}) {
    return res.status(400).send({
      message: "Data cannot be empty",
    });
  }
  if (!req.body.cuit.match(cuitValid)) {
    res.status(400).send({ message: "Error: Invalid Cuit" });
  }
  if (!req.body.email.match(emailValid)) {
    return res.status(400).send({ message: "Error: Invalid Email" });
  }
  if (!req.body.address.match(addressValid)) {
    return res.status(400).send({ message: "Error: Invalid Address" });
  }
  Customers.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update customer",
        });
      } else res.status(200).send({ message: "Customer updated succesfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while updating customer",
      });
    });
};

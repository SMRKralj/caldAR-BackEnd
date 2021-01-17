const Boilers = require("../models/boilers");
require("slf4n-logging");
const logger = LoggerFactory.getLogger("Boilers");

//Get all boilers
exports.findAll = (req, res) => {
  logger.info("Endpoint called: getAllBoilers");
  Boilers.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error ocurred trying to get all boilers",
      });
    });
};

//Create a new boiler
exports.create = (req, res) => {
  logger.info("Endpoint called: createBoiler");
  if (!req.body.description && !req.body.idType) {
    res.status(400).send({ message: "Content cannot be empty " });
  }
  const boiler = new Boilers({
    description: req.body.description,
    idType: req.body.idType,
  });
  boiler
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the boiler.",
      });
    });
};

//Get boiler by ID
exports.findOne = (req, res) => {
  logger.info("Endpoint called: getBoilerByID");
  Boilers.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: `Boiler doesn't exist.`,
        });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving boiler.",
      });
    });
};

//Update boiler
exports.update = (req, res) => {
  logger.info("Endpoint called: updateBoiler");
  if (!req.body) {
    return res.status(400).send({
      message: "Data cannot be empty",
    });
  }
  if (!req.body.description || !req.body.idType) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  Boilers.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update boiler with id=${id}. Maybe boiler was not found!`,
        });
      } else res.status(200).send({ message: "Update Succesfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cannot update boiler",
      });
    });
};

//Delete boiler
exports.delete = (req, res) => {
  logger.info("Endpoint called: deleteBoiler");
  Boilers.findOneAndRemove({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Boiler was not found.",
        });
      } else res.status(200).send({ message: "Delete Succesfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cannot delete boiler",
      });
    });
};

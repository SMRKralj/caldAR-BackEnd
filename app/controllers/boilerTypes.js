const boilerTypes = require("../models/boilerTypes");
require("slf4n-logging");
const logger = LoggerFactory.getLogger("BoilerTypes");

//Create new boiler type
exports.create = (req, res) => {
  logger.info("Endpoint called:create new boiler type");
  if (
    req.body.type === "A" ||
    req.body.type === "B" ||
    req.body.type === "C" ||
    req.body.type === "D"
  ) {
    const boylerType = new boilerTypes({
      type: req.body.type,
      description: req.body.description,
    });
    boylerType
      .save(boylerType)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the boiler type",
        });
      });
  } else {
    return res.status(400).send({ message: "Error: Invalid Boiler Name" });
  }
};

//Get all boiler types
exports.findAll = (req, res) => {
  logger.info("Endpoint called: getAllBoilerTypes");
  boilerTypes
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error ocurred trying to get all boiler types",
      });
    });
};

//Get boiler type by ID
exports.findOne = (req, res) => {
  logger.info("Endpoint called: getBoilerType");
  boilerTypes
    .findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: `Boiler Type with id ${req.params.id} was not found.`,
        });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boiler type.",
      });
    });
};

//Update boiler type
exports.update = (req, res) => {
  logger.info("Endpoint called:update boiler type");
  if (
    req.body.type === "A" ||
    req.body.type === "B" ||
    req.body.type === "C" ||
    req.body.type === "D"
  ) {
    boilerTypes
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "Boiler type was not found.",
          });
        } else res.status(200).send({ message: "Update Succesfully.", data });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating boiler type",
        });
      });
  }
};

//Delete boiler type
exports.delete = (req, res) => {
  logger.info("Endpoint called:delete boiler type");
  boilerTypes
    .findOneAndRemove({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Boiler type with id ${id} doesn't exist.`,
        });
      } else res.status(200).send({ message: "Delete Succesfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting boiler type",
      });
    });
};

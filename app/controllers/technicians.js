const Technicians = require("../models/technicians");
require("slf4n-logging");

const logger = LoggerFactory.getLogger("Technicians");

//Create new technician
exports.create = (req, res) => {
  logger.info("Endpoint called: create new technician");

  const nameFor = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
  if (
    !req.body.fullName &&
    !req.body.boilersType &&
    !req.body.monthlyTimework &&
    !req.body.phoneNumber
  ) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }
  if (!req.body.fullName.match(nameFor)) {
    return res.status(400).send({ meessage: "Error: Name not valid" });
  }

  const technician = new Technicians({
    fullName: req.body.fullName,
    boilersType: req.body.boilersType,
    monthlyTimework: req.body.monthlyTimework,
    phoneNumber: req.body.phoneNumber,
  });

  technician
    .save(technician)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.meessage || "Something went wrong while creating new technician",
      });
    });
};

//Get all technicians
exports.findAll = (req, res) => {
  logger.info("Endpoint called:get all technicians");
  Technicians.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all technicians",
      });
    });
};

//Get technician
exports.findOne = (req, res) => {
  logger.info("Endpoint called:get technician by ID");

  Technicians.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Technician doesn't exists.",
        });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving technician",
      });
    });
};

//Delete technician
exports.delete = (req, res) => {
  logger.info("Endpoint called:delete Technician");

  Technicians.findOneAndRemove({ _id: req.params.id })
    .then((data) => {
      res.status(200).send({
        message: "Technician deleted successfully!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting technician",
      });
    });
};

//Update technician
exports.update = (req, res) => {
  logger.info("Endpoint called:update technician");

  const nameFor = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
  if (
    !req.body.fullName &&
    !req.body.boilersType &&
    !req.body.monthlyTimework &&
    !req.body.phoneNumber
  ) {
    return res.status(400).send({ message: "Content Cannot be empty" });
  }
  if (!req.body.fullName.match(nameFor)) {
    return res.status(400).send({ meessage: "Error: Name not valid" });
  }

  Technicians.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Technician was not found. Cannot update.",
        });
      } else
        res
          .status(200)
          .send({ message: "Technician updated succesfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while updating technician",
      });
    });
};

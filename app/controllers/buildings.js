const Buildings = require("../models/buildings");

require("slf4n-logging");

const logger = LoggerFactory.getLogger("Buildings");

// Get all buildings
exports.findAll = (req, res) => {
  logger.info("Endpoint called: getAllBuildings");
  Buildings.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving buildings",
      });
    });
};

//Get building by ID
exports.findOne = (req, res) => {
  logger.info("Endpoint called: getBuildingById");
  Buildings.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        logger.error(`No building found with ID ${req.params.id}`);
        return res.status(404).send({
          message: `No buildings found with id  ${req.params.id}`,
        });
      }
      logger.info(`Returning building with ID equal to ${req.params.id}`);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving buildings",
      });
    });
};

//Delete building
exports.delete = (req, res) => {
  logger.info("Endpoint called: deleteBuildingById");
  //const id = req.params.id;
  Buildings.findOneAndDelete(
    { _id: req.params.id },
    { useFindAndModify: false }
  )
    .then(() => {
      logger.info(`Deleting building with ID equal to ${req.params.id}`);
      res.send({ message: "Building removed" });
    })
    .catch(() => {
      logger.error(`Error trying to delete building with ID=` + id);
      return res
        .status(500)
        .json({ message: "Error trying to delete building with ID=" + id });
    });
};

//Create a new building
exports.create = (req, res) => {
  logger.info("Endpoint called: createBuilding");
  if (
    !req.body.address ||
    !req.body.boilers ||
    !req.body.fullName ||
    !req.body.phoneNumber
  ) {
    return res
      .status(400)
      .send({ message: "Specify all attributes to create a new building" });
  }

  // Create the building object
  const building = new Buildings({
    fullName: req.body.fullName,
    address: req.body.address,
    boilerId: req.body.boilers,
    phoneNumber: req.body.phoneNumber,
  });

  building
    .save(building)
    .then((data) => {
      logger.info(`Creating building with ID  ${req.body.id}`);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating buildings",
      });
    });
};

//Update a Customer by ID
exports.update = (req, res) => {
  logger.info("Endpoint called:update Buildings");
  if (!req.body) {
    return res.status(400).send({
      msg: "Data to update cannot to be empty!",
    });
  }

  //Validate request
  if (
    !req.body.address ||
    !req.body.boilers ||
    !req.body.fullName ||
    !req.body.phoneNumber
  ) {
    res.status(400).send({
      msg: "Content cannot be empty!",
    });
    return;
  }
  const id = req.params.id;

  Buildings.findOneAndUpdate({ id }, req.body, { useFindAndModify: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          msg: `Cannot update Building with id=${id}. Maybe building was not found!`,
        });
      } else res.send({ msg: "Building was updated successfully." });
    })
    .catch(() => {
      res.status(500).send({ msg: "Error updating Building with id=" + id });
    });
};

const Appointments = require("../models/appointments");
require("slf4n-logging");
const logger = LoggerFactory.getLogger("Appointments");

// Get all appointments

exports.findAll = (req, res) => {
  logger.info("Endpoint called: getAllAppointments");
  Appointments.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `An error ocurred trying to get all appointments`,
      });
    });
};

//Find a Appointment by ID

exports.findOne = (req, res) => {
  logger.info("Endpoint called: getAppointmentByID");
  Appointments.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          msg: `Appointment with id ${req.params.id} was not found.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Some error occurred while retrieving appointment.",
      });
    });
};

// Create a new appointment
exports.create = (req, res) => {
  logger.info("Endpoint called: createNewAppointment");
  if (
    !req.body.building ||
    !req.body.boiler ||
    !req.body.technician ||
    !req.body.startTime ||
    !req.body.endTime ||
    !req.body.monthlyTimework
  ) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  // Create a appointment
  const appointment = new Appointments({
    building: req.body.building,
    boiler: req.body.boiler,
    technician: req.body.technician,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    monthlyTimework: req.body.monthlyTimework,
  });

  // Save appointment
  appointment
    .save(appointment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the appointment.",
      });
    });
};

// Delete appointment by ID
exports.delete = (req, res) => {
  logger.info("Endpoint called:delete appointment");

  const id = req.params.id;
  Appointments.findOneAndRemove(
    { _id: id },
    { useFindAndModify: false },
    (err, item) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message ||
            `An error ocurred removing appointment with id ${id} `,
        });
      }
      if (!item) {
        return res
          .status(404)
          .send({ message: `Appointment with id ${id} doesn't exist.` });
      }
      res.send({ message: `Appointment was removed succesfully.` });
    }
  );
};

//Update Appointment by ID
exports.update = (req, res) => {
  logger.info("Endpoint called: updateAppointment");
  /*if (!req.body) {
    return res.status(400).send({
      msg: "Data to update cannot to be empty!",
    });
  }*/

  //Validate request
  if (
    !req.body.building ||
    !req.body.boiler ||
    !req.body.technician ||
    !req.body.startTime ||
    !req.endTime ||
    !req.body.monthlyTimework
  ) {
    res.status(400).send({
      msg: "Content cannot be empty!",
    });
    return;
  }
  const id = req.params.id;

  Appointments.findOneAndUpdate({ _id }, req.body, { useFindAndModify: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          msg: `Cannot update Appointment with id=${id}. Maybe appointment was not found!`,
        });
      } else res.send({ msg: "Appointment was updated successfully." });
    })
    .catch(() => {
      res.status(500).send({ msg: "Error updating Appointment with id=" + id });
    });
};

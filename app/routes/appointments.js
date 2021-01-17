const router = require("express").Router();
const appointments = require("../controllers/appointments.js");

// Get all appointments
router.get("/", appointments.findAll);

//Update appointment by ID
router.put("/:id", appointments.update);

//Get appointments by ID
router.get("/:id", appointments.findOne);

//Create appointments
router.post("/", appointments.create);

//Delete appointments
router.delete("/:id", appointments.delete);

module.exports = router;

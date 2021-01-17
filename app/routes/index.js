const buildingsRouter = require("./buildings");
const appointmentsRouter = require("./appointments");
const customersRouter = require("./customers");
const router = require("express").Router();
const techniciansRouter = require("./technicians");
const boilerTypesRouter = require("./boilerTypes");
const boilersRouter = require("./boilers");

// Building API Routes
router.use("/buildings", buildingsRouter);

// Technicians API Routes
router.use("/technicians", techniciansRouter);

// Customers API Routes
router.use("/customers", customersRouter);

// Appointments API Routes
router.use("/appointments", appointmentsRouter);

// Boilers-data API routes
router.use("/boilerTypes", boilerTypesRouter);

// Boilers API routes
router.use("/boilers", boilersRouter);

module.exports = router;

const boiler = require("../controllers/boilers.js");
const router = require("express").Router();

// Get all boilers
router.get("/", boiler.findAll);

// Create new boiler
router.post("/", boiler.create);

// Get one boiler
router.get("/:id", boiler.findOne);

// Update boiler
router.put("/:id", boiler.update);

// Delete boiler
router.delete("/:id", boiler.delete);

module.exports = router;

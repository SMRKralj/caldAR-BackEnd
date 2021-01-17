const boilertypes = require("../controllers/boilerTypes.js");
const router = require("express").Router();

// Get all boiler types
router.get("/", boilertypes.findAll);

// Create new boiler type
router.post("/", boilertypes.create);

// Get one boiler type
router.get("/:id", boilertypes.findOne);

// Update boiler type
router.put("/:id", boilertypes.update);

// Delete boiler type
router.delete("/:id", boilertypes.delete);

module.exports = router;

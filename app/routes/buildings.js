const building = require("../controllers/buildings.js");

const router = require("express").Router();

// GET ALL BUILDINGS
router.get("/", building.findAll);

// CREATE A NEW BUILDING
router.post("/", building.create);

// READ A SINGLE BUILDING
router.get("/:id", building.findOne);

// UPDATE A BUILDING
router.put("/:id", building.update);

// DELETE A BUILDING
router.delete("/:id", building.delete);

module.exports = router;

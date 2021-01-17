const mongoose = require("mongoose");

const boilerTypesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("boilerTypes", boilerTypesSchema);

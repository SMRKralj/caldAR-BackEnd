const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  cuit: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  buildings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
  ],
});

module.exports = mongoose.model("customers", customersSchema);

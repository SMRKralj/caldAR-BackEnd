const mongoose = require("mongoose");

const buildingsSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  boilers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boilers",
      required: true,
    },
  ],
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("buildings", buildingsSchema);

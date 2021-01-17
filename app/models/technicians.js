const mongoose = require("mongoose");

const techniciansSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  boilersType: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boilers",
      required: true,
    },
  ],
 monthlyTimework: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model("technicians", techniciansSchema);


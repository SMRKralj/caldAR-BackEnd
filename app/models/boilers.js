const mongoose = require("mongoose");

const boilersSchema = new mongoose.Schema({
  idType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Boilers",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("boilers", boilersSchema);

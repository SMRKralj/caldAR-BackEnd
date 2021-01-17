const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;

//URL MongoDB (current connection)
db.url =
  "mongodb+srv://admin:tviJQwPL7Pv8X7U@cluster0.ahvot.mongodb.net/caldAR?retryWrites=true&w=majority";

  //Matías connection
  //mongodb+srv://admin:admin@cluster0.mekob.mongodb.net/CaldAR?retryWrites=true&w=majority';

db.customers = require("./customers.js")(mongoose);
db.buildings = require("./buildings.js")(mongoose);
db.technicians = require("./technicians")(mongoose);
db.appointments = require("./appointments.js")(mongoose);
db.boilers = require("./boilers.js")(mongoose);
db.boilerTypes = require("./boilerTypes.js")(mongoose);

module.exports = db;

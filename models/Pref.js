const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prefSchema = new Schema({
  userId: {type: String, required: true},
  preferences: { type: String },
  date: { type: Date, default: Date.now }
});

const Pref = mongoose.model("Pref", prefSchema);

module.exports = Pref;

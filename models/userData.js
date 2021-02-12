const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  userId: {type: String, required: true},
  weight: { type: Number, required: true },
  bmi: { type: Number, required: true },
  bmr: { type: Number, required: true },
  cpd: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userID: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;

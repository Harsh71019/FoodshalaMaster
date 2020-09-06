const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DishSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: "menu",
  },
  role:{
    type: String,
    default:"manager",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isveg: {
    type: String,
    default: "Veg",
  },
  
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Dish = mongoose.model("dish", DishSchema);
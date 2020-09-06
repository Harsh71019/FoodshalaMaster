const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MenuSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },
  restaurantname: {
    type: String,
    required: true,
  },
  restaurantdescription: {
    type: String,
    required: true,
  },
  restauranttype: {
    type: String,
    required: true,
  },
  item: [
    {
      admin: {
        type: Schema.Types.ObjectId,
        ref: "admin",
      },
      menu: {
        type: Schema.Types.ObjectId,
        ref: "menus",
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "manager",
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
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Menu = mongoose.model("menu", MenuSchema);

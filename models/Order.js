const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
  },
  useremail: {
    type: String,
  },
  resname: {
    type: String,
  },
  _meals: [],
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "placed" },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);

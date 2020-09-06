const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Order = require("../../models/Order");
const Menu = require("../../models/Menu");
const auth = require("../../middleware/auth");
const authadmin = require("../../middleware/authadmin");
const { check, validationResult } = require("express-validator");

// @route GET api/orders
// @desc Get All orders
// @accesss Public

router.get("/user", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort("-created_at")
      .populate();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort("-created_at")
      .populate();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/admin", authadmin, async (req, res) => {
  try {
    const orderres = await Order.find({ admin: req.admin.id }).populate();
    res.json(orderres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.post(
//   "/",
//   [
//     auth,
//     [check("amount", "Amount is required").not().isEmpty()],
//     [check("status", "Status is required").not().isEmpty()],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { amount, status } = req.body;

//     //Build the profile object
//     const orderFields = {};
//     orderFields.user = req.user.id;
//     // orderFields.menu = req.menu.id;
//     if (amount) orderFields.amount = amount;
//     if (status) orderFields.status = status;

//     try {
//       let order = await Order.findOne({ user: req.user.id });
//       if (order) {
//         //Update
//         order = await Order.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: orderFields },
//           { new: true }
//         );
//         return res.json(order);
//       }

//       //Create
//       order = new Order(orderFields);
//       await order.save();
//       res.json(order);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//     res.send("Hell to backend development");
//   }
// );

router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user.id });
    order.populate();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error Creating Order");
  }
});

//

module.exports = router;

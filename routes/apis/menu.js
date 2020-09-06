const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authadmin = require("../../middleware/authadmin");
const Menu = require("../../models/Menu");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const { route } = require("./auth");
const request = require("request");
const { response } = require("express");
const config = require("config");

//@route  GET api/menu/me
//@desc   test route
//@access  Private

router.get("/me", authadmin, async (req, res) => {
  try {
    const menu = await Menu.findOne({
      admin: req.admin.id,
    }).populate("admin", [
      "name",
      "restaurantname",
      "role",
      "restaurantdescription",
      "restauranttype",
    ]);
    if (!menu) {
      return res.status(400).json({ msg: "There is not menu for this admin" });
    }
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  Get api/menu
//@desc   Get all menu
//@access  Public

router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find().populate("admin._id");
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// [
//   "name",
//   "restaurantname",
//   "restauranttype",
//   "restaurantdescription",
//   "role",
// ]

//@route  POST api/menu
//@desc   Create or Update a admin profile
//@access  Private

router.post(
  "/",
  [
    authadmin,
    [check("restaurantname", "Restaurant Name is required").not().isEmpty()],
    [check("restauranttype", "Restaurant Type is required").not().isEmpty()],
    [
      check("restaurantdescription", "Restaurant Description is required")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { restaurantname, restaurantdescription, restauranttype } = req.body;

    //Build the profile object
    const menuFields = {};
    menuFields.admin = req.admin.id;
    // menuFields.menu = req.menus.id;
    if (restaurantname) menuFields.restaurantname = restaurantname;
    if (restauranttype) menuFields.restauranttype = restauranttype;
    if (restaurantdescription)
      menuFields.restaurantdescription = restaurantdescription;

    try {
      let menu = await Menu.findOne({ admin: req.admin.id });
      if (menu) {
        //Update
        menu = await Menu.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: menuFields },
          { new: true }
        );
        return res.json(menu);
      }

      //Create
      menu = new Menu(menuFields);
      await menu.save();
      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    res.send("Hell to backend development");
  }
);

//@route  Get api/menu/admin/:admin_id
//@desc   Get all menu by admin id
//@access  Public

router.get("/admin/:admin_id", async (req, res) => {
  try {
    const menu = await Menu.findOne({
      admin: req.params.admin_id,
    }).populate("admin", [
      "name",
      "restaurantname",
      "role",
      "restaurantdescription",
      "restauranttype",
    ]);
    if (!menu)
      return res.status(400).json({ msg: "Menu not found for this user" });
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Menu not found for this user" });
    }
    res.status(500).send("Server Error");
  }
});

//@route  DELETE api/menu
//@desc   Delete all menu by admin id & posts
//@access  Private

router.delete("/", authadmin, async (req, res) => {
  try {
    //Remove Menu
    //Remove Restaurant Menu
    //await Post.deleteMany({ user: req.user.id });

    await Menu.findOneAndRemove({ admin: req.admin.id });
    //Remove User
    await Admin.findOneAndRemove({ _id: req.admin.id });

    res.json({ msg: "Admin Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  Put api/menu/item
//@desc   Add menu items
//@access  Private
router.put(
  "/item",
  [
    authadmin,
    [
      check("name", "name is required").not().isEmpty(),
      check("price", "price is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, description, isveg } = req.body;

    const newItem = {
      name,
      price,
      description,
      isveg,
    };
    newItem.admin = req.admin.id;

    try {
      const menu = await Menu.findOne({ admin: req.admin.id });
      menu.item.unshift(newItem);
      await menu.save();
      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    Put api/profile/experience/exp_id
//@desc     Delete profile experience
//@access   Private

router.delete("/item/:item_id", authadmin, async (req, res) => {
  try {
    const menu = await Menu.findOne({ admin: req.admin.id });
    //Remove Index

    const removeIndex = menu.item
      .map((items) => items.id)
      .indexOf(req.params.item_id);
    menu.item.splice(removeIndex, 1);
    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

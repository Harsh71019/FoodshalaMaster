const express = require("express");
const router = express.Router();
const authadmin = require("../../middleware/authadmin");
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route GET api/authadmin
// @desc Test Route

router.get("/", authadmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
  res.send("Admin Route");
});

//@route  POST api/authadmin
//@desc   Auth admin and get token
//@access  Public

router.post(
  "/",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password with 6 or more letters is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if the admin exists
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res

        
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return JSON web token

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      //Match admin and password

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, admintoken) => {
          if (err) throw err;
          res.json({ admintoken });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.send(500).send("Server Error");
    }
  }
);

module.exports = router;


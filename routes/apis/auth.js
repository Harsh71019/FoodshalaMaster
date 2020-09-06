const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// @route GET api/auth
// @desc Test Route

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
  res.send("User Route");
});

//@route  POST api/auth
//@desc   Auth user and get token
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
      // See if the users exists
      let user = await User.findOne({ email });
      if (!user) {
        return res

        
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return JSON web token

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Match user and password

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.send(500).send("Server Error");
    }
  }
);

module.exports = router;


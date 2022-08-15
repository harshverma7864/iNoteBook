const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisagood$oy";

//  ROUTE 1 : Create a user using:  POST "/api/auth/createuser ". Doesnt require auth . No login Required

router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name"),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a Valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //chech whether the user with this email exists alreaady

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }

      //bcryptjs part
      const salt = await bcrypt.genSalt(10);

      const SecPass = await bcrypt.hash(req.body.password, salt);

      //create a new User
      user = await User.create({
        name: req.body.name,
        password: SecPass,
        email: req.body.email,
      });

      //   .then(user => res.json(user))
      //   .catch(err =>
      //       {console.log(err)
      //   res.json({error: 'Please Enter a Unique Value', message: err.message })})

      // user.save()
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData);

      //   res.json(user);\
      success = true;
      res.json({success, authtoken });
      //cathing errors
    } catch (error) {
      console.error(message.error);
      res.status(500).send("Internal Server Error Bidu");
    }
  }
);

// ROUTE 2 : Authenticate a user using:  POST "/api/auth/login ". No login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct Details" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct Detials" });
      }

      //payload the data of user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success , authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
    }
  }
);

// ROUTE 3 : we will Logged in user  details using  :::  POST - method  endpoint- "/api/auth/getuser " -  login Required

router.post(
  "/getuser", fetchuser ,async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
  
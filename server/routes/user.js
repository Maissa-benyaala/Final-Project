const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {loginRules, registerRules, validation} = require("../middleware/validator");
const isAuth = require("../middleware/passport");

router.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const newUser = new User({ name, lastname, email, password });

    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ message: "email already exist" });
    }

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    console.log(hashedPassword);
    newUser.password = hashedPassword;

    const newUserToken = await newUser.save();
    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res
      .status(200)
      .send({ newUserToken, msg: "user is saved", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).send("can not save this user");
  }
});


router.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;
  try {

    const searchedUser = await User.findOne({ email });

    if (!searchedUser) {
      return res.status(400).send({ msg: "bad Credential" });
      console.log(searchedUser)
    }

    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match){ 
      return res.status(400).send({ msg: "bad Credential" });
    }

    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    console.log(token);

    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ message: "can not get the user" });
  }
});

router.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});

router.put("/:id", async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ msg: "user updated" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/profile", async (req, res) => {
  const user = await User.findById(re.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
  }
});
router.get("/", async (req, res) => {
  try {
    let result = await User.find();
    res.send({ users: result, msg: "users " });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
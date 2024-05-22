const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const env = require("../../env");

const registerUser = async (req, res) => {
  try {
    const { username, phoneNumber, email, password, dob, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        phoneNumber,
        email,
        password: hashedPassword,
        dob: new Date(dob),
        name,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid user email or password" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ userId: user._id }, env.TOKEN_KEY, {
        expiresIn: "5h",
      });

      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const protectedRoute = (req, res) => {
  res.json({ message: "This is a protected route" });
};

const readUser = async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email: email });
  res.status(200).send({
    message: "Success",
    data: user,
  });
};

const editUser = async (req, res) => {
  const { phoneNumber, name, email, dob } = req.body;
  const updateObject = {
    name,
    phoneNumber,
    dob: new Date(dob),
  };
  const filteredUpdate = Object.fromEntries(
    Object.entries(updateObject).filter(
      ([key, value]) => value !== null && value !== undefined
    )
  );
  const updatedUser = await User.updateOne(
    { email },
    {
      $set: filteredUpdate,
    }
  );
  if (updatedUser.modifiedCount) {
    res.status(200).send({
      message: "User details updated successfully",
    });
  } else {
    res.status(200).send({
      message: "Nothing to update",
    });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  const deleted = await User.deleteOne({ email: email });
  if(deleted.deletedCount) {
    res.status(200).send({
      message: "User deleted successfully"
    })
  } else {
    res.status(200).send({
      message: "Nothing to delete"
    })
  }
};

module.exports = {
  registerUser,
  loginUser,
  protectedRoute,
  editUser,
  readUser,
  deleteUser
};

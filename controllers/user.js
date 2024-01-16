const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
      return res.json({
        success: false,
        message: "This email is already in use, try sign-in",
      });
    else {
      const user = await User({
        firstname,
        lastname,
        email,
        password,
      });
      await user.save();
      res.json({ success: true, user });
    }

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    // // Save the token to the user's tokens array
    // await User.findByIdAndUpdate(user._id, {
    //   $push: { tokens: { token, signedAt: Date.now().toString() } },
    // });

    // res.json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming the user ID is available in the request object

    // Extract the fields to be updated from req.body
    const {
      firstname,
      lastname,
      schoolname,
      standard,
      parentFirstName,
      parentLastName,
    } = req.body;
    console.log(req.body);
    // Construct the update object with the specified fields
    const updateFields = {
      firstname,
      lastname,
      schoolname,
      standard,
      parentFirstName,
      parentLastName,
    };

    // Example: Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating user profile" });
  }
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "1d",
  // });

  // let oldTokens = user.tokens || [];

  // if (oldTokens.length) {
  //   oldTokens = oldTokens.filter((t) => {
  //     const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
  //     if (timeDiff < 86400) {
  //       return t;
  //     }
  //   });
  // }

  // await User.findByIdAndUpdate(user._id, {
  //   tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  // });

  const userInfo = {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
  };

  res.json({ success: true, user: userInfo }); //token
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    // const token = req.headers.authorization.split(" ")[1];
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Authorization fail!" });
    // }

    // const tokens = req.user.tokens;

    // const newTokens = tokens.filter((t) => t.token !== token);

    // await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
};

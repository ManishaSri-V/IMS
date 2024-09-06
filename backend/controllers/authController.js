const { User } = require("../models/userModel");
const { generateToken } = require("../config/auth");

const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.log("There was an error connecting to my redis cluster", err);
});

client.connect();

exports.registerUser = async (req, res) => {
  const { username, role, password } = req.body;
  try {
    await client.set("isNewUserAdded", "true");

    // user is a mongodb document
    const user = new User({
      username: username,
      role: role,
      password: password,
    });

    // save this user inside mongodb. We are inserting the user mongodb document inside User mongoDb collectin
    await user.save();

    const userRedis = JSON.stringify({ username, role, password });
    try {
      await client.sAdd("users", userRedis);
      await client.set("isNewUserAdded", "false");
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Error while inserting user inside Redis",
      });
    }
    // generate the token for this user who has just been registered
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token: token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // mongoDb operation to find the user
    const user = await User.findOne({ username: username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.json({
        success: true,
        token: token,
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

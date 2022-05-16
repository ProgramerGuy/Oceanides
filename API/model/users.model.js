require("dotenv").config();
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("./token.model");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

/* This is creating a schema for the user model. */
const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});

/* This is a pre-save hook that will hash the password before saving it to the database. */
UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

/* This is a method that is checking if the username exists in the database. */
UserSchema.methods.usernameExists = async function (username) {
  try {
    let result = await Mongoose.model("User").find({ username: username });
    return result.length > 0;
  } catch (ex) {
    return false;
  }
};

/* This is a method that is checking if the password is correct. */
UserSchema.methods.isCorrectPassword = async function (password, hash) {
  try {
    console.log(password, hash);
    const same = await bcrypt.compare(password, hash);

    return same;
  } catch (ex) {
    return false;
  }
};

UserSchema.methods.createAccessToken = function () {
  const { id, username } = this;
  const accessToken = jwt.sign(
    { user: { id, username } },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return accessToken;
};

UserSchema.methods.createRefreshToken = async function () {
  const { id, username } = this;
  const refreshToken = jwt.sign(
    { user: { id, username } },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "20d" }
  );

  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (error) {
    next(new Error("Error creating refresh token"));
  }

  return accessToken;
};

module.exports = Mongoose.model("User", UserSchema);

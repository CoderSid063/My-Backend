import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudnary url
      required: true,
    },
    coverimage: {
      type: String,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Videos",
    },
    password: {
      type: String,
      required: [true, " Password Required"],
    },
    refreshToken: {
      type: string,
    },
  },
  { timestamps: true }
);

//pre middleware hook

// type of middleware is : "save"
//i am not using arrow fnc bcz i cant not use "this." .
userSchema.pre("save", async function (next) {
  //checking if the password field changed then encrypt the pasword
  if (!this.isModified("password")) return next();

  // hash is a method inside bcrypt use for encrypt
  this.password = bcrypt.hash(this.password, 10);
});

// before exporrt "User" This method check if a given password matches the encrypted password stored in the database
//compare returns true/false
userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.method.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.method.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

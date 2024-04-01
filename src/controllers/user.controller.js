import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// this method for generate access and refresh token
const tokenHandler = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save reftoken in db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating the accesToken"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  /**
   * check files are uploaded from frontend {file:userRoutes "8"}
   * validation check
   * check user already exist: email
   * check for image , check for avatar
   * upload the file in cloudnary
   * create user object- create entry in db
   * remove password and refresh token from response
   * check for user creation
   * return response
   */

  const { fullName, email, username, password } = req.body;
  console.log(req.body);

  //validation check :-
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check user already exist: email :-
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  //console.log(req.files);

  //check for image , check for avatar :-
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar required");
  }
  // if (!coverImageLocalPath) {
  //   throw new ApiError(400, "avatar required");
  // }

  //upload the file in cloudnary :-
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar required");
  }

  //create user object- create entry in db :-
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //remove password and refresh token from response :-
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation :-
  if (!createdUser) {
    throw new ApiError(500, "Error while registering thr user");
  }

  //return response :-
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully"));
});

// const registerUser = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     message: "ok",
//   });
// });

const loginUser = asyncHandler(async (req, res) => {
  //data from req.body:-
  const { email, username, password } = req.body;
  console.log(req.body);

  //login with either username or email :-
  if (!username || !email) {
    throw new ApiError(400, "username or email required");
  }

  //find user or email exist in db:-
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  console.log(user);
  if (!user) {
    throw new ApiError(404, "user not exist");
  }

  //check for password :-
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password not valid");
  }

  //token generate :-
  const { accessToken, refreshToken } = await tokenHandler(user._id);

  // sending cookies to user :-
  const loggedInUser = await User.findById(used._id).select(
    "-password -refreshToken"
  );
  console.log(loggedInUser);

  //options for cokkies:-
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user loggedin successfully"
      )
    );
});

const logoutUser = async((req, res) => {});

export { registerUser, loginUser, logoutUser };

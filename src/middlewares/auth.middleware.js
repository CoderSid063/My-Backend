import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// This middlware verify the loginuser in my DB or not then add information object name:"user" in "request" like "req.objName".
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    //get token from cookies or authorization :-
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    //verify and decode the token:-
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //find data of loginuser from db :-
    const user = await User.findById(decodeToken?._id).select(
      "-pasword -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "Invalid Acess Token");
    }
    console.log(user, "user found in db");

    //add user information in req
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});

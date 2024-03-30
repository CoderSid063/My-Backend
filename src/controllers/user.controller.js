import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  //check files are uploaded from frontend
  //check for any field is not emoty
  //check user already exist: phone number, email
  //check for image , check for avatar
  //upload the file in cloudnary
  //create user object- create entry in db
  //remove password and refresh token from response
  //check for user creation
  // return response

  const { email, password } = req.body;
  console.log(email, password);
});

// const registerUser = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     message: "ok",
//   });
// });

export default registerUser;

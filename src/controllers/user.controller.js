import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "My Backend",
  });
});

//this function not using "asyncHandler" wrapper.

/* 
if we have no function that need to use "asyn await" then we can't use asyn await method in the below "registerUser",when i used await in ("fetchUserData") without creating  it show the error :- "ReferenceError: fetchUserData is not defined" .
*/

/*
const registerUser = async (req, res) => {
  try {
    // const userData = await fetchUserData(req.userId);

    res.status(200).json({
      message: "my Backend",
    });
  } catch (error) {
    console.log("Error in registerUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
*/

export default registerUser;

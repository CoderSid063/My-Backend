/*
HigherOrder function :- a higher order function which take function as a parameter or can return the function
Ex :--  const asyncHandler = (fn) => () =>{}
        const asyncHandler = (fn) => {() =>{}}
        const asyncHandler = (fn) => {async()=>{}};
*/

// This is a higher order function which return a promice. this is used in a production company.

/*
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
*/

// This is a higher order function using try catch block

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(res, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      success: false,
      message: err.messsage,
    });
  }
};

export { asyncHandler };

const asyncHandler = (requestHandler) => {
  (res, req, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = (fn) => {() =>{}}
// const asyncHandler = (fn) => {async()=>{}};

/*const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(res, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      success: false,
      message: err.messsage,
    });
  }
};
*/

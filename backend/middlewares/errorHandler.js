// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.isOperational ? err.message : "Something went wrong!", // generic message for unexpected errors
  };

  // Only show stack trace in development
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
    console.error(err); // detailed error in dev
  } else {
    // In production, log internally but don't show stack
    // You could integrate a logger like Winston or Sentry here
    console.error("Error occurred:", err.message);
  }

  res.status(statusCode).json(response);
};

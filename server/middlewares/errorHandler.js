function errorHandler(error, req, res, next) {
  console.log(error);

  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors
        ? error.errors.map((err) => err.message).join(", ")
        : "Invalid or missing parameter(s)";
      break;
    case "invalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Forbidden":
      status = 403;
      message = "You don't have access";
      break;
    case "notFound":
      status = 404;
      message = "Error not Found";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;

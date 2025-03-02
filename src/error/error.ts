import httpStatus from "http-status";

type ErrorResponse = {
  status: "error";
  error: true;
  message: string;
  statusCode: number;
};

const createErrorResponse = (
  message: string,
  statusCode: number
): ErrorResponse => ({
  status: "error",
  error: true,
  message,
  statusCode,
});

const noDuplicateError = createErrorResponse(
  "Already exists",
  httpStatus.BAD_REQUEST
);
const doesNotExistError = createErrorResponse(
  "Does not exist",
  httpStatus.NOT_FOUND
);
const passwordMismatchError = createErrorResponse(
  "Invalid password",
  httpStatus.UNAUTHORIZED
);
const invalidTokenError = createErrorResponse(
  "Invalid token",
  httpStatus.UNAUTHORIZED
);
const invalidVerificationEmail = createErrorResponse(
  "Invalid verification email",
  httpStatus.INTERNAL_SERVER_ERROR
);
const defaultError = createErrorResponse(
  "Internal Server Error",
  httpStatus.INTERNAL_SERVER_ERROR
);

const handleValidationError = (err: any): ErrorResponse => {
  return createErrorResponse("Invalid Fields", httpStatus.BAD_REQUEST);
};

export {
  noDuplicateError,
  handleValidationError,
  doesNotExistError,
  passwordMismatchError,
  invalidTokenError,
  invalidVerificationEmail,
  defaultError,
  createErrorResponse,
};

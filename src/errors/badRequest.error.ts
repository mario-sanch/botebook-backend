import CustomAPIError, { ErrorCode } from "./custom.error";

class BadRequestError extends CustomAPIError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}

export default BadRequestError;

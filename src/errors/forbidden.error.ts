import CustomAPIError, { ErrorCode } from "./custom.error";

class ForbiddenError extends CustomAPIError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 403, null);
  }
}

export default ForbiddenError;

import CustomAPIError, { ErrorCode } from "./custom.error";

class UnAuthenticatedError extends CustomAPIError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 401, null);
  }
}

export default UnAuthenticatedError;

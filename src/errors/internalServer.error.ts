import CustomAPIError, { ErrorCode } from "./custom.error";

class InternalServerError extends CustomAPIError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 500, null);
  }
}

export default InternalServerError;

import CustomAPIError, { ErrorCode } from "./custom.error";

class NotFoundError extends CustomAPIError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null);
  }
}

export default NotFoundError;

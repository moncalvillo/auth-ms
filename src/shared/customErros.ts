export class CodedError extends Error {
  statusCode: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.statusCode = code;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends CodedError {
  constructor(message: string) {
    super(ErrorCode.BAD_REQUEST, message);
    this.name = "Validation Error";
  }
}
export class DatabaseError extends CodedError {
  constructor(message: string) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, message);
    this.name = "Database Error";
  }
}
export class AuthenticationError extends CodedError {
  constructor(message: string) {
    super(ErrorCode.UNAUTHORIZED, message);
    this.name = "Authentication Error";
  }
}
export class NotFoundError extends CodedError {
  constructor(message: string) {
    super(ErrorCode.NOT_FOUND, message);
    this.name = "Not Found Error";
  }
}

export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

import { HttpStatus } from '@nestjs/common';

export class ErrorCode {
  static GENERAL = new ErrorCode('E001', HttpStatus.INTERNAL_SERVER_ERROR);
  static INVALID_INPUT = new ErrorCode('EI01', HttpStatus.BAD_REQUEST);
  static CONDITION_FAILED = new ErrorCode('EI02', HttpStatus.UNPROCESSABLE_ENTITY);
  static QUOTA_EXHAUSTED = new ErrorCode('EB01', HttpStatus.FAILED_DEPENDENCY);
  static CHANNEL_DENIED = new ErrorCode('EB01', HttpStatus.FAILED_DEPENDENCY);
  static UNKNOWN = new ErrorCode('EZZZ', HttpStatus.INTERNAL_SERVER_ERROR);

  constructor(errCode: string, httpStatus: HttpStatus) {
    this.errCode = errCode;
    this.httpStatusCode = httpStatus;
  }

  errCode: string;
  httpStatusCode: HttpStatus;
}

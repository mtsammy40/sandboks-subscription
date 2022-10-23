import { Validatable } from '../../commons/Validatable';
import { ApplicationException } from '../../commons/exceptions/application.exception';
import { ErrorCode } from '../../commons/exceptions/error.code';

export class CreateSubscriptionDto implements Validatable {
  userId: string;
  planId: string;

  async test(): Promise<boolean> {
    if (!this.userId) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Invalid User Id',
      );
    }

    if (!this.planId) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Invalid Plan Id',
      );
    }
    return true;
  }
}

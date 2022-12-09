import { Validatable } from '../../common/Validatable';
import { ApplicationException } from '../../common/exceptions/application.exception';
import { ErrorCode } from '../../common/exceptions/error.code';

export class CreateSubscriptionDto implements Validatable {
  userId: string;
  planId: string;

  constructor(userId: string, planId: string) {
    this.planId = planId;
    this.userId = userId;
  }

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

export enum PlatformEvents {
  SUBSCRIPTION_CREATED = 'subscription_created',
  SUBSCRIPTION_CREATION_FAILED = 'subscription_creation_failed',

  NOTIFICATION_ACCOUNTING_DONE = 'notification_accounting_done',
  NOTIFICATION_ACCOUNTING_FAILED = 'notification_accounting_failed',

  SUBSCRIPTION_SUSPENDED = 'subscription_suspended',
  SUBSCRIPTION_SUSPENSION_FAILED = 'subscription_suspension_failed',

  SUBSCRIPTION_EXPIRED = 'subscription_expired',
  SUBSCRIPTION_EXPIRATION_FAILED = 'subscription_expiration_failed',

  // CONSUME
  USER_CREATED = 'user_created',
  CREATE_SUBSCRIPTION_REQUESTED = 'create_subscription_requested',
  SUSPEND_SUBSCRIPTION_REQUESTED = 'suspend_subscription_requested',
  EXPIRE_SUBSCRIPTION_REQUESTED = 'expire_subscription_requested',
  NOTIFICATION_POSTING_REQUESTED = 'notification_processing_requested',
}

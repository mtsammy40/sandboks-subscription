export interface Validatable {
  test(): Promise<boolean>;
}

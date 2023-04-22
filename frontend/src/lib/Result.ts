export type Result<Data, Error extends NonNullable<unknown>> =
  | [Error]
  | [null, Data];

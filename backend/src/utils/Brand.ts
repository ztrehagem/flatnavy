export type Brand<T, S extends symbol> = T & { [brand in S]: void };

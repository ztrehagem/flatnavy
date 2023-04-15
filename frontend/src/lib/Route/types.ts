export type RoutesType<
  Records,
  Prefix extends string = ""
> = UnionToIntersection<
  Records extends (infer Record)[] ? RouteType<Record, Prefix> : never
>;

type RouteType<Record, Prefix extends string> = Record extends {
  path: infer Path;
  children?: infer Children;
}
  ? Path extends string
    ? {
        [key in Join<Prefix, Path>]: PathParam<Join<Prefix, Path>>;
      } & RoutesType<Children, Join<Prefix, Path>>
    : never
  : never;

type PathParamName<T extends string> = T extends `${infer L}/${infer R}`
  ? PathParamName<L> | PathParamName<R>
  : T extends `:${infer Param}`
  ? Param
  : never;

type PathParam<T extends string> = Record<PathParamName<T>, string>;

type Join<
  From extends string,
  To extends string
> = `${TrimTrailingSlash<From>}/${To}`;

type TrimTrailingSlash<T extends string> = T extends `${infer U}/` ? U : T;

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

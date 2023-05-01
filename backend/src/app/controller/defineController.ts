import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type {
  ContextConfigDefault,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteOptions,
} from "fastify";

export type RouteTypebox<Schema extends FastifySchema> = RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  Schema,
  TypeBoxTypeProvider
>;

export type RouteFactory<T, Schema extends FastifySchema> = (
  context: T
) => RouteTypebox<Schema>;

export const defineRoute = <T, Schema extends FastifySchema>(
  factory: RouteFactory<T, Schema>
): RouteFactory<T, Schema> => factory;

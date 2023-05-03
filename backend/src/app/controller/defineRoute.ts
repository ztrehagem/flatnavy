import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type {
  ContextConfigDefault,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteOptions,
} from "fastify";

export type TypedRoute<Schema extends FastifySchema> = RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  Schema,
  JsonSchemaToTsProvider
>;

export type RouteFactory<T, Schema extends FastifySchema> = (
  context: T
) => TypedRoute<Schema>;

export const defineRoute = <T, Schema extends FastifySchema>(
  factory: RouteFactory<T, Schema>
): RouteFactory<T, Schema> => factory;

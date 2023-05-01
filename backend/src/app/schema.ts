import { Type, type UnsafeOptions } from "@fastify/type-provider-typebox";

const StringEnum = <T extends string[]>(
  values: [...T],
  options?: UnsafeOptions
) => Type.Unsafe<T[number]>({ ...options, type: "string", enum: values });

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace schema {
  export const UserHandle = Type.String({
    $id: "UserHandle",
    title: "UserHandle",
    examples: ["JohnDoe123"],
  });

  export const User = Type.Object(
    {
      handle: Type.Ref(UserHandle),
      name: Type.Union([Type.String(), Type.Null()], {
        examples: ["John Doe ✌"],
      }),
    },
    {
      $id: "User",
      title: "User",
    }
  );

  export const Post = Type.Object(
    {
      id: Type.Integer(),
      body: Type.String(),
      dateTime: Type.String({ format: "date-time" }),
      user: Type.Ref(User),
    },
    {
      $id: "Post",
      title: "Post",
    }
  );

  export const TimelineScope = StringEnum(["local"], {
    $id: "TimelineScope",
    title: "TimelineScope",
  });

  export const TimelineEntry = Type.Object(
    {
      id: Type.String(),
      post: Type.Ref(Post),
    },
    { $id: "TimelineEntry", title: "TimelineEntry" }
  );
}

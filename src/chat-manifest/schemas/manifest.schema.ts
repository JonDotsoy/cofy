import { object, union, string, array, optional } from "zod";

export const MessageObject = union([
  object({ system: string() }),
  object({ user: string() }),
  object({ assistant: string() }),
]);

export const ManifestSchema = object({
  output: optional(string()),
  options: optional(
    object({
      model: optional(string()),
    }),
  ),
  messages: array(MessageObject),
});

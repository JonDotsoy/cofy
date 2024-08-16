import { object, union, string, array, optional } from "zod";

export const MessageContent = union([
  string(),
  object({
    from: string(),
  }),
]);

export const MessageObject = union([
  object({ system: MessageContent }),
  object({ user: MessageContent }),
  object({ assistant: MessageContent }),
]);

export const ManifestSchema = object({
  document_id: optional(string()).describe("Experimental"),
  output: optional(string()).describe("Experimental"),
  options: optional(
    object({
      model: optional(string()).describe("Sample: llama3.1, llama3"),
    }),
  ),
  extends: optional(string()).describe(
    "Source to import messages. Able lo load files",
  ),
  messages: array(MessageObject),
});

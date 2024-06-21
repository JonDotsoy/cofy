import * as YAML from "yaml";
import { Ollama, type Message } from "ollama";
import type { ManifestDocument } from "../chat-manifest/manifest-document";
import type { MessageObjectDto } from "../chat-manifest/dto/manifest.dto";

export const ollama = new Ollama();

const messageObjectToMessage = (
  messageObject: MessageObjectDto,
): Message | null => {
  if ("system" in messageObject)
    return { role: "system", content: messageObject.system };
  if ("user" in messageObject)
    return { role: "user", content: messageObject.user };
  if ("assistant" in messageObject)
    return { role: "assistant", content: messageObject.assistant };

  return null;
};

export const getMessagesFromManifest = async function* (
  manifest: ManifestDocument,
) {
  for (const messageObject of (await manifest.getManifest()).messages) {
    const message = messageObjectToMessage(messageObject);
    if (message) yield message;
  }
};

export const chatWithManifest = async (
  manifestDocument: ManifestDocument,
  options?: {
    model?: string;
    onStartWrite?: () => void;
    defaultModel?: string;
  },
) => {
  const manifest = await manifestDocument.getManifest();

  const response = await ollama.chat({
    model:
      options?.model ??
      manifest.options?.model ??
      options?.defaultModel ??
      "llama3",
    messages: await Array.fromAsync(getMessagesFromManifest(manifestDocument)),
    stream: true,
  });

  let assistantMessage = "";
  manifestDocument.addInWithReflect(
    ["messages"],
    new YAML.YAMLMap(),
    (assistantMessageScalar) => {
      const scalar = new YAML.Scalar(assistantMessage);
      scalar.type = YAML.Scalar.BLOCK_LITERAL;
      assistantMessageScalar.set("assistant", scalar);
    },
  );
  for await (const message of response) {
    options?.onStartWrite?.();
    assistantMessage = `${assistantMessage}${message.message.content}`;
    process.stdout.write(message.message.content);
    await manifestDocument.save();
  }
};

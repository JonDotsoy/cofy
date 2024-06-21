import zodToJsonSchema from "zod-to-json-schema";
import { ManifestSchema } from "../chat-manifest/schemas/manifest.schema";
import * as fs from "fs/promises";

export class SchemaDocument {
  #jsonSchema = zodToJsonSchema(ManifestSchema);
  #url: URL;

  constructor(path: { toString(): string }) {
    if (!URL.canParse(path.toString())) throw new Error("Invalid path");
    this.#url = new URL(path.toString());
  }

  location() {
    return this.#url.toString();
  }

  async save() {
    await fs.writeFile(
      new URL(this.location()),
      JSON.stringify(this.#jsonSchema, null, 2),
    );
  }
}

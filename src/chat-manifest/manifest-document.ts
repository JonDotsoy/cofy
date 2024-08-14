import * as YAML from "yaml";
import type { Document } from "yaml";
import type { ManifestDto } from "./dto/manifest.dto";
import { ManifestSchema } from "./schemas/manifest.schema";
import * as fs from "fs/promises";
import type { SchemaDocument } from "../schema-file/schema-document";
import { vpath } from "./vpath";
import { $ } from "bun";
import * as Handlebars from "handlebars";

const logWarn = (message: string) => {
  if (logWarn.logged) return
  logWarn.logged = true
  console.warn(message)
}
logWarn.logged = false

/**
 * # Manifest-Document API
 * 
 * The Manifest-Document API enables the reading of YAML files and processing of conversations that will be sent to a Large Language Model (LLM). This library features a `ManifestDocument` class.
 * 
 * ## Class ManifestDocument
 * 
 * The `ManifestDocument` class serves as the basis for interacting with YAML files. It provides methods useful for loading, processing, and manipulating the information contained within these files.
 * 
 * @example
 * const { ManifestDocument } = require('manifest-document');
 * 
 * // Load a YAML file from a specified path
 * const yamlPath = './path/to/your/yaml/file.yaml';
 * const manifestDocument = await ManifestDocument.fromPath(yamlPath);
 */
export class ManifestDocument {
  #manifest: Promise<ManifestDto>;
  #reflects = new Set<() => void>();
  #handlebars = Handlebars.create();
  // #path: URL | undefined = undefined;

  private constructor(
    readonly path: URL,
    readonly doc: Document,
  ) {
    this.#manifest = this.loadingManifestWithContext();

    this.#handlebars.registerHelper("include", (...p) => {
      console.log("🚀 ~ handlebars.registerHelper ~ p:", p);
      return "[[ol]]";
    });
  }

  reload() {
    this.#manifest = this.loadingManifestWithContext();
  }

  async getManifest() {
    return await this.#manifest;
  }

  async downloadFileContent(path: string) {
    return await fs.readFile(new URL(path, this.path), "utf-8");
  }

  /**
   * Load and process a YAML file. It takes the contents of the YAML file as input, parses it using the ManifestSchema, and returns the parsed data.
   * @returns A resolves with the parsed manifest data
   */
  async loadingManifestWithContext() {
    const includes = new Map<string, string | undefined>();
    const shells = new Map<string, string | undefined>();

    const manifest = ManifestSchema.parse(this.doc.toJSON());

    if (manifest.extends) {
      logWarn(`The "extends" property is a experimental feature.`);
      const nextManifest = ManifestSchema.parse(YAML.parse(await fs.readFile(manifest.extends, 'utf-8')));
      manifest.messages = [
        ...nextManifest.messages,
        ...manifest.messages,
      ];
    }

    const handlebars = Handlebars.create();

    handlebars.registerHelper("include", function (pathInclude) {
      if (typeof pathInclude === "string") {
        const result = includes.get(pathInclude);
        includes.set(pathInclude, result);
        return result;
      }
    });

    handlebars.registerHelper("$", function (cmd) {
      if (typeof cmd === "string") {
        const result = shells.get(cmd);
        shells.set(cmd, result);
        return result;
      }
    });

    for (const e of vpath({ obj: manifest })) {
      if (e.parent) {
        const render = handlebars.compile(e.parent[e.key], { noEscape: true });

        render({});

        for (const [includePath, currentValue] of includes) {
          if (currentValue !== undefined) continue;

          includes.set(
            includePath,
            "\n" +
            `content of file ${includePath}:\n` +
            "```\n" +
            `${await this.downloadFileContent(includePath)}\n` +
            "```\n",
          );
        }

        for (const [cmd, currentValue] of shells) {
          if (currentValue !== undefined) continue;

          const children = await $`sh -c ${cmd}`;

          shells.set(
            cmd,
            "\n" +
            `shell execution ${JSON.stringify(cmd)}:\n` +
            "```\n" +
            `${await children.text()}\n` +
            "```\n",
          );
        }

        e.parent[e.key] = render({});
      }
    }
    return manifest;
  }

  setSchemaIfNotExists(schemaDocument: SchemaDocument) {
    if (this.doc.commentBefore) return;
    this.doc.commentBefore = ` yaml-language-server: $schema=${schemaDocument.location()}`;
  }

  getDocumentId() {
    const documentIdScalar = this.doc.getIn(["document_id"], true);
    if (
      YAML.isScalar(documentIdScalar) &&
      typeof documentIdScalar.value === "string"
    )
      return documentIdScalar.value;
    return null;
  }

  addInWithReflect<T>(path: string[], ref: T, cbOnSabe: (map: T) => void) {
    const node = ref;
    this.doc.addIn(path, node);
    this.#reflects.add(() => cbOnSabe(node));
  }

  addMessage(role: "user", prompt: string) {
    const scalar = new YAML.YAMLMap();
    scalar.set(role, new YAML.Scalar(prompt));
    this.doc.addIn(["messages"], scalar);
  }

  toDocument() {
    this.#reflects.forEach((cb) => cb());
    const d = this.getDocumentId();
    if (d === null) {
      const messages = this.doc.get("messages");
      this.doc.delete("messages");
      this.doc.set("messages", messages);
    }
    return this.doc;
  }

  async save() {
    const path = this.path;
    if (!path) throw new Error("Path not found");
    await fs.writeFile(path, this.toDocument().toString());
  }

  // static #pathsOfManifests = new WeakMap<ManifestDocument, URL>();

  /**
   * *   **Description:** Loads a YAML file from a specified path and returns an instance of `ManifestDocument`.
   * *   **Parameters:**
   *     *   `LikePath`: The path to the YAML file to be loaded.
   * *   **Return:** An instance of the `ManifestDocument` class.
   * 
   * @example
   * const { ManifestDocument } = require('manifest-document');
   * 
   * // Load a YAML file from a specified path
   * const yamlPath = './path/to/your/yaml/file.yaml';
   * const manifestDocument = await ManifestDocument.fromPath(yamlPath);
   * @param path 
   * @returns 
   */
  static async fromPath(path: { toString(): string }) {
    if (!URL.canParse(path.toString())) throw new Error("Invalid path");
    const pathUrl = new URL(path.toString());
    const manifest = new ManifestDocument(
      pathUrl,
      YAML.parseDocument(await fs.readFile(pathUrl, "utf-8")),
    );
    return manifest;
  }
}

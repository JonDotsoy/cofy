import * as YAML from "yaml";
import type { Document } from "yaml";
import type { ManifestDto } from "./dto/manifest.dto";
import { ManifestSchema } from "./schemas/manifest.schema";
import * as fs from "fs/promises";
import type { SchemaDocument } from "../schema-file/schema-document";
import { vpath } from "./vpath";
import { stringTemplateFrom } from "./stringTemplateFrom";
import { $ } from "bun";
import * as Handlebars from "handlebars";

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

  async getManifest() {
    return await this.#manifest;
  }

  async downloadFileContent(path: string) {
    return await fs.readFile(new URL(path, this.path), "utf-8");
  }

  async loadingManifestWithContext() {
    const includes = new Map<string, string | undefined>();
    const shells = new Map<string, string | undefined>();

    const manifest = ManifestSchema.parse(this.doc.toJSON());

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

  setSchemaDocument(schemaDocument: SchemaDocument) {
    if (this.doc.commentBefore) return;
    this.doc.commentBefore = ` yaml-language-server: $schema=${schemaDocument.location()}`;
  }

  addInWithReflect<T>(path: string[], ref: T, cbOnSabe: (map: T) => void) {
    const node = ref;
    this.doc.addIn(path, node);
    this.#reflects.add(() => cbOnSabe(node));
  }

  toDocument() {
    this.#reflects.forEach((cb) => cb());
    return this.doc;
  }

  async save() {
    const path = this.path;
    if (!path) throw new Error("Path not found");
    await fs.writeFile(path, this.toDocument().toString());
  }

  // static #pathsOfManifests = new WeakMap<ManifestDocument, URL>();

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

import * as YAML from "yaml";
import type { Document } from "yaml";
import type { ManifestDto } from "./dto/manifest.dto";
import { ManifestSchema } from "./schemas/manifest.schema";
import * as fs from "fs/promises";
import type { SchemaDocument } from "../schema-file/schema-document";
import { vpath } from "./vpath";
import { stringTemplateFrom } from "./stringTemplateFrom";

export class ManifestDocument {
  #manifest: Promise<ManifestDto>;
  #reflects = new Set<() => void>();

  constructor(readonly doc: Document) {
    this.#manifest = this.loadingManifestWithContext();
  }

  async getManifest() {
    return await this.#manifest;
  }

  async downloadFileContent(path: string) {
    return await fs.readFile(path, "utf-8");
  }

  async loadingManifestWithContext() {
    const manifest = ManifestSchema.parse(this.doc.toJSON());
    for (const e of vpath({ obj: manifest })) {
      if (e.parent) {
        e.parent[e.key] = await stringTemplateFrom(
          e.parent[e.key],
          async (path) => {
            return (
              "\n" +
              `content of file ${path}:\n` +
              "```\n" +
              `${await this.downloadFileContent(path)}\n` +
              "```\n"
            );
          },
          /{{@(?<prop>.+)}}/g,
        ).render();
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
    const path = ManifestDocument.#pathsOfManifests.get(this);
    if (!path) throw new Error("Path not found");
    await fs.writeFile(path, this.toDocument().toString());
  }

  static #pathsOfManifests = new WeakMap<ManifestDocument, URL>();

  static async fromPath(path: { toString(): string }) {
    if (!URL.canParse(path.toString())) throw new Error("Invalid path");
    const pathUrl = new URL(path.toString());
    const manifest = new ManifestDocument(
      YAML.parseDocument(await fs.readFile(pathUrl, "utf-8")),
    );
    this.#pathsOfManifests.set(manifest, pathUrl);
    return manifest;
  }
}

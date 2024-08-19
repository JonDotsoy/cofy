import { URL } from "url";
import * as YAML from "yaml";
import { urlFromRelativePath } from "./common/workflow";
import { ManifestDocument } from "./chat-manifest/manifest-document";
import { chatWithManifest } from "./ollama/chat-with-manifest";
import { SchemaDocument } from "./schema-file/schema-document";
import * as flags from "@jondotsoy/flags";
import { pkg } from "../pkg";
import * as fs from "fs/promises";
import * as os from "os";
import { SourcePull } from "./source_pull/source_pull";

const VISUAL_EDITOR =
  process.env.Q_EDITOR ??
  process.env.GIT_EDITOR ??
  process.env.EDITOR ??
  "code";

function createProgressSpin() {
  const symbols = [".  ", ".. ", "..."];
  let count = 0;
  let paragraphSize = 0;
  let stopped = false;

  const layout: typeof String.raw = (...args) => {
    const txt = String.raw(...args);
    paragraphSize = Math.max(paragraphSize, txt.length);
    return txt.padEnd(paragraphSize, " ");
  };

  const ping = () => {
    process.stdout.write(
      `\r${layout`${symbols[count++ % symbols.length]} processing`}`,
    );
  };

  const interval = setInterval(() => ping(), 150);

  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearInterval(interval);
    process.stdout.write(`\r${layout``}\r`);
  };

  return { stop };
}

const schemaDocument = new SchemaDocument(
  new URL("../schema.json", import.meta.url),
);

type MainOptions = {
  prompt: string;
  fileRelativePath: string;
  model: string;
  schema: boolean;
  version: boolean;
  render: boolean;
  listModels: boolean;
  new: boolean;
  cwd: string;
};

const mainRules: flags.Rule<MainOptions>[] = [
  flags.rule(flags.flag("--model"), flags.isStringAt("model")),
  flags.rule(flags.flag("--version", "-v"), flags.isBooleanAt("version")),
  flags.rule(flags.flag("--list-models"), flags.isBooleanAt("listModels")),
  flags.rule(flags.flag("--schema"), flags.isBooleanAt("schema")),
  flags.rule(flags.flag("--render"), flags.isBooleanAt("render")),
  flags.rule(flags.flag("-n", "--new"), flags.isBooleanAt("new")),
  flags.rule(flags.flag("-c", "--cwd"), flags.isStringAt("cwd")),
  flags.rule((arg, ctx) => {
    if (ctx.flags.fileRelativePath) return false;
    ctx.argValue = arg;
    return true;
  }, flags.isStringAt("fileRelativePath")),
  flags.rule((arg, ctx) => {
    if (ctx.flags.prompt) return false;
    ctx.argValue = arg;
    return true;
  }, flags.isStringAt("prompt")),
];

const main = async (args: string[]) => {
  const options = flags.flags(args, {}, mainRules);

  const cwd = options.cwd ?? process.cwd();

  if (options.version) {
    console.log(`${pkg.version}`);
    return;
  }

  if (options.schema) {
    console.log(`Schema location ${schemaDocument.location()}`);
    await schemaDocument.save();
    return;
  }

  if (options.render) {
    const fileRelativePath = options.fileRelativePath;

    await schemaDocument.save();

    if (!fileRelativePath) throw new Error("No file path provided");

    const fileFullPath = urlFromRelativePath(fileRelativePath);

    const manifestDocument = await ManifestDocument.fromPath(fileFullPath);
    const manifest = await manifestDocument.getManifest();

    console.log(
      YAML.stringify(manifest, { defaultStringType: "BLOCK_FOLDED" }),
    );

    return;
  }

  if (options.fileRelativePath) {
    const progressSpin = createProgressSpin();

    const fileRelativePath = options.fileRelativePath;

    await schemaDocument.save();

    if (!fileRelativePath) throw new Error("No file path provided");

    const sourcePull = await SourcePull.from(fileRelativePath, cwd);
    const fileFullPath = new URL(await sourcePull.download());
    let tmpFileFullPath: null | URL = null;

    if (
      options.new ||
      sourcePull.url.startsWith("http:") ||
      sourcePull.url.startsWith("https:")
    ) {
      const tmpId = crypto.randomUUID();
      tmpFileFullPath = new URL(
        `${tmpId}.yaml`,
        new URL(`${os.tmpdir()}/`, "file:"),
      );
      await fs.copyFile(fileFullPath, tmpFileFullPath);
      try {
        await Bun.$`${VISUAL_EDITOR} ${tmpFileFullPath.pathname}`;
      } catch (ex) {
        console.info(`Open the temporal file ${tmpFileFullPath.pathname}`);
      }
    }

    const manifest = await ManifestDocument.fromPath(
      tmpFileFullPath ?? fileFullPath,
    );

    // DEPRECATED!
    // manifest.setSchemaIfNotExists(schemaDocument);

    if (options.prompt) {
      manifest.addMessage("user", options.prompt);
      await manifest.save();
      manifest.reload();
    }

    await chatWithManifest(manifest, {
      model: options.model,
      onStartWrite() {
        progressSpin.stop();
      },
    });

    return;
  }

  console.error("No file path provided");
  console.log(flags.makeHelpMessage("q", mainRules));
};

main(process.argv.slice(2));

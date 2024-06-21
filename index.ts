import { URL } from "url";
import * as YAML from "yaml";
import { urlByRelativePath } from "./src/common/workflow";
import { ManifestDocument } from "./src/chat-manifest/manifest-document";
import { chatWithManifest } from "./src/ollama/chat-with-manifest";
import { SchemaDocument } from "./src/schema-file/schema-document";
import * as flags from "@jondotsoy/flags";
import { pkg } from "./pkg";

function progresSpin() {
  const symbols = [".  ", ".. ", "..."];
  let count = 0;
  let stoped = false;

  const ping = () => {
    process.stdout.write(`\r${symbols[count++ % symbols.length]} processing`);
  };

  const interval = setInterval(() => ping(), 150);

  const stop = () => {
    if (stoped) return;
    stoped = true;
    clearInterval(interval);
    process.stdout.write(`\r`);
  };

  return { stop };
}

const schemaDocument = new SchemaDocument(
  new URL("./schema.json", import.meta.url),
);

type MainOptions = {
  fileRelativePath: string;
  model: string;
  schema: boolean;
  version: boolean;
  render: boolean;
  listModels: boolean;
};

const mainRules: flags.Rule<MainOptions>[] = [
  flags.rule(flags.flag("--model"), flags.isStringAt("model")),
  flags.rule(flags.flag("--version", "-v"), flags.isBooleanAt("version")),
  flags.rule(flags.flag("--list-models"), flags.isBooleanAt("listModels")),
  flags.rule(flags.flag("--schema"), flags.isBooleanAt("schema")),
  flags.rule(flags.flag("--render"), flags.isBooleanAt("render")),
  flags.rule((arg, ctx) => {
    const fileMatched =
      arg.endsWith(".yaml") ||
      arg.endsWith(".yml") ||
      arg.endsWith(".qmyaml") ||
      arg.endsWith(".qmyml");
    if (!fileMatched) return false;
    ctx.argValue = arg;
    return true;
  }, flags.isStringAt("fileRelativePath")),
];

const main = async (args: string[]) => {
  const options = flags.flags(args, {}, mainRules);

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

    const fileFullPath = urlByRelativePath(fileRelativePath);

    const manifestDocument = await ManifestDocument.fromPath(fileFullPath);
    const manifest = await manifestDocument.getManifest();

    console.log(
      YAML.stringify(manifest, { defaultStringType: "BLOCK_FOLDED" }),
    );

    return;
  }

  if (options.fileRelativePath) {
    const p = progresSpin();

    const fileRelativePath = options.fileRelativePath;

    await schemaDocument.save();

    if (!fileRelativePath) throw new Error("No file path provided");

    const fileFullPath = urlByRelativePath(fileRelativePath);

    const manifest = await ManifestDocument.fromPath(fileFullPath);

    manifest.setSchemaDocument(schemaDocument);

    await chatWithManifest(manifest, {
      model: options.model,
      onStartWrite() {
        p.stop();
      },
    });

    return;
  }

  console.error("No file path provided");
  console.log(flags.makeHelpMessage("q", mainRules));
};

main(process.argv.slice(2));

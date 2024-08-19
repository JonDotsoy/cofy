import { canDownload, download } from "../common/download";
import os from "os";
import * as fs from "fs/promises";

export class SourcePull {
  #url: string;

  /**
   * @param url format URL
   *
   * @example
   * new SourcePull("file://a/b/c")
   * new SourcePull("https://github.com/a/b/c.md")
   * new SourcePull("ftp://asdf") // wrong
   */
  constructor(url: string) {
    this.#url = url;
  }

  get url() {
    return this.#url;
  }

  async download(): Promise<string> {
    if (this.url.startsWith("file:")) {
      return this.url;
    }

    const cache = `${os.tmpdir()}/__q__/cache/`;
    await fs.mkdir(cache, { recursive: true });
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-1", new TextEncoder().encode(this.url)),
      ),
      (char) => char.toString(16).padStart(2, "0"),
    ).join("");
    const fileCache = new URL(`${hash}`, new URL(cache, "file://"));
    if (await fs.exists(fileCache)) {
      return fileCache.toString();
    }
    const txt = await download(this.url);
    await fs.writeFile(fileCache, txt);
    return fileCache.toString();
  }

  static *toAlternativePaths(name: string, cwd: string = process.cwd()) {
    yield new URL(name, new URL(`${cwd}/`, "file://")).toString();
    yield `https://raw.githubusercontent.com/JonDotsoy/cofy/HEAD/agents/${name}.agent`;
    const expr = /(?<username>[^\/]+)\/(?<repo>[^\/]+)\/(?<agentName>.+)/;
    if (expr.test(name)) {
      const { username, repo, agentName } = expr.exec(name)!.groups!;
      yield `https://raw.githubusercontent.com/${username}/${repo}/HEAD/agents/${agentName}.agent`;
      yield `https://raw.githubusercontent.com/${username}/${repo}/HEAD/${agentName}.agent`;
    }
  }

  /**
   * @param name may be a local path o remote path
   * @example
   * SourcePull.from("commit") // Try to pull the local ./commit, ./commit.md, https://github.com/JonDotsoy/q-project/agents/commit.agent or https://github.com/JonDotsoy/q-project/commit.agent
   * SourcePull.from("user/repo/commit") // Try to pull the local ./user/repo/commit, ./user/repo/commit.md, https://github.com/user/repo/agents/commit.agent or https://github.com/user/repo/commit.agent
   */
  static async from(name: string, cwd?: string): Promise<SourcePull> {
    for (const alternativePath of this.toAlternativePaths(name, cwd)) {
      if (await canDownload(alternativePath)) {
        return new SourcePull(alternativePath);
      }
    }

    throw new Error(`Cannot found ${name} source.`);
  }
}

import { canDownload } from "../common/download";

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

  static *toAlternativePaths(name: string, cwd: string = process.cwd()) {
    yield new URL(name, new URL(`${cwd}/`, "file://")).toString();
    yield `https://raw.githubusercontent.com/JonDotsoy/q-project/HEAD/agents/${name}.agent`;
    const expr = /(?<username>[^\/]+)\/(?<repo>[^\/]+)\/(?<agentName>[^\/]+)/;
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
  static async from(name: string): Promise<SourcePull> {
    for (const alternativePath of this.toAlternativePaths(name)) {
      if (await canDownload(alternativePath)) {
        return new SourcePull(alternativePath);
      }
    }

    throw new Error(`Cannot find ${name}`);
  }
}

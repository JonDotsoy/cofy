import { test, expect, beforeAll, afterAll } from "bun:test";
import { SourcePull } from "./source_pull.js";

const ORIGINAL_CWD = process.cwd();

beforeAll(() => {
  process.chdir(`${new URL("./", import.meta.url).pathname}`);
});

afterAll(() => {
  process.chdir(ORIGINAL_CWD);
});

// test("should return a SourcePull object with the correct URL when given a valid URL", async () => {
//   const url = "file://a/b/c";
//   const sourcePull = new SourcePull(url);
//   expect(sourcePull.url).toEqual(url);
// });

test("should throw an error when trying to create a SourcePull object from a wrong URL format", async () => {
  const url = "ftp://asdf";
  await expect(SourcePull.from(url)).rejects.toThrowError(Error);
});

test("should return the correct local path when using SourcePull.from('__sample__/commit')", async () => {
  const sourcePullPromise = SourcePull.from("__sample__/commit");
  await expect(sourcePullPromise).resolves.toBeInstanceOf(SourcePull);
});

test("should return the correct remote path with agents when using SourcePull.from('user/repo/commit')", async () => {
  const sourcePullPromise = await SourcePull.from("commit-messages");
  await expect(sourcePullPromise).toBeInstanceOf(SourcePull);
  await expect(sourcePullPromise.url).toEqual(
    "https://raw.githubusercontent.com/JonDotsoy/q-project/HEAD/agents/commit-messages.agent",
  );
});

test("should return the correct remote path without agents when using SourcePull.from('user/repo/commit.md')", async () => {
  const sourcePullPromise = await SourcePull.from(
    "JonDotsoy/q-project/commit-messages",
  );
  await expect(sourcePullPromise).toBeInstanceOf(SourcePull);
  await expect(sourcePullPromise.url).toEqual(
    "https://raw.githubusercontent.com/JonDotsoy/q-project/HEAD/agents/commit-messages.agent",
  );
});

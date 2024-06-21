import { test, expect } from "bun:test";
import { vpath } from "./vpath";
import { stringTemplateFrom } from "./stringTemplateFrom";

test("should found every string fields", () => {
  const obj = {
    foo: [
      {
        taz: "hello",
        bee: {
          lol: "wip",
          wap: "hop",
        },
      },
    ],
  };
  expect(Array.from(vpath({ obj }))).toEqual([
    {
      kind: "string",
      key: "taz",
      parent: {
        taz: "hello",
        bee: {
          lol: "wip",
          wap: "hop",
        },
      },
    },
    {
      kind: "string",
      key: "lol",
      parent: {
        lol: "wip",
        wap: "hop",
      },
    },
    {
      kind: "string",
      key: "wap",
      parent: {
        lol: "wip",
        wap: "hop",
      },
    },
  ]);
});

test("", async () => {
  async function stringReplaceAsync(
    payload: string,
    expr: RegExp,
    replacer: (substring: string, ...args: any[]) => Promise<string>,
  ) {
    let matched: null | RegExpMatchArray = null;
    let nextResult = "";
    let lastIndex = 0;

    while ((matched = expr.exec(payload))) {
      const [substring, ...args] = matched;
      nextResult += payload.substring(lastIndex, matched.index);
      lastIndex = matched.index! + substring.length;
      nextResult += await replacer(substring, ...args);
      if (!expr.global) break;
    }

    return nextResult;
  }

  console.log(
    await stringTemplateFrom("hola {{name}} :D", (k) => `{{${k}}}`).render(),
  );
});

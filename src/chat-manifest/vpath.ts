export type InputObject = {
  obj: any;
  key?: string;
  parent?: any;
};

export type Element = {
  kind: string;
  parent: any;
  key: any;
};

/**
 * Visit Path
 */
export function* vpath({ obj, key, parent }: InputObject): Generator<Element> {
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      yield* vpath({ obj: obj[key], key, parent: obj });
    }
  }
  if (typeof obj === "string") {
    yield { kind: "string", parent, key };
  }
}

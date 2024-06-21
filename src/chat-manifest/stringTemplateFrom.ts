export function stringTemplateFrom(
  templateString: string,
  sustitutionFn: (field: string) => string | Promise<string>,
  pattern?: RegExp,
): { raw: string[]; subtitutions: string[]; render: () => Promise<string> } {
  const expr = pattern ?? /{{(?<prop>\w+)}}/g;
  let matched: null | RegExpMatchArray = null;
  const raw: string[] = [];
  const subtitutions: string[] = [];
  let lastIndex = 0;

  while ((matched = expr.exec(templateString))) {
    const [substring, altProp, ...args] = matched;
    const keyFieldName = matched.groups?.prop ?? altProp;
    if (!keyFieldName) throw new Error("Missing key field name");
    raw.push(templateString.substring(lastIndex, matched.index));
    subtitutions.push(keyFieldName);
    lastIndex = matched.index! + substring.length;
    // nextResult += await replacer(substring, ...args);
    if (!expr.global) break;
  }

  raw.push(templateString.substring(lastIndex));

  const render = async () => {
    const values = new Map<string, string>();
    for (const keySubtitution of new Set(subtitutions)) {
      values.set(keySubtitution, await sustitutionFn(keySubtitution));
    }

    return String.raw({ raw }, ...subtitutions.map((k) => values.get(k) ?? ""));
  };

  return {
    raw,
    subtitutions,
    render,
  };
}

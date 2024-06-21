export function stringTemplateFrom(
  templateString: string,
  substitutionFn: (field: string) => string | Promise<string>,
  pattern?: RegExp,
): { raw: string[]; substitutions: string[]; render: () => Promise<string> } {
  const expr = pattern ?? /{{(?<prop>\w+)}}/g;
  let matched: null | RegExpMatchArray = null;
  const raw: string[] = [];
  const substitutions: string[] = [];
  let lastIndex = 0;

  while ((matched = expr.exec(templateString))) {
    const [substring, altProp, ...args] = matched;
    const keyFieldName = matched.groups?.prop ?? altProp;
    if (!keyFieldName) throw new Error("Missing key field name");
    raw.push(templateString.substring(lastIndex, matched.index));
    substitutions.push(keyFieldName);
    lastIndex = matched.index! + substring.length;
    // nextResult += await replacer(substring, ...args);
    if (!expr.global) break;
  }

  raw.push(templateString.substring(lastIndex));

  const render = async () => {
    const values = new Map<string, string>();
    for (const keySubstitution of new Set(substitutions)) {
      values.set(keySubstitution, await substitutionFn(keySubstitution));
    }

    return String.raw(
      { raw },
      ...substitutions.map((k) => values.get(k) ?? ""),
    );
  };

  return {
    raw,
    substitutions: substitutions,
    render,
  };
}

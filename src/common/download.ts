import * as fs from "fs/promises";

namespace http {
  export const get = async (source: string) => {
    const res = await fetch(source);
    return res.text();
  };

  export const headTest = async (source: string) => {
    const res = await fetch(source, { method: "HEAD" });
    return res.status >= 200 && res.status < 300;
  };
}

export const download = async (source: string) => {
  const src = new URL(source, new URL(`${process.cwd()}/`, "file://"));

  if (src.protocol === "http:" || src.protocol === "https:") {
    return await http.get(src.href);
  }

  if (src.protocol === "file:") {
    return await fs.readFile(src.pathname, "utf-8");
  }

  throw new Error(`Unsupported protocol: ${src.protocol}`);
};

export const canDownload = async (source: string) => {
  const src = new URL(source, new URL(`${process.cwd()}/`, "file://"));

  if (src.protocol === "http:" || src.protocol === "https:") {
    return await http.headTest(src.href);
  }

  if (src.protocol === "file:") {
    return await fs.exists(src.pathname);
  }

  throw new Error(`Unsupported protocol: ${src.protocol}`);
};

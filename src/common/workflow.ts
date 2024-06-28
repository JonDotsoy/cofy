import { URL } from "url";

export const getCwd = () => {
  return new URL(`file://${process.cwd()}/`);
};

export const urlFromRelativePath = (relativePath: string) => {
  return new URL(relativePath, getCwd());
};

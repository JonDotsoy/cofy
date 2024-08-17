install:
	bun install

preparepkg:
	cat package.json | jq -r '{version: .version} | @json | "export const pkg = " + . + " as const;"' > pkg.ts
	bunx prettier -w pkg.ts

build:
	bun build --compile src/bin.ts --outfile dist/q

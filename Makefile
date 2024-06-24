install:
	bun install

preparepkg:
	cat package.json | jq -r '"export const pkg = \({version:.version}) as const;"' > pkg.ts | bunx prettier -w pkg.ts

build:
	bun build --compile index.ts --outfile dist/q

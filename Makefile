preparepkg:
	cat package.json | jq -r '"export const pkg = \({version:.version}) as const;"' > pkg.ts | bunx prettier -w pkg.ts
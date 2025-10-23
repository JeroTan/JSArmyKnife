import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(
		...[
			// "ignore", // temp disable lint until files are ready to be refactored
		],
	),
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
			// "check-file/filename-naming-convention": [
			// 	"error",
			// 	{
			// 		"**/*.{ts,tsx}": "KEBAB_CASE",
			// 	},
			// 	{
			// 		// ignore middle extensions like babel.config.js or smoke.spec.ts
			// 		ignoreMiddleExtensions: true,
			// 	},
			// ],
			// "check-file/folder-naming-convention": [
			// 	"error",
			// 	{
			// 		// all folders within src (except __test__) should be kebab-case
			// 		"src/**/!(__test__)": "KEBAB_CASE",
			// 	},
			// ],
		},
	},
	{
		ignores: [
			// Default ignores of eslint-config-next:
			"out/**",
			"build/**",
		],
	},
];

export default eslintConfig;

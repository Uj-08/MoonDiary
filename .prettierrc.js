/**
 * @format
 * @type {import("prettier").Config}
 */
module.exports = {
	printWidth: 100, // Max line length
	useTabs: true, // Use tabs over spaces
	tabWidth: 2, // Optional: how wide a tab is (defaults to 2)
	semi: true, // End lines with semicolons
	singleQuote: false, // Use double quotes
	quoteProps: "consistent", // Add quotes to object keys only when needed
	bracketSpacing: true, // Add spaces between brackets in object literals
	bracketSameLine: false, // Put the `>` of JSX tags on a new line
	arrowParens: "always", // Always include parens in arrow functions
	trailingComma: "es5", // Add trailing commas where valid in ES5 (like objects, arrays)
	jsxSingleQuote: false, // Use double quotes in JSX
	proseWrap: "preserve", // Don’t wrap markdown text
	htmlWhitespaceSensitivity: "css", // Respect CSS display property in HTML formatting
	embeddedLanguageFormatting: "auto", // Format embedded code if Prettier can
	vueIndentScriptAndStyle: false, // Don’t indent inside `<script>` and `<style>` in Vue files
};

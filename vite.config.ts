import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc/plugin";
import { FontaineTransform } from "fontaine";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		FontaineTransform.vite({
			fallbacks: ["Arial"],
			resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
		}),
		tailwindcss(),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [rehypePrettyCode],
		}),
		react(),
		rsc({
			entries: {
				client: "app/entry.browser.tsx",
				rsc: "app/entry.rsc.tsx",
				ssr: "app/entry.ssr.tsx",
			},
		}),
		tsconfigPaths(),
	],
});

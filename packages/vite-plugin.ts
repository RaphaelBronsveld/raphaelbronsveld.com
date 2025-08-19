import { normalizePath, type Plugin } from "vite";

interface VitePluginOptions {
	maxSize?: number;
	includeNodeModules?: boolean;
}

const stripNulPrefix = (id: string) => id.replace(/^\0+/, "");
const isVirtualOrInternal = (id: string) => id.startsWith("virtual:");

const rootFilePattern = /\/root\.(t|j)sx$/;

export default function performance(options: VitePluginOptions = {}): Plugin {
	const { maxSize = 200 * 1024, includeNodeModules = false } = options;

	return {
		name: "vite-plugin-performance",
		apply: "serve",
		enforce: "post",

		transform(code, id, ctx) {
			if (ctx?.ssr) return code;
			if (!includeNodeModules && id.includes("node_modules")) return code;
			if (isVirtualOrInternal(stripNulPrefix(id))) return code;

			const size = Buffer.byteLength(code, "utf8");
			if (size > maxSize) {
				const prettySize = `${(size / 1024).toFixed(2)} KB`;
				console.warn(
					`[size-warning] ${id} is large: ${prettySize} (possible over-import)`,
				);
			}

			if (!rootFilePattern.test(normalizePath(id))) return;

			const devtoolsClient = `
				if (!window.__SIMPLE_RR_DEVTOOLS_MOUNTED__) {
				  window.__SIMPLE_RR_DEVTOOLS_MOUNTED__ = true;
				  import('/@vite/client').then(({ connect }) => {
					console.log('Simple React Router Devtools loaded');
					// you can add HMR or dev logging here
				  });
				}
			  `;

			return code + "\n" + devtoolsClient;
		},

		transformIndexHtml(html) {
			console.log(html);
		},
	};
}

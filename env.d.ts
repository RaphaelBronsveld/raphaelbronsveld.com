declare module "virtual:react-router/server-build" {
	import type { ServerBuild } from "react-router";
	export const routes: ServerBuild["routes"];
}

declare module "*.mdx" {
	let MDXComponent: (props: any) => JSX.Element;
	export const frontmatter: any;
	export default MDXComponent;
}

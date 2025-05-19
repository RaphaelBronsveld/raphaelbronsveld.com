import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
	// Home
	index("./routes/index.tsx"),

	// Blog
	route("blog", "./routes/blog/layout.tsx", [
		index("./routes/blog/index.tsx"),
		route("preloading-fonts", "./routes/blog/preloading-fonts.mdx"),
	]),

	// 404
	route("*", "./routes/404.tsx"),
];

export default routes;

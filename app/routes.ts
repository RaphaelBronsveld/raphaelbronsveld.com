import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
	index("./routes/index.tsx"),

	// route("work", "./routes/work.tsx"),
	// route("photography", "./routes/photography.tsx"),
	route("blog", "./routes/blog.tsx", [
		index("./routes/blog.index.tsx"),
		route("preloading-fonts", "./routes/blog.preloading-fonts.mdx"),
	]),
];

export default routes;

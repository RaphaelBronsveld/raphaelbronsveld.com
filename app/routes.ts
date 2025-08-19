import { index, type RouteConfig, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
	index("./routes/index.tsx"),

	route("blog", "./routes/blog/layout.tsx", [
		index("./routes/blog/index.tsx"),
		route(":slug", "./routes/blog/post.tsx"),
	]),

	route("sitemap.xml", "./routes/sitemap.xml.ts"),
	route("rss", "./routes/rss.xml.ts"),

	route("*", "./routes/404.tsx"),
];

export default routes;

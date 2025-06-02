import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
	// Home route. You might expect this comment to be ChatGPT generated, but is it?
	index("./routes/index.tsx"),

	route("og", "./routes/og.tsx"),

	// Blog
	route("blog", "./routes/blog/layout.tsx", [
		index("./routes/blog/index.tsx"),
		route(":slug", "./routes/blog/post.tsx"),
	]),

	// SEO
	route("sitemap.xml", "./routes/sitemap.xml.tsx"),

	// Dynamic catch-all route for 404 pages.
	route("*", "./routes/404.tsx"),
];

export default routes;

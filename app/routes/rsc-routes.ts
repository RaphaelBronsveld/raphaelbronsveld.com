import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

export function routes() {
	return [
		{
			id: "root",
			path: "",
			lazy: () => import("./root/route"),
			children: [
				{
					id: "home",
					index: true,
					lazy: () => import("./index"),
				},
				{
					id: "blog",
					path: "/blog",
					index: true,
					lazy: () => import("./blog/index"),
				},
				{
					id: "blog-post",
					path: "/blog/:slug",
					lazy: () => import("./blog/post"),
				},
			],
		},
	] satisfies RSCRouteConfig;
}

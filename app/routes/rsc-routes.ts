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
			],
		},
	] satisfies RSCRouteConfig;
}

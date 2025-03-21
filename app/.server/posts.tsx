export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	category: string;
	image: string;
};

export const getPosts = async (): Promise<BlogPost[]> => {
	const modules = import.meta.glob<{ frontmatter: BlogPost }>(
		"../routes/*.mdx",
		{ eager: true },
	);
	const build = await import("virtual:react-router/server-build");
	const posts = Object.entries(modules).map(([file, post]) => {
		const id = `${file.replace("../", "").replace(/\.mdx$/, "")}`;
		const slug =
			build.routes !== undefined && id in build.routes
				? build.routes[id].path
				: undefined;
		if (slug === undefined) throw new Error(`No route for ${id}`);

		return { ...post.frontmatter, slug };
	});

	return sortBy(posts, (post) => post.date, "desc");
};

function sortBy<T>(
	arr: T[],
	// biome-ignore lint/suspicious/noExplicitAny: <We can sort on any...thing>
	key: (item: T) => any,
	dir: "asc" | "desc" = "asc",
) {
	return arr.sort((a, b) => {
		const res = compare(key(a), key(b));
		return dir === "asc" ? res : -res;
	});
}

function compare<T>(a: T, b: T): number {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}

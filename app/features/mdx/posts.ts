import type { MetaDescriptor } from "react-router";

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	meta: MetaDescriptor[];
};

const modules = import.meta.glob<{ frontmatter: BlogPost }>(
	"../../routes/blog/posts/*.mdx",
	{
		eager: true,
	},
);

export const loadPost = (slug: string) => {
	const entry = Object.entries(modules).find(([path]) =>
		path.includes(`/${slug}.mdx`),
	);

	if (!entry) throw new Response("Not found", { status: 404 });

	return entry[1] as { default: React.ComponentType; frontmatter: BlogPost };
};

export const getPosts = (): BlogPost[] => {
	const posts = Object.entries(modules).map(([file, post]) => {
		const id = `${file.replace("../../routes/blog/posts/", "").replace(/\.mdx$/, "")}`;
		return { ...post.frontmatter, slug: id };
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

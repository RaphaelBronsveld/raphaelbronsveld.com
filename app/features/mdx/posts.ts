import type { MetaDescriptor } from "react-router";
import { sortBy } from "~/lib/utils";

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	tag: string;
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

export const getPosts = (limit?: number): BlogPost[] => {
	const posts = Object.entries(modules).map(([file, post]) => {
		const id = `${file.replace("../../routes/blog/posts/", "").replace(/\.mdx$/, "")}`;
		return { ...post.frontmatter, slug: id };
	});

	const sortedPosts = sortBy<BlogPost>(
		posts,
		(post) => {
			const [d, m, y] = post.date.split("-").map(Number);
			return new Date(y, m - 1, d).getTime();
		},
		"desc",
	);

	return limit ? sortedPosts.slice(0, limit) : sortedPosts;
};

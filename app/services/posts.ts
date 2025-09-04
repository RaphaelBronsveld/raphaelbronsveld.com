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

type BlogPostFilter = {
	tag?: string;
	title?: string;
	beforeDate?: string;
	afterDate?: string;
	excludeSlug?: string;
};

type SortOrder = "asc" | "desc";

const modules = import.meta.glob<{ frontmatter: BlogPost }>(
	"../routes/blog/posts/*.mdx",
	{
		eager: true,
	},
);

const postLookup = new Map(
	Object.entries(modules).map(([path, module]) => {
		const slug = path
			.replace("../routes/blog/posts/", "")
			.replace(/\.mdx$/, "");
		return [slug, module];
	}),
);

const posts = Array.from(postLookup.entries()).map(([slug, post]) => ({
	...post.frontmatter,
	slug,
}));

const dateToTimestamp = (dateStr: string): number => {
	const [d, m, y] = dateStr.split("-").map(Number);
	return new Date(y, m - 1, d).getTime();
};

export const loadPost = (slug: string) => {
	const post = postLookup.get(slug);

	if (!post) throw new Response("Not found", { status: 404 });

	const blogPost = {
		...post,
		frontmatter: { ...post.frontmatter, slug },
	};

	return blogPost as { default: React.ComponentType; frontmatter: BlogPost };
};

const matchesFilter = (post: BlogPost, filter: BlogPostFilter): boolean => {
	if (filter.tag && post.tag !== filter.tag) return false;
	if (filter.title && post.title !== filter.title) return false;
	if (filter.excludeSlug && post.slug === filter.excludeSlug) return false;

	const postTimestamp = dateToTimestamp(post.date);
	if (filter.beforeDate && postTimestamp >= dateToTimestamp(filter.beforeDate))
		return false;
	if (filter.afterDate && postTimestamp <= dateToTimestamp(filter.afterDate))
		return false;

	return true;
};

export const getPosts = (
	options: {
		limit?: number;
		filter?: BlogPostFilter;
		sortOrder?: SortOrder;
	} = {},
): BlogPost[] => {
	const { limit, filter = {}, sortOrder = "desc" } = options;

	const filteredPosts = posts.filter((post) => matchesFilter(post, filter));

	const sortedPosts = sortBy<BlogPost>(
		filteredPosts,
		(post) => dateToTimestamp(post.date),
		sortOrder,
	);

	return limit ? sortedPosts.slice(0, limit) : sortedPosts;
};

export const getRelatedPosts = (
	currentPost: BlogPost,
	limit = 5,
): BlogPost[] => {
	return getPosts({
		filter: { tag: currentPost.tag, excludeSlug: currentPost.slug },
		limit,
	});
};

export const getLatestPosts = (limit = 5): BlogPost[] => {
	return getPosts({ limit });
};

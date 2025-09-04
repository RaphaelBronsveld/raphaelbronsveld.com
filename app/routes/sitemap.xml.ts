import { getPosts } from "~/services/posts";

// TODO: pls proper typing here with something that can do sitemaps.

export const loader = async () => {
	const posts = getPosts();

	const routes = [
		{ slug: "" },
		{ slug: "/blog" },
		...posts.map((post) => ({
			...post,
			slug: `/blog/${post.slug}`,
		})),
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${routes
			.map(
				({ slug }) => `
		  <url>
			<loc>https://raphaelbronsveld.com${slug}</loc>
			<priority>1</priority>
		  </url>`,
			)
			.join("")}
		</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
};

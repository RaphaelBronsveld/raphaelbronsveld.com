import { Feed } from "feed";
import { getOgTitle, getPosts } from "~/features/mdx/posts";
import type { Route } from "./+types/rss.xml";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const host = new URL(request.url).origin;
	const posts = getPosts();

	const feed = new Feed({
		title: "Raphaël Bronsveld",
		description:
			"Raphaël's Blog containing posts covering React development, (web) performance, accessibility & deep-dives into specific web related topics!",
		link: host,
		id: host,
		copyright: "All rights reserved..?",
		language: "en-US",
		image: `${host}/og?title=${encodeURIComponent("Raphaël Bronsveld")}`,
	});

	for (const post of posts) {
		const [d, m, y] = post.date.split("-");
		const image = `${host}/og?title=${getOgTitle(post)}`;

		feed.addItem({
			author: [
				{
					name: "Raphaël Bronsveld",
				},
			],
			title: post.title,
			description: `${post.description.substring(0, 200)}`,
			link: `${host}/blog/${post.slug}?utm_source=rss&utm_medium=feed`,
			date: new Date(`${y}-${m}-${d}`),
			image: {
				url: image,
				type: "image/png",
				length: 51200,
			},
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "application/xml",
		},
	});
};

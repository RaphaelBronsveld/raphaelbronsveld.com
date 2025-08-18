import { getOgTitle, getPosts } from "~/features/mdx/posts";
import type { Route } from "./+types/rss.xml";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const host = new URL(request.url).origin;
	const posts = getPosts();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Raphaël Bronsveld</title>
    <description><![CDATA[Raphaël's Blog containing posts covering React development, (web) performance, accessibility & deep-dives into specific web related topics!]]></description>
    <link>${host}</link>
    <language>en-us</language>
    <ttl>40</ttl>
     <image>
	  <url>${host}/og?title=Raphaël%20Bronsveld</url>
	  <title>Raphaël Bronsveld</title>
	  <link>${host}</link>
	</image>
    <atom:link href="${host}/rss" rel="self" type="application/rss+xml" />
    ${posts
			.map((post) => {
				const [d, m, y] = post.date.split("-");
				const description = `${post.description.substring(0, 200)}`;
				const image = `${host}/og?title=${getOgTitle(post)}`;
				return `
    <item>
    	<author>diners.dell-9e@icloud.com (Raphaël Bronsveld)</author>
		<title><![CDATA[${post.title}]]></title>
		<description><![CDATA[${description}]]></description>
		<link>${host}/blog/${post.slug}</link>
		<guid>${host}/blog/${post.slug}</guid>
		<pubDate>${new Date(`${y}-${m}-${d}`).toUTCString()}</pubDate>
		<enclosure url="${image}" type="image/png" length="51200"/>
    </item>`;
			})
			.join("")}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
};

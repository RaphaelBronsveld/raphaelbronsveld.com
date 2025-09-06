import { MDXProvider } from "@mdx-js/react";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import type { BlogPosting, WithContext } from "schema-dts";
import { mdxComponents } from "~/components/MdxComponents";
import { PostCarousel } from "~/components/PostCarousel";
import { Tag } from "~/components/ui/Tag";
import { type BlogPost, getRelatedPosts, loadPost } from "~/services/posts";
import type { Route } from "./+types/post";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const { origin } = new URL(request.url);
	const { slug } = params;

	try {
		const { frontmatter } = loadPost(slug);

		const og = {
			url: `${origin}/blog/${slug}`,
			image: `${origin}/og/${slug}.png`,
		};

		return { slug, og, frontmatter };
	} catch (_error) {
		throw new Response("Not found", { status: 404 });
	}
};

export default function Post({ loaderData }: Route.ComponentProps) {
	const { slug, frontmatter, og } = loaderData;
	const Component = loadPost(slug);

	const relatedPosts = getRelatedPosts(Component.frontmatter);

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getStructuredData(frontmatter, og)),
				}}
			/>
			<article>
				<h1 className="mb-2">{frontmatter.title}</h1>
				<div className="flex gap-2 mb-6">
					<Tag>{frontmatter.tag}</Tag>
					<span className="flex items-center gap-1 text-xs">
						<CalendarIcon className="w-4" />
						<span>{frontmatter.date}</span>
					</span>
				</div>
				<MDXProvider components={mdxComponents}>
					<Component.default />
				</MDXProvider>
				{relatedPosts.length > 0 ? (
					<PostCarousel posts={relatedPosts} heading="You might also like." />
				) : (
					<Link to="/blog" className="group no-underline flex gap-2">
						<ArrowLeft className="group-hover:-translate-x-1 w-4 transition-transform" />
						Go back to blog
					</Link>
				)}
			</article>
		</>
	);
}

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	if (!data) return [];
	const { og, frontmatter } = data;

	const dynamicMeta = [
		{
			title: `${frontmatter.title} - Raphaël Bronsveld`,
		},
		{
			property: "og:description",
			content: frontmatter.description,
		},
		{
			property: "og:url",
			content: og.url,
		},
		{
			property: "og:image",
			content: og.image,
		},
	];

	return [...frontmatter.meta, ...dynamicMeta];
};

/**
 * Return strcutured data for the blog post.
 * https://developers.google.com/search/docs/appearance/structured-data/article
 */
function getStructuredData(post: BlogPost, og: { url: string; image: string }) {
	const [d, m, y] = post.date.split("-");
	const dateISO = new Date(`${y}-${m}-${d}`).toISOString();
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		datePublished: dateISO,
		description: post.description,
		image: og.image,
		mainEntityOfPage: og.url,
		author: [
			{
				"@type": "Person",
				name: "Raphaël Bronsveld",
				url: "https://raphaelbronsveld.com",
			},
		],
		keywords: "web performance, react, vue, frontend development",
		isPartOf: {
			"@type": "Blog",
			name: "Blog - Raphaël Bronsveld",
			url: "https://raphaelbronsveld.com/blog",
		},
	} satisfies WithContext<BlogPosting>;
}

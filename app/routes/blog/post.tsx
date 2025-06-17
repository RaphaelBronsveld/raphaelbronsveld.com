import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import type { BlogPosting, WithContext } from "schema-dts";
import type { BlogPost } from "~/.server/posts";
import type { Route } from "./+types/post";

// TODO: refactor into one file with blog overview.
const posts = import.meta.glob("./posts/*.mdx", { eager: true });
export function loadPost(slug: string) {
	const entry = Object.entries(posts).find(([path]) =>
		path.includes(`/${slug}.mdx`),
	);

	if (!entry) throw new Response("Not found", { status: 404 });

	// TODO: type
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return entry[1] as { default: React.ComponentType; frontmatter?: any };
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const { origin } = new URL(request.url);
	const { slug } = params;

	try {
		const { frontmatter } = loadPost(slug);

		const ogTitle = encodeURIComponent(
			frontmatter.meta?.find((m) => m.property === "og:title")?.content ??
				frontmatter.title,
		);

		const og = {
			url: `${origin}/blog/${slug}`,
			image: `${origin}/og?title=${ogTitle}`,
		};

		return { slug, og, frontmatter };
	} catch (error) {
		throw new Response("Not found", { status: 404 });
	}
};

export default function Post({ loaderData }: Route.ComponentProps) {
	const { slug, frontmatter, og } = loaderData;
	const Component = loadPost(slug);

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getStructuredData(frontmatter, og)),
				}}
			/>
			<article>
				<h1>{frontmatter.title}</h1>
				<span className="flex gap-2">
					<CalendarIcon className="w-4" />
					{frontmatter.date}
				</span>
				<div className="md">
					<Component.default />
				</div>
				<Link to="/blog" className="group no-underline flex gap-2">
					<ArrowLeft className="group-hover:-translate-x-1 w-4 transition-transform" />
					Go back to blog
				</Link>
			</article>
		</>
	);
}

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	const { og, frontmatter } = data;

	const dynamicOgs = [
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

	return [...frontmatter.meta, ...dynamicOgs];
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

import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Link } from "react-router";
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
		return { origin, slug, frontmatter };
	} catch (error) {
		throw new Response("Not found", { status: 404 });
	}
};

export default function Post({ loaderData }: Route.ComponentProps) {
	const { slug, frontmatter } = loaderData;
	const Component = loadPost(slug);

	return (
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
	);
}

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	const { origin, frontmatter, slug } = data;

	const ogTitle = encodeURIComponent(
		frontmatter.meta?.find((m) => m.property === "og:title")?.content ??
			frontmatter.title,
	);

	const dynamicOgs = [
		{
			property: "og:description",
			content: frontmatter.description,
		},
		{
			property: "og:url",
			content: `${origin}/blog/${slug}`,
		},
		{
			property: "og:image",
			content: `${origin}/og?title=${ogTitle}`,
		},
	];

	return [...frontmatter.meta, ...dynamicOgs];
};

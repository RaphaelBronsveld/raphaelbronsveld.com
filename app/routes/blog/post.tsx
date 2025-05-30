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

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { slug } = params;
	try {
		const { frontmatter } = loadPost(slug);
		return { frontmatter, slug };
	} catch (error) {
		throw new Response("Not found", { status: 404 });
	}
};

export default function Post({ loaderData }: Route.ComponentProps) {
	const { slug } = loaderData;
	const Component = loadPost(slug);

	return <Component.default />;
}

export const meta: Route.MetaFunction = ({ data }) => data.frontmatter.meta;

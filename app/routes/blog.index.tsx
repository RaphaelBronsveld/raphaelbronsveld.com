import { Link, type MetaFunction } from "react-router";
import type * as Route from "./+types.blog.index";

import { getPosts } from "~/.server/posts";

export const loader = async () => {
	return { posts: await getPosts() };
};

export const meta: MetaFunction = () => {
	return [
		{ title: "Blog - Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"Blog posts written by Raphaël Bronsveld. These posts will cover topics such as UX, web performance, CI/CD & DevOps.",
		},
	];
};

export default function Component({ loaderData }: Route.ComponentProps) {
	const { posts } = loaderData;
	return (
		<>
			<h1 className="text-3xl mb-6">Posts</h1>
			<ul className="space-y-2">
				{posts.map((post) => (
					<li key={post.slug}>
						<Link to={post.slug} className="underline" viewTransition>
							{post.frontmatter.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

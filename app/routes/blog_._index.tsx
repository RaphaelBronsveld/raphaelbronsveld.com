import { json } from "@remix-run/node";
import { Link, type MetaFunction, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/.server/posts";

export const loader = async () => json(await getPosts());

export const meta: MetaFunction = () => {
	return [
		{ title: "Blog | Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"Blog posts written by Raphaël Bronsveld. These posts will cover topics such as UX, web performance, CI/CD & DevOps.",
		},
	];
};

export default function Component() {
	const posts = useLoaderData<typeof loader>();
	return (
		<div className="p-8">
			<h1 className="text-3xl mb-4">Posts</h1>
			<ul className="space-y-2">
				{posts.map((post) => (
					<li key={post.slug}>
						<Link to={post.slug} className="underline">{post.frontmatter.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

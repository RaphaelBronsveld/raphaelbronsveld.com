import { CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import { type BlogPost, getPosts } from "~/.server/posts";
import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "./+types/index";

export const loader = async () => {
	return { posts: getPosts() };
};

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Blog - Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"Blog posts written by Raphaël Bronsveld. These posts will cover topics such as UX, web performance, CI/CD & DevOps.",
		},
	];
};

export default function Blog({ loaderData }: Route.ComponentProps) {
	const { posts } = loaderData;
	return (
		<>
			<h1 className="text-2xl mb-6">Blog</h1>

			<p className="mb-4">
				A collection of blog posts covering topics such as sysops/devops,
				performance, frontend frameworks and more.
			</p>
			<ul className="space-y-2">
				{posts.map((post) => (
					<BlogCard post={post} key={post.slug} />
				))}
			</ul>
		</>
	);
}

export function BlogCard({ post }: { post: BlogPost }) {
	return (
		<Card className="overflow-hidden">
			<Link className="no-underline" to={`/blog/${post.slug}`} viewTransition>
				<article>
					<CardContent className="p-4 md:p-6">
						<div className="flex flex-col gap-1 pb-4">
							<h2 className="text-lg font-bold m-0 line-clamp-2">
								{post.title}
							</h2>
							<div className="flex items-center gap-2">
								<div className="flex items-center text-xs text-muted-foreground">
									<CalendarIcon className="mr-1 h-3 w-3" />
									{post.date}
								</div>
							</div>
						</div>
						<p className="text-muted-foreground text-sm m-0 line-clamp-2">
							{post.description}
						</p>
					</CardContent>
				</article>
			</Link>
		</Card>
	);
}

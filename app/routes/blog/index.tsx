import { CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import { type BlogPost, getPosts } from "~/.server/posts";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "../+types/blog.index";

export const loader = async () => {
	return { posts: await getPosts() };
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
			<Link to={`/blog/${post.slug}`} viewTransition>
				<article className="md:flex">
					<div className="bg-gray-200 h-48 md:h-auto md:w-1/3 md:flex-none">
						<img
							className="w-full h-full object-cover"
							src={post.image.src}
							alt={post.image.alt}
						/>
					</div>
					<CardContent className="p-4 md:p-6 md:w-2/3">
						<div className="flex items-center gap-2 mb-2">
							<Badge variant="secondary" className="text-xs font-medium">
								{post.category}
							</Badge>
							<div className="flex items-center text-xs text-muted-foreground">
								<CalendarIcon className="mr-1 h-3 w-3" />
								{post.date}
							</div>
						</div>
						<h2 className="text-lg font-bold mb-2 line-clamp-2">
							{post.title}
						</h2>
						<p className="text-muted-foreground text-base line-clamp-2">
							{post.description}
						</p>
					</CardContent>
				</article>
			</Link>
		</Card>
	);
}

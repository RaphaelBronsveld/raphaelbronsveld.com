import { ArrowRight } from "lucide-react";
import { href, Link } from "react-router";
import { cn } from "~/lib/utils";
import { BlogCard } from "~/routes/blog";
import type { BlogPost } from "~/services/posts";

function PostCarousel({
	posts,
	heading,
	className,
}: {
	posts: BlogPost[];
	heading: string;
	limit?: number;
	className?: string;
}) {
	if (!posts.length) return null;

	return (
		<>
			<div className={cn("flex justify-between items-center", className)}>
				<h2 className="text-2xl text-accent">{heading}</h2>
				<Link
					to={href("/blog")}
					className="flex gap-1 group hover:text-underline"
					prefetch="viewport"
					viewTransition
				>
					View all posts
					<ArrowRight className="group-hover:translate-x-1 w-4 transition-transform" />
				</Link>
			</div>

			<div className="flex gap-2 snap-x snap-mandatory overflow-x-auto no-scrollbar">
				{posts.map((post) => (
					<BlogCard
						className="w-60 sm:w-80 flex-shrink-0 snap-start"
						post={post}
						key={post.slug}
					/>
				))}
			</div>
		</>
	);
}

export { PostCarousel };

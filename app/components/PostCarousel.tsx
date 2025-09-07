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
			<div className={cn("", className)}>
				<h2 className="text-2xl text-accent">{heading}</h2>
			</div>

			<div className="flex gap-2 snap-x snap-mandatory overflow-x-auto no-scrollbar">
				{posts.map((post) => (
					<BlogCard
						className={cn("flex-shrink-0 snap-start", {
							"w-full": posts.length === 1,
							"w-1/2": posts.length === 2,
							"w-60 sm:w-80": posts.length > 2,
						})}
						post={post}
						key={post.slug}
					/>
				))}
			</div>
		</>
	);
}

export { PostCarousel };

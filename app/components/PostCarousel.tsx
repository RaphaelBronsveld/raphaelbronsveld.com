import { ArrowRight } from "lucide-react";
import { href, Link } from "react-router";
import { getPosts } from "~/features/mdx/posts";
import { BlogCard } from "~/routes/blog";

function PostCarousel({
	heading,
	limit,
	className,
}: {
	heading: string;
	limit?: number;
	className?: string;
}) {
	const latestPosts = getPosts(limit);

	return (
		<div className={className}>
			<div className="flex justify-between items-center pb-4">
				<h2 className="text-2xl text-accent">{heading}</h2>
				<Link
					to={href("/blog")}
					className="flex gap-1 group hover:text-underline"
					viewTransition
				>
					View all posts
					<ArrowRight className="group-hover:translate-x-1 w-4 transition-transform" />
				</Link>
			</div>

			<div className="flex gap-2 snap-x snap-mandatory overflow-x-auto no-scrollbar">
				{latestPosts.map((post) => (
					<BlogCard
						className="w-60 sm:w-80 flex-shrink-0 snap-start"
						post={post}
						key={post.slug}
					/>
				))}
			</div>
		</div>
	);
}

export { PostCarousel };

import { PostCarousel } from "~/components/PostCarousel";
import { getLatestPosts } from "~/services/posts";

export default function Index() {
	const latestPosts = getLatestPosts();

	return (
		<div className="flex flex-col">
			<h2 className="text-2xl mb-4 text-accent">Welcome.</h2>
			<div className="space-y-3 text-balance">
				<p>
					I'm an all-around developer, performance nerd🤓, and I’m passionate
					about making the web faster, and better for everyone.
				</p>
				<p>
					I build and maintain web applications, focusing on integrating 3rd
					party services, improving user experience, and figuring out where to
					take things next.
				</p>
				<p>
					I like solving tricky & complicated problems while jumping straight
					into the source code. I'm always trying to learn more and finding ways
					to make a difference.
				</p>
				<p>
					When I'm not coding I still like to write about my experiences and
					figure it out together. I'll mostly write about web focused topics
					such as React development, performance, accessibility, deep-dives into
					specifics & more!
				</p>

				<PostCarousel
					posts={latestPosts}
					className="pb-2 pt-3"
					heading="Latest blog posts."
				/>
			</div>
		</div>
	);
}

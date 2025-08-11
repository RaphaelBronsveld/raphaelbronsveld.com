import { ArrowRight } from "lucide-react";
import { href, Link } from "react-router";

export default function Index() {
	return (
		<div className="flex flex-col">
			<h2 className="text-2xl mb-4">Welcome.</h2>
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
					I like solving tricky & complicated problems while jumping straight into the source code. I'm always tying to learn more and finding ways to make a difference. 
				</p>
				<p>When I'm not coding I still like to write about my experiences and figure it out together. I'll mostly write about web focused topics such as performance, accessibility, deep-dives into specifics & more!</p>
				<Link to={href("/blog")} className="flex gap-1 group" viewTransition>
					Check out my blog{" "}
					<ArrowRight className="group-hover:translate-x-1 w-4 transition-transform" />
				</Link>
			</div>
		</div>
	);
}

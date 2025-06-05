import { ArrowRight } from "lucide-react";
import { Link, href } from "react-router";

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
					In this development journey I love to tackle complicated problems and
					finding smarter ways to deliver value.
				</p>
				<p>And I like to write!</p>
				<Link to={href("/blog")} className="flex gap-1 group" viewTransition>
					Check out my blog{" "}
					<ArrowRight className="group-hover:translate-x-1 w-4 transition-transform" />
				</Link>
			</div>
		</div>
	);
}

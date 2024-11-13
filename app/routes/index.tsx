import { Link } from "react-router";

export default function Index() {
	return (
		<div className="flex flex-col p-8">
			<h1 className="text-3xl mb-6">Raphaël Bronsveld</h1>
			<h2 className="text-2xl mb-4">Welcome.</h2>
			<div className="space-y-3 text-balance">
				<p>
					I'm an all-around developer, a performance nerd, and I’m passionate
					about making the web faster, and better for everyone.
				</p>
				<p>
					I create webshops for a living at{" "}
					<Link
						to="https://www.touchwonders.com/"
						target="_blank"
						className="text-pink-500"
					>
						Touchwonders
					</Link>
					, where I focus on working on integrating 3rd party services,
					enhancing user experience, and figuring out where to take things next.
				</p>
			</div>
		</div>
	);
}

import { Link } from "@remix-run/react";

export default function Index() {
	return (
		<div className="flex flex-col p-8">
			<h1 className="text-2xl mb-6">Raphaël Bronsveld</h1>
			<div className="space-y-3">
				<p>
					I'm an all-around developer, a performance nerd, and I’m passionate
					about making the web faster, and better for everyone.
				</p>
				<p>
					I create webshops for a living at <Link to="https://www.touchwonders.com/" target="_blank" className="text-pink-500">Touchwonders</Link>, where I focus on working on integrating 3rd party services, enhancing user experience, and defining the technical roadmap for future success.
				</p>
			</div>
		</div>
	);
}

import { Link } from "react-router";

export default function Footer() {
	const socialMediaLinks = [
		{
			label: "Github",
			component: Github,
			href: "https://github.com/RaphaelBronsveld",
		},
		{
			label: "BlueSky",
			component: BlueSky,
			href: "https://bsky.app/profile/raphaelbronsveld.com",
		},
		{
			label: "LinkedIn",
			component: LinkedIn,
			href: "https://www.linkedin.com/in/raphaelbronsveld/",
		},
	];
	return (
		<footer className="p-8">
			<ul className="flex justify-center gap-2">
				{socialMediaLinks.map((link, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: It's just a footer.
					<Link to={link.href} key={index} rel="me" className="p-4">
						<span className="sr-only">{link.label}</span>
						<link.component />
					</Link>
				))}
			</ul>
		</footer>
	);
}

const BlueSky = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Bluesky icon</title>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M6.335 5.144c-1.654 -1.199 -4.335 -2.127 -4.335 .826c0 .59 .35 4.953 .556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045 .665 -4.889 3.208 -2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134 -2.769 3.5 -3.5c.333 -.667 .5 -1.167 .5 -1.5c0 .333 .167 .833 .5 1.5c.366 .731 1.5 3.5 3.5 3.5c.754 0 1.637 -.571 2.667 -1.59c2.222 -2.203 1.378 -4.746 -2.667 -5.41c2.314 .38 4.73 .094 5.444 -2.369c.206 -.708 .556 -5.072 .556 -5.661c0 -2.953 -2.68 -2.025 -4.335 -.826c-2.293 1.662 -4.76 5.048 -5.665 6.856c-.905 -1.808 -3.372 -5.194 -5.665 -6.856z" />
		</svg>
	);
};

const Github = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Github icon</title>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
		</svg>
	);
};

const LinkedIn = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Linkedin Icon</title>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M8 11v5" />
			<path d="M8 8v.01" />
			<path d="M12 16v-5" />
			<path d="M16 16v-3a2 2 0 1 0 -4 0" />
			<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
		</svg>
	);
};

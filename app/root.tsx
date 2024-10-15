import {
	Links,
	Meta,
	type MetaFunction,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import "./styles/main.css";

import type { LinksFunction } from "react-router";

export const links: LinksFunction = () => {
	return [
		{
			rel: "preload",
			href: "/fonts/lexend.woff2",
			as: "font",
			crossOrigin: "anonymous",
		},
	];
};

export const meta: MetaFunction = () => {
	return [
		{ title: "Home | Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"The online home location of Raphaël Bronsveld. You'll be able to find blog posts here as well.",
		},
	];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-neutral-50 text-stone-800 dark:bg-stone-900 dark:text-neutral-50">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<>
			<header>
				<nav className="max-w-3xl mx-auto">
					<ol className="flex flex-wrap p-8 pb-4 gap-4">
						<li>
							<NavLink to="/" viewTransition>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/work" viewTransition>
								Work
							</NavLink>
						</li>
						<li>
							<NavLink to="/blog" viewTransition>
								Blog
							</NavLink>
						</li>
						<li>
							<NavLink to="/photography" viewTransition>
								Photography
							</NavLink>
						</li>
					</ol>
				</nav>
			</header>
			<main className="max-w-3xl mx-auto">
				<Outlet />
			</main>
		</>
	);
}

export function ErrorBoundary() {
	return <h1 className="text-4xl">Error</h1>;
}

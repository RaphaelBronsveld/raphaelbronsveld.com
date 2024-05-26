import {
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";

import "./styles/main.css";

import type { LinksFunction } from "@remix-run/node";

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

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-neutral-50 dark:bg-stone-900">
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
				<nav>
					<ol className="flex flex-wrap p-4 gap-4 text-stone-900 dark:text-neutral-50">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/work">Work</NavLink>
						</li>
						<li>
							<NavLink to="/blog">Blog</NavLink>
						</li>
						<li>
							<NavLink to="/photography">Photography</NavLink>
						</li>
					</ol>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}

export function ErrorBoundary() {
	return <h1 className="dark:text-neutral-50 text-4xl">Error</h1>;
}

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import "./styles/main.css";

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
	return [
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
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
		<main>
			<Outlet />
		</main>
	);
}

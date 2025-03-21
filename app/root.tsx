import {
	Link,
	Links,
	Meta,
	type MetaFunction,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteLoaderData,
} from "react-router";

import "./styles/main.css";

import type { LinksFunction } from "react-router";
import Footer from "~/components/Footer";
import { StarCanvas } from "~/components/SpaceComponents";
import { LoaderArgs } from "../.react-router/types/app/+types/root";
import type { Route } from ".react-router/types/app/+types/root";

export const links: LinksFunction = () => {
	return [
		{
			rel: "preload",
			href: "/fonts/lexend.woff2",
			as: "font",
			crossOrigin: "anonymous",
		},
		{
			rel: "icon",
			href: "/favicon.png",
			// https://www.vecteezy.com/free-vector/typography
		},
	];
};

export const meta: MetaFunction = () => {
	return [
		{ title: "Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"The online home location of Raphaël Bronsveld. You'll be able to find blog posts here as well.",
		},
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	return { homepage: url.pathname === "/" };
};

export default function App({ loaderData }: Route.ComponentProps) {
	const { homepage } = loaderData;
	return (
		<Document>
			<StarCanvas />
			<header className="max-w-3xl mx-auto p-8">
				<nav>
					<Link to="/" viewTransition>
						{homepage ? (
							<h1 className="text-3xl">Raphaël Bronsveld</h1>
						) : (
							<span className="text-3xl">Raphaël Bronsveld</span>
						)}
					</Link>
				</nav>
			</header>
			<main className="max-w-3xl mx-auto px-8">
				<Outlet />
			</main>
			<Footer />
		</Document>
	);
}

function Document({ children }: { children: React.ReactNode }) {
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
				<script
					defer
					src="https://static.cloudflareinsights.com/beacon.min.js"
					data-cf-beacon='{"token": "2fdb336921764149bbffda02fdc8af72"}'
				/>
			</body>
		</html>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<Document>
			<main className="p-4 max-w-3xl mx-auto">
				<h1 className="text-3xl mb-2">{message}</h1>
				<p>{details}</p>
				{stack && (
					<pre className="w-full overflow-x-auto">
						<code>{stack}</code>
					</pre>
				)}
			</main>
		</Document>
	);
}

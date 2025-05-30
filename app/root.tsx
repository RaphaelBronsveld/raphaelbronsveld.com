import {
	Link,
	Links,
	Meta,
	type MetaFunction,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import "./styles/main.css";

import type { LinksFunction } from "react-router";
import Footer from "~/components/Footer";
import { StarCanvas } from "~/components/SpaceComponents";
import type { Route } from "./+types/root";

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
			href: "/favicon-me.png",
			sizes: "128x128",
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
	const pathname = new URL(request.url).pathname;
	return { pathname };
};

export default function App({ loaderData }: Route.ComponentProps) {
	const { pathname } = loaderData;
	return (
		<Document loaderData={loaderData}>
			<StarCanvas />
			<header className="max-w-3xl mx-auto p-8">
				<nav>
					<Link to="/" viewTransition>
						{pathname === "/" ? (
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

function Document({
	loaderData,
	children,
}: {
	loaderData?: Route.ComponentProps["loaderData"];
	children: React.ReactNode;
}) {
	// A very simple, somewhat hardcoded, self-referencing canonical URL.
	const canonical = loaderData?.pathname
		? `https://www.raphaelbronsveld.com${loaderData.pathname}`.replace(
				/\/$/,
				"",
			)
		: undefined;
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				{canonical && <link rel="canonical" href={canonical} />}
				<Links />
			</head>
			<body className="bg-neutral-50 text-stone-800 dark:bg-stone-900 dark:text-zinc-50">
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

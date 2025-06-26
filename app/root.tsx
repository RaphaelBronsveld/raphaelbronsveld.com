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

import type { HeadersFunction, LinksFunction } from "react-router";
import Footer from "~/components/Footer";
import { GoogleAnalytics } from "~/components/GoogleAnalytics";
import { StarCanvas } from "~/components/SpaceComponents";
import type { Route } from "./+types/root";
import { Header } from "./components/Header";
import { CACHE_CONTROL } from "./lib/http.server";

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
			href: "/favicon-me-v1.png",
			type: "image/png",
			sizes: "96x96",
		},
		{
			rel: "icon",
			href: "/favicon-me-v1-48x.png",
			type: "image/png",
			sizes: "48x48",
		},
	];
};

export const meta: MetaFunction = () => {
	return [
		{ title: "Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"I'm Raphaël Bronsveld, a frontend developer and web performance enthusiast passionate about building faster and better websites for everyone.",
		},
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const pathname = new URL(request.url).pathname;
	return { pathname, trackingId: process.env.GA_TRACKING_ID };
};

export default function App({ loaderData }: Route.ComponentProps) {
	const { pathname } = loaderData;
	return (
		<Document loaderData={loaderData}>
			<StarCanvas />
			<Header>
				{pathname === "/" ? (
					<h1>Raphaël Bronsveld</h1>
				) : (
					<span>Raphaël Bronsveld</span>
				)}
			</Header>
			<main className="max-w-3xl mx-auto px-6">
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
		? `https://raphaelbronsveld.com${loaderData.pathname}`.replace(/\/$/, "")
		: undefined;

	const trackingId = loaderData?.trackingId;
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
				{trackingId && <GoogleAnalytics trackingId={trackingId} />}
			</body>
		</html>
	);
}

export const headers: HeadersFunction = () => {
	return {
		"Cache-Control": CACHE_CONTROL.DEFAULT,
	};
};

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

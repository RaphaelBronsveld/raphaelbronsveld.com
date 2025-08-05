import { Outlet } from "react-router";
import "../../styles/main.css";
import Footer from "~/components/Footer";
import { GoogleAnalytics } from "~/components/GoogleAnalytics";
import { Header } from "~/components/Header";
import { StarCanvas } from "~/components/SpaceComponents";
import type { Route } from "../../+types/root"; // FIXME: wrong import.

export const loader = async ({ request }: Route.LoaderArgs) => {
	const pathname = new URL(request.url).pathname;
	return { pathname, trackingId: process.env.GA_TRACKING_ID };
};

export function Document({
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
				<title>Raphaël Bronsveld</title>
				<meta
					name="description"
					content="I'm Raphaël Bronsveld, a frontend developer and web performance enthusiast passionate about building faster and better websites for everyone."
				/>
				<link rel="canonical" href={canonical} />
			</head>
			<body className="bg-neutral-50 text-stone-800 dark:bg-stone-900 dark:text-zinc-50">
				{children}
				{trackingId && <GoogleAnalytics trackingId={trackingId} />}
			</body>
		</html>
	);
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { pathname } = loaderData;
	return (
		<Document loaderData={loaderData}>
			<StarCanvas />
			<Header>
				{pathname === "/" ? (
					<h1>Raphaël Bronsveld</h1>
				) : (
					<span className="font-lexend">Raphaël Bronsveld</span>
				)}
			</Header>
			<main className="max-w-3xl mx-auto px-6">
				<Outlet />
			</main>
			<Footer />
		</Document>
	);
}

export { ErrorBoundary } from "./error-boundary";

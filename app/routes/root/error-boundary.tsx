"use client";
import { isRouteErrorResponse } from "react-router";
import { Document } from "~/routes/root/route";
import type { Route } from "../../+types/root"; // FIXME: import

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	// FIXME:
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

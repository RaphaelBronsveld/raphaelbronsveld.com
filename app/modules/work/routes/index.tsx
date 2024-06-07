import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Work | Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"The work I (Raphaël Bronsveld) have been doing for the last years!",
		},
	];
};

export default function Work() {
	return (
		<div className="w-screen h-screen flex lg:justify-center p-4">
			<h1 className="dark:text-neutral-50 text-2xl">Work</h1>
		</div>
	);
}

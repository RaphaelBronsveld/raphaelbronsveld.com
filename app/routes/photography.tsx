import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Photography | Raphaël Bronsveld" },
		{
			name: "description",
			content: "Photo's made by Raphaël Bronsveld.",
		},
	];
};

export default function Photography() {
	return (
		<div className="w-screen h-screen flex lg:justify-center p-4">
			<h1 className="text-2xl">Photography</h1>
		</div>
	);
}

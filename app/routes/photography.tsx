import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
	return [
		{ title: "Photography - Raphaël Bronsveld" },
		{
			name: "description",
			content: "Photo's made by Raphaël Bronsveld.",
		},
	];
};

export default function Photography() {
	return <h1 className="text-2xl">Photography</h1>;
}

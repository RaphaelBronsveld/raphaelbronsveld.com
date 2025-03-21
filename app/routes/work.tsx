import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
	return [
		{ title: "Work - Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"The work I (Raphaël Bronsveld) have been doing for the last years!",
		},
	];
};

export default function Work() {
	return <h1 className="text-2xl">Work</h1>;
}

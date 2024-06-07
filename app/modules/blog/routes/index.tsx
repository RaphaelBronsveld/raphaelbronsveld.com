import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Blog | Raphaël Bronsveld" },
		{
			name: "description",
			content:
				"Blog posts written by Raphaël Bronsveld. These posts will cover topics such as UX, web performance, CI/CD & DevOps.",
		},
	];
};

export default function Blog() {
	return (
		<div className="w-screen h-screen flex lg:justify-center p-4">
			<h1 className="dark:text-neutral-50 text-2xl">Blog</h1>
		</div>
	);
}

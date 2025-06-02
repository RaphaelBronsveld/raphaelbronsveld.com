import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import type { Route } from "./+types/og";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const font = await readFile("./../../public/fonts/lexend.ttf");
	const url = new URL(request.url);
	const title = url.searchParams.get("title");

	if (!title) {
		throw new Response("Title parameter is required", {
			status: 400,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}

	const svg = await satori(
		<div
			style={{
				backgroundColor: "#1c1917",
				color: "#fafafa",
				display: "flex",
				flexDirection: "column",
				padding: 50,
				width: "100%",
				height: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					fontSize: 40,
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					paddingBottom: 20,
				}}
			>
				<span
					style={{
						fontSize: 60,
					}}
				>
					Raphaël Bronsveld
				</span>
				<span
					style={{
						fontSize: 35,
						alignItems: "center",
					}}
				>
					<img
						alt="Raphael Bronsveld"
						src="https://github.com/raphaelbronsveld.png"
						style={{
							height: 80,
							width: 80,
							borderRadius: "50%",
							marginLeft: 20,
						}}
					/>
				</span>
			</div>
			<div
				style={{
					fontSize: 90,
					alignItems: "center",
					flex: 1,
				}}
			>
				{title}
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Lexend",
					data: font,
					weight: 400,
					style: "normal",
				},
			],
		},
	);

	const png = new Resvg(svg, {
		fitTo: { mode: "width", value: 1200 },
	});

	const image = png.render().asPng();

	return new Response(image, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};

import { useCallback, useEffect, useRef, useState } from "react";

export function Crescent() {
	return (
		<>
			<div className="hidden dark:block moon relative mt-auto w-screen pt-8 h-32 overflow-hidden">
				<div className="bg-stone-900 absolute transform-[translateX(-50%)] left-[50%] h-[1500px] w-[1500px] rounded-full animate-glow" />
			</div>
		</>
	);
}

export function StarCanvas({ starsCount = 100 }: { starsCount?: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stars: {
		x: number;
		y: number;
		radius: number;
		opacity: number;
		color: string;
	}[] = [];

	const starVelocity = {
		x: 0.08,
		y: 0.1,
	};

	const [darkmode, setDarkmode] = useState(false);

	useEffect(() => {
		setDarkmode(window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, []);

	const initStars = (canvas: HTMLCanvasElement) => {
		stars.length = 0;
		for (let i = 0; i < starsCount; i++) {
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				radius: Math.random(),
				opacity: Math.random() * 0.5 + 0.5,
				color: darkmode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0)",
			});
		}
	};

	const drawStars = useCallback(
		(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (const star of stars) {
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
				ctx.fillStyle = `${star.color} ${star.opacity})`;
				ctx.fill();

				// Update star position
				star.x += starVelocity.x;
				star.y += starVelocity.y;

				// Wrap around the canvas
				if (star.x < 0) star.x = canvas.width;
				if (star.x > canvas.width) star.x = 0;
				if (star.y < 0) star.y = canvas.height;
				if (star.y > canvas.height) star.y = 0;
			}
		},
		[],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = canvas.parentElement?.offsetHeight
			? canvas.parentElement?.offsetHeight
			: canvas.height;
		canvas.classList.add("opacity-100");

		initStars(canvas);

		const animate = () => {
			drawStars(ctx, canvas);
			requestAnimationFrame(animate);
		};

		animate();

		const redraw = () => {
			if (canvas.width === window.innerWidth) return;
			canvas.width = window.innerWidth;
			canvas.height = canvas.parentElement?.offsetHeight
				? canvas.parentElement?.offsetHeight
				: canvas.height;
			initStars(canvas);
			drawStars(ctx, canvas);
		};
		window.addEventListener("resize", redraw);

		return () => {
			window.removeEventListener("resize", redraw);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute -z-10 opacity-0 transition-opacity duration-500"
		/>
	);
}

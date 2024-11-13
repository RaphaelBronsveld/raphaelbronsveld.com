import { useEffect, useRef } from "react";

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

	const initStars = (canvas: HTMLCanvasElement) => {
		stars.length = 0;
		for (let i = 0; i < starsCount; i++) {
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				radius: Math.random(),
				opacity: Math.random() * 0.5 + 0.5,
				color: "rgba(255, 255, 255, 1)",
			});
		}
	};

	const drawStars = (
		ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
	) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (const star of stars) {
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
			ctx.fillStyle = `${star.color} ${star.opacity})`;
			ctx.fill();
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;

		initStars(canvas);
		drawStars(ctx, canvas);

		const redraw = () => {
			if (canvas.width === window.innerWidth) return;
			canvas.width = window.innerWidth;
			initStars(canvas);
			drawStars(ctx, canvas);
		};
		window.addEventListener("resize", redraw);

		return () => {
			window.removeEventListener("resize", redraw);
		};
	}, [drawStars, initStars]);

	return (
		<canvas
			ref={canvasRef}
			className="hidden top-0 dark:block absolute left-0 -z-10"
		/>
	);
}

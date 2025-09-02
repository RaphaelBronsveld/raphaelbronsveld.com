import { Link } from "react-router";

interface HeaderProps extends React.PropsWithChildren {}

export function Header({ children }: HeaderProps) {
	return (
		<header className="max-w-3xl mx-auto p-6">
			<nav>
				<Link
					to="/"
					viewTransition
					className="group flex items-center justify-between"
					prefetch="render"
				>
					{children}
					<img
						src="/favicon-me-v1.png"
						className="w-8 h-8 group-hover:scale-110 transition-transform"
						alt="Raphaël Bronsveld portrait"
						fetchPriority="high"
					/>
				</Link>
			</nav>
		</header>
	);
}

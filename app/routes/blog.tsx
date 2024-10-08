import { Outlet } from "react-router";

export default function Blog() {
	return (
		<div className="p-8">
			<Outlet />
		</div>
	);
}

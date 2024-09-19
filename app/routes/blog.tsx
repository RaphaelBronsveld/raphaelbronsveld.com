import { Outlet } from "@remix-run/react";

export default function Blog() {
	return (
		<div className="p-4">
			<Outlet />
		</div>
	);
}

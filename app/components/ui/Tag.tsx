import type * as React from "react";
import { cn } from "~/lib/utils";

function Tag({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"bg-accent rounded-full px-3 py-1 uppercase font-semibold text-xs tracking-wide",
				className,
			)}
			{...props}
		/>
	);
}

export { Tag };

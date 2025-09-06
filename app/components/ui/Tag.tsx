import type * as React from "react";
import { cn } from "~/lib/utils";

type TagVariants = "small" | "regular";

type TagProps = {
	variant?: TagVariants;
} & React.ComponentProps<"div">;

function Tag({ className, variant = "regular", ...props }: TagProps) {
	return (
		<div
			className={cn(
				"bg-accent rounded-full px-3 py-1 uppercase font-semibold text-xs tracking-wide",
				{
					"text-[10px] px-2": variant === "small",
				},
				className,
			)}
			{...props}
		/>
	);
}

export { Tag };

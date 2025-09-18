import React, { useState } from "react";
import { cn } from "~/lib/utils";

function extractCodeFromPre(node: React.ReactNode): string {
	if (typeof node === "string") return node;
	if (Array.isArray(node)) return node.map(extractCodeFromPre).join("");
	if (React.isValidElement(node)) {
		// @ts-expect-error
		return extractCodeFromPre(node.props.children);
	}
	return "";
}

type PreProps = React.ComponentProps<"pre"> & {
	"data-language"?: string;
};

export const mdxComponents = {
	pre: ({ ...props }: PreProps) => {
		const [copied, setCopied] = useState(false);
		const rawCode = extractCodeFromPre(props.children);
		const noCopy = props["data-language"] === "text";

		const handleCopy = async () => {
			try {
				await navigator.clipboard.writeText(rawCode);
				setCopied(true);
				setTimeout(() => setCopied(false), 1500);
			} catch (err) {
				console.error("Failed to copy code:", err);
			}
		};

		return (
			<div className="relative group">
				<pre
					{...props}
					className="rounded-xl overflow-x-auto p-4 bg-zinc-900 text-zinc-100"
				>
					{props.children}
				</pre>
				<button
					type="button"
					onClick={handleCopy}
					className={cn(
						"absolute top-2 right-2 rounded-md px-3 py-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-white md:opacity-0 group-hover:opacity-100 transition",
						{
							hidden: noCopy,
						},
					)}
				>
					{copied ? "Copied!" : "Copy"}
				</button>
			</div>
		);
	},
};

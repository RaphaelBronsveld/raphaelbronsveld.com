import { describe, expect, it } from "vitest";
import { sortBy } from "./utils";

describe("sortBy", () => {
	const data = [
		{ id: 3, name: "Charlie" },
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	];

	it("should sort array in ascending order by id", () => {
		const sorted = sortBy(data, (item) => item.id, "asc");
		expect(sorted.map((item) => item.id)).toEqual([1, 2, 3]);
	});

	it("should sort array in descending order by id", () => {
		const sorted = sortBy(data, (item) => item.id, "desc");
		expect(sorted.map((item) => item.id)).toEqual([3, 2, 1]);
	});
});

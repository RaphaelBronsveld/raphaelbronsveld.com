// TODO: Something with fetching routes instead of hardcoding them here.
const routes = [
	{ loc: "", priority: 1.0 },
	{ loc: "/blog", priority: 1 },
	{ loc: "/blog/preloading-fonts", priority: 1 },
];

export const loader = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
			.map(
				({ loc, priority }) => `
      <url>
        <loc>https://raphaelbronsveld.com${loc}</loc>
        <priority>${priority}</priority>
      </url>`,
			)
			.join("")}
  </urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
};

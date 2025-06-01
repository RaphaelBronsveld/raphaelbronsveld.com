export function GoogleAnalytics({ trackingId }: { trackingId: string }) {
	return (
		<>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
			/>
			<script
				type="text/javascript"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${trackingId}', {
                  page_path: window.location.pathname,
                });
              `,
				}}
			/>
		</>
	);
}

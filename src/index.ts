import { R2Explorer } from "r2-explorer";

export default R2Explorer({
	// This operational surface must remain read-only in every environment.
	readonly: true,
	cors: false,

	// Authentication is enforced by a Cloudflare Access self-hosted application
	// attached to the Worker. workers.dev and preview URLs are disabled in
	// wrangler.json so a deployment cannot bypass that Access route.
});

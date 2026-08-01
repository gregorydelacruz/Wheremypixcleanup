import { auth, defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import getMyUsageTool from "./tools/get-my-usage";

// Auth0 is the OAuth authorization server for this app. mcp-js verifies bearer
// tokens against Auth0's JWKS via the OIDC discovery document at the issuer.
// Values are inlined at build time by Vite from VITE_* env vars, keeping this
// module import-safe (no runtime env reads at top level).
const auth0Domain =
  import.meta.env.VITE_AUTH0_DOMAIN ?? "auth0-domain-unset";
const auth0Audience =
  import.meta.env.VITE_AUTH0_AUDIENCE ?? import.meta.env.VITE_AUTH0_CLIENT_ID ?? "auth0-audience-unset";

export default defineMcp({
  name: "photo-organizer-mcp",
  title: "Photo Organizer MCP",
  version: "0.1.0",
  instructions:
    "Tools for this photo organizer app. Use `echo` to verify connectivity and `get_my_usage` to read the signed-in user's plan and monthly image-analysis usage.",
  auth: auth.oauth.issuer({
    issuer: `https://${auth0Domain}/`,
    acceptedAudiences: auth0Audience,
  }),
  tools: [echoTool, getMyUsageTool],
});

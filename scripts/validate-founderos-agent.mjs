import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("founderos-agent.json", "utf8"));

if (manifest.schema !== "founderos.agent-manifest/v1") throw new Error("BAD_SCHEMA");
if (manifest.id !== "github:lucadeg/the-penniless-agent") throw new Error("BAD_ID");
if (manifest.entity_type !== "agent") throw new Error("BAD_ENTITY_TYPE");
if (!Array.isArray(manifest.functions) || manifest.functions.length < 4) throw new Error("MISSING_FUNCTIONS");
if (!Array.isArray(manifest.skills) || !manifest.skills.some(skill => skill.id === "safe-agent-commerce")) {
  throw new Error("SAFE_AGENT_COMMERCE_SKILL_MISSING");
}
if ((manifest.tools_services_rails || []).some(item => item.type === "agent")) {
  throw new Error("TOOL_RAIL_MISCLASSIFIED_AS_AGENT");
}
if (manifest.lifecycle?.canonical_founderos_principal !== false) {
  throw new Error("UNADMITTED_AGENT_MUST_NOT_CLAIM_CANONICAL_PRINCIPAL");
}

console.log(`FOUNDEROS_AGENT_MANIFEST_OK functions=${manifest.functions.length} skills=${manifest.skills.length} capabilities=${manifest.capabilities.length}`);

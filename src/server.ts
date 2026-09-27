import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { openai, hasValidOpenAiKey } from "./services/llm/client";
import {
  generateDynamicDiscovery,
  generateDynamicBattle,
  generateDynamicCritic,
  generateDynamicDeliverables,
} from "./services/intelligence";
import {
  DiscoverySchema,
  BattleResponseSchema,
  ClicheAuditSchema,
  BrandKitSchema,
} from "./services/prompts/brand.prompts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mode: hasValidOpenAiKey ? "openai_live" : "deterministic_neural_engine",
    timestamp: new Date().toISOString(),
  });
});

// Stage 1: Discover
app.post("/api/discover", async (req, res) => {
  const { idea } = req.body;
  if (!idea || typeof idea !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'idea' prompt." });
  }

  try {
    if (hasValidOpenAiKey) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are KiteBrand's Discovery Engine. Extract the 5 strategic brand anchors from the founder spark. Output strictly JSON matching the schema.",
          },
          {
            role: "user",
            content: `Founder spark: "${idea}"`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      const validated = DiscoverySchema.parse(parsed);
      return res.json(validated);
    }
  } catch (err: any) {
    console.warn("OpenAI API call failed, falling back to deterministic engine:", err.message);
  }

  // Fallback to dynamic intelligence engine
  const discovery = generateDynamicDiscovery(idea);
  return res.json(discovery);
});

// Stage 2: Brand Battle
app.post("/api/battle", async (req, res) => {
  const { discovery, idea } = req.body;
  if (!discovery) {
    return res.status(400).json({ error: "Missing 'discovery' context." });
  }

  try {
    if (hasValidOpenAiKey) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the KiteBrand Battle Engine. Spawn 3 divergent positioning archetypes: 'utilitarian', 'cultural_rebel', 'empathic_mentor'. Ensure distinct, non-cliché brand names, hex palettes, and taglines. Output strictly JSON with key 'directions'.",
          },
          {
            role: "user",
            content: `Discovery context: ${JSON.stringify(discovery)}. Raw idea: "${idea || ""}"`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      const validated = BattleResponseSchema.parse(parsed);
      return res.json(validated);
    }
  } catch (err: any) {
    console.warn("OpenAI battle generation failed, using dynamic battle generator:", err.message);
  }

  const battleDirections = generateDynamicBattle(discovery, idea || discovery.coreProblem);
  return res.json({ directions: battleDirections });
});

// Stage 3: Anti-Cliché Critic
app.post("/api/critic", async (req, res) => {
  const { direction, idea } = req.body;
  if (!direction) {
    return res.status(400).json({ error: "Missing 'direction' parameter." });
  }

  try {
    if (hasValidOpenAiKey) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the Adversarial Anti-Cliché Critic. Audit the chosen archetype direction against banned suffixes (-ify, -ly), corporate buzzwords, and WCAG AA contrast. Refine it and calculate originality jump. Output strictly JSON.",
          },
          {
            role: "user",
            content: `Selected archetype: ${JSON.stringify(direction)}. Idea: "${idea || ""}"`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      const validated = ClicheAuditSchema.parse(parsed);
      return res.json(validated);
    }
  } catch (err: any) {
    console.warn("OpenAI critic failed, using dynamic adversarial critic:", err.message);
  }

  const audit = generateDynamicCritic(direction, idea || direction.brandName);
  return res.json(audit);
});

// Stage 4: Deliverables Compiler
app.post("/api/deliver", async (req, res) => {
  const { refinedDirection, idea } = req.body;
  if (!refinedDirection) {
    return res.status(400).json({ error: "Missing 'refinedDirection' parameter." });
  }

  try {
    if (hasValidOpenAiKey) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the KiteBrand Launch Compiler. Generate high-converting copy assets: heroHeadline, heroSubheadline, elevatorPitch, and a 3-tweet launch thread. Output strictly JSON matching BrandKitSchema.",
          },
          {
            role: "user",
            content: `Refined brand: ${JSON.stringify(refinedDirection)}. Idea: "${idea || ""}"`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      const validated = BrandKitSchema.parse(parsed);
      const deliverables = generateDynamicDeliverables(refinedDirection, idea || refinedDirection.brandName);
      return res.json({
        copyAssets: validated,
        tailwindConfig: deliverables.tailwindConfig,
        launchMetrics: deliverables.launchMetrics,
      });
    }
  } catch (err: any) {
    console.warn("OpenAI deliver compiler failed, using local token compiler:", err.message);
  }

  const deliverables = generateDynamicDeliverables(refinedDirection, idea || refinedDirection.brandName);
  return res.json(deliverables);
});

app.listen(PORT, () => {
  console.log(`[KiteBrand Backend] Running at http://localhost:${PORT}`);
});
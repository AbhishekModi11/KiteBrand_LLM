import { z } from "zod";

export const DiscoverySchema = z.object({
  coreProblem: z.string().describe("The core human or business friction being solved"),
  targetAudience: z.string().describe("Specific buyer/user persona"),
  antiAudience: z.string().describe("Who this brand is explicitly NOT built for"),
  marketCategory: z.string().describe("Category wedge or market definition"),
  valueProposition: z.string().describe("A punchy 1-sentence value proposition"),
});
export type DiscoveryData = z.infer<typeof DiscoverySchema>;

export const ArchetypeDirectionSchema = z.object({
  archetypeId: z.enum(["utilitarian", "cultural_rebel", "empathic_mentor"]),
  archetypeName: z.string(),
  brandName: z.string().describe("Distinct name; avoid suffixes like -ify, -ly, or Smart-"),
  namingRationale: z.string(),
  tagline: z.string().describe("Actionable tagline; avoid words like empowering or seamless"),
  palette: z.object({
    primary: z.string().describe("6-digit hex code"),
    secondary: z.string().describe("6-digit hex code"),
    background: z.string().describe("Hex code for background"),
    foreground: z.string().describe("Hex code for high-contrast text"),
  }),
  voiceTraits: z.array(z.string()).length(3),
  wordsToAvoid: z.array(z.string()).min(3),
  strategicAngle: z.string(),
});
export type ArchetypeDirection = z.infer<typeof ArchetypeDirectionSchema>;

export const BattleResponseSchema = z.object({
  directions: z.array(ArchetypeDirectionSchema).length(3),
});
export type BattleResponse = z.infer<typeof BattleResponseSchema>;

export const ClicheAuditSchema = z.object({
  clichesDetected: z.array(z.string()).describe("List of overused tropes found"),
  critiqueSummary: z.string().describe("Direct explanation of what felt generic"),
  scoreBefore: z.number().min(0).max(100),
  scoreAfter: z.number().min(0).max(100),
  refinedDirection: ArchetypeDirectionSchema,
});
export type ClicheAuditData = z.infer<typeof ClicheAuditSchema>;

export const BrandKitSchema = z.object({
  heroHeadline: z.string(),
  heroSubheadline: z.string(),
  elevatorPitch: z.string(),
  socialLaunchThread: z.array(z.string()).length(3),
});
export type BrandKitData = z.infer<typeof BrandKitSchema>;

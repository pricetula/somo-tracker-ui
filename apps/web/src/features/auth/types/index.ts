import * as z from "zod";
import type { components } from "@/types/api";

export const magicLinkSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

export type MagicLinkInput = z.infer<typeof magicLinkSchema>;

export type Role = components["schemas"]["somo-tracker-api_internal_user.Role"];

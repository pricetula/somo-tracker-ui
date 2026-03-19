import { z } from "zod";
import type { components } from "@/types/api";

export type OnboardResponse =
    components["schemas"]["internal_onboarding_delivery_http.onboardResponse"];

export const onboardSchema = z.object({
    tenant_name: z.string().min(1, "Organisation name is required"),
    school_name: z.string().min(1, "School name is required"),
});

export type OnboardInput = z.infer<typeof onboardSchema>;

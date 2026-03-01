import { z } from "zod";
import type { components } from "@/types/api";

export type Invitation = components["schemas"]["somo-tracker-api_internal_invitation.Invitation"];

export const INVITE_ROLES = ["ADMIN", "GUARDIAN", "FACULTY"] as const;

export const inviteUserSchema = z.object({
  email: z.email("Valid email is required"),
  school_id: z.string().min(1, "School is required"),
  role: z.enum(INVITE_ROLES, { message: "Role is required" }),
});

export type InviteUserFormValues = z.infer<typeof inviteUserSchema>;

export type InviteUserRequest = InviteUserFormValues;

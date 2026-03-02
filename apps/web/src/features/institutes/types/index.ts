import { z } from "zod";
import type { components } from "@/types/api";

export type Institute = components["schemas"]["somo-tracker-api_internal_institute.Institute"];
export type AddInstituteRequest = components["schemas"]["internal_institute_delivery_http.addInstituteInput"];
export type UpdateInstituteRequest = components["schemas"]["internal_institute_delivery_http.updateInstituteInput"];

export const createInstituteSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateInstituteFormValues = z.infer<typeof createInstituteSchema>;

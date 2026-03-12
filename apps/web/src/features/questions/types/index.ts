import type { components } from "@/types/api";

export type Question = components["schemas"]["somo-tracker-api_internal_question.Question"];
export type AddQuestionRequest =
    components["schemas"]["internal_question_delivery_http.addQuestionRequest"];
export type UpdateQuestionRequest =
    components["schemas"]["internal_question_delivery_http.updateQuestionRequest"];

export interface Answer {
    id: string;
    question_id: string;
    description: string;
    is_correct: boolean;
    answer_order: number;
}

export type AnswerInput = Omit<Answer, "id">;
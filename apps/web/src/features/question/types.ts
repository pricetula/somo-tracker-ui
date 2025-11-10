export interface Question {
    id: string;
    topic_id: string;
    marks: number;
    description: string;
    question_type: string;
}

export type QuestionInput = Omit<Question, "id">;
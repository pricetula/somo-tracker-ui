export interface ExamQuestion {
    exam_id: string;
    question_id: string;
    question_order: number;
}

export type ExamQuestionID = Omit<ExamQuestion, 'question_order'>

export interface StudentExamQuestionAttempt {
    student_id: string;
    exam_session_id: string;
    question_id: string;
    answer_id: string;
    marks_obtained: number;
    duration_to_answer_seconds: number;
    attempted_at: string;
}
export interface StudentExam {
    institute_id: string;
    student_id: string;
    exam_session_id: string;
    is_evaluated: boolean;
    marks_obtained: number;
    percentage_obtained: number;
    comments: string;
    grade_range_id: string;
}
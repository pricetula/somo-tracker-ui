export interface Exam {
    id: string;
    institute_id: string;
    year_group_id: string;
    subject_id: string;
    name: string;
    max_marks: number;
    description: string;
    instructions: string;
}

export type ExamInput = Omit<Exam, "id" | "institute_id">;
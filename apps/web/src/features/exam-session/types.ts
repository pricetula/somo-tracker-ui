export interface ExamSession {
    id: string;
    exam_id: string;
    date: string;
    start_time: string;
    end_time: string;
}

export type ExamSessionInput = Omit<ExamSession, 'id'>;
export interface User {
    id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    photo_url: string;
    external_auth_id: string;
    institute_id: string;
    active_school_id: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export enum Role {
    ADMIN = "ADMIN",
    FACULTY = "FACULTY",
    STUDENT = "STUDENT",
    GUARDIAN = "GUARDIAN",
}
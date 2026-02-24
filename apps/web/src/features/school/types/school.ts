export interface School {
    id: string;
    institute_id: string;
    education_system_id: string;
    is_home_school: boolean;
    name: string;
    description: string;
    address: string
    website: string;
    school_type: SchoolType;
}

export enum SchoolType {
    HOME_SCHOOL = "HOME_SCHOOL",
    ORGANIZATION = "ORGANIZATION",
    LEARNING_INSTITUTE = "LEARNING_INSTITUTE",
}
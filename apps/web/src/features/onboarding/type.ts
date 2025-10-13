export interface OnboardLearningInstituteInput {
    institute_name: string;
    school_education_system_id: string;
    school_name: string;
    school_description: string;
    school_address: string;
    school_website: string;
    user_email: string;
    user_phone: string;
    user_first_name: string;
    user_last_name: string;
    user_photo_url: string;
    user_external_auth_id: string;
}

export interface OnboardHomeInstituteInput {
    school_education_system_id: string;
    user_email: string;
    user_phone: string;
    user_first_name: string;
    user_last_name: string;
    user_photo_url: string;
    user_external_auth_id: string;
}
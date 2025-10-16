import { GetSchoolUsersInput } from "../types";

export const schoolUsersKeys = {
    all: ['school-users'] as const,
    list: (filters: GetSchoolUsersInput) =>
        [...schoolUsersKeys.all, 'list', filters] as const,
    detail: (id: string) => [...schoolUsersKeys.all, 'detail', id] as const,
    infinite: () => [...schoolUsersKeys.all, 'infinite'] as const,
};

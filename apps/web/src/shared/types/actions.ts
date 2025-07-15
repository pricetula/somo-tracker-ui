export interface ActionResponse<K extends any = any> {
    success: boolean;
    data: K;
    error: string;
}
export interface ServerResponse<T = null> {
    data?: T
    errorCode?: string | null
    message?: string
}
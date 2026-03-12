export type ActionResult<T = void> =
    | (T extends void ? { success: true; data?: never } : { success: true; data: T })
    | { success: false; error: string; code?: number; validationErrors?: Record<string, string[]> };

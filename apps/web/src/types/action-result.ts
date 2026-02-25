export type ActionResult<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
  validationErrors?: Record<string, string[]>;
};

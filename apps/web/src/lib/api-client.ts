import { cookies } from "next/headers";

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function apiClient(path: string, options: RequestOptions = {}): Promise<Response> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured.");
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (sessionToken) {
    headers["Authorization"] = `Bearer ${sessionToken}`;
  }

  return fetch(`${backendUrl}${path}`, { ...options, headers });
}

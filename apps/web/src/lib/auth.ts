// lib/auth.ts
import { cookies } from 'next/headers';
import { COOKIE } from './constants';

export async function getAuthData() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE.AUTH);

    if (!authCookie) {
        return null;
    }

    try {
        return JSON.parse(authCookie.value);
    } catch {
        return null;
    }
}

export async function getAccessToken() {
    const authData = await getAuthData();
    return authData?.access_token || null;
}
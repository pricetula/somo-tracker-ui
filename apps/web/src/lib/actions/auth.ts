"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
    const cookieStore = await cookies();

    // Delete the auth cookie
    cookieStore.delete('auth');

    // Redirect to signin page
    redirect('/signin');
}
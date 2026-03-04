import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
  subscribe: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

    if (!email || typeof email !== 'string') {
      return fail(400, { email: '', missing: true });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { email, invalid: true });
    }

    // TODO: Integrate with your email service / database
    console.log('Waitlist signup:', email);

    return { success: true, email };
  }
} satisfies Actions;

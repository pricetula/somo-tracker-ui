import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/.well-known/')) {
        return new Response('', { status: 200 }); // No Content
    }

    return resolve(event);
};

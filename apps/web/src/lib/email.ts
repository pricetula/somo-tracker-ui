import { Resend } from 'resend';

// Create a new Resend instance with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// sendEmail function to send an email using the Resend API instance
export async function sendEmail({
    to,
    subject,
    html,
    from,
}: {
    to: string;
    subject: string;
    html: string;
    from: string;
}) {
    const fromEmail = from || process.env.OWNER_EMAIL || ''
    if (!fromEmail) {
        throw new Error('No from email address provided');
    }
    const response = await resend.emails.send({
        to,
        subject,
        html,
        from: fromEmail,
    });
    if (response.error) {
        let e = new Error();
        e.name = response.error.name;
        e.message = response.error.message;
        throw e;
    }
    return response;
}

// sendEmailVerification function to send a verification email
export async function sendEmailVerification({
    user,
    url,
    token,
}: {
    user: {
        email: string;
    };
    url: string;
    token: string;
}) {
    const subject = 'Verify your email address';
    const html = `
        <p>Click the link below to verify your email address:</p>
        <a href="${url}">Verify Email</a>
    `;
    await sendEmail({
        html,
        subject,
        to: user.email,
        from: process.env.OWNER_EMAIL || '',
    });
}
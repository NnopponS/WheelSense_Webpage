const DEFAULT_RECEIVER_EMAIL = 'sairag.saa@allied.tu.ac.th';
const DEFAULT_SENDER_EMAIL = 'WheelSense Contact <onboarding@resend.dev>';

function sendJson(res, statusCode, payload) {
    res.status(statusCode).json(payload);
}

function parseJsonBody(req) {
    if (!req.body) {
        return { ok: true, value: {} };
    }

    if (typeof req.body === 'object') {
        return { ok: true, value: req.body };
    }

    if (typeof req.body !== 'string') {
        return { ok: false, error: 'Invalid request body format.' };
    }

    try {
        const parsed = JSON.parse(req.body || '{}');
        return { ok: true, value: parsed };
    } catch {
        return { ok: false, error: 'Invalid JSON payload.' };
    }
}

function normalizeText(value: unknown, maxLength: number) {
    return String(value ?? '').trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed' });
        return;
    }

    const parsed = parseJsonBody(req);
    if (!parsed.ok) {
        sendJson(res, 400, { error: parsed.error });
        return;
    }

    const body = parsed.value || {};
    const name = normalizeText(body.name, 120);
    const email = normalizeText(body.email, 160);
    const subject = normalizeText(body.subject, 180) || `New contact from ${name || 'Website Visitor'}`;
    const message = normalizeText(body.message, 5000);

    if (!name || !email || !message) {
        sendJson(res, 400, { error: 'Missing required fields: name, email, and message.' });
        return;
    }

    if (!isValidEmail(email)) {
        sendJson(res, 400, { error: 'Invalid email address format.' });
        return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        sendJson(res, 503, {
            error: 'Mail service is not configured. Please set RESEND_API_KEY on Vercel.',
        });
        return;
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || DEFAULT_RECEIVER_EMAIL;
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || DEFAULT_SENDER_EMAIL;

    const escapedMessage = escapeHtml(message).replace(/\n/g, '<br />');
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedSubject = escapeHtml(subject);

    const html = `
      <h2>New WheelSense Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> ${escapedEmail}</p>
      <p><strong>Subject:</strong> ${escapedSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${escapedMessage}</p>
    `;

    const text = [
        'New WheelSense Contact Form Submission',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        'Message:',
        message,
    ].join('\n');

    try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: senderEmail,
                to: [receiverEmail],
                reply_to: email,
                subject: `[WheelSense Contact] ${subject}`,
                html,
                text,
            }),
        });

        if (!resendResponse.ok) {
            const resendErrorText = await resendResponse.text();
            sendJson(res, 502, {
                error: 'Failed to send message via mail service.',
                detail: resendErrorText.slice(0, 500),
            });
            return;
        }

        sendJson(res, 200, {
            success: true,
            sentTo: receiverEmail,
        });
    } catch {
        sendJson(res, 502, {
            error: 'Unable to reach mail service. Please try again later.',
        });
    }
}

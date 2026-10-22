// Handles only /quote-request (see run_worker_first in wrangler.jsonc); every other path is
// served straight from the static assets.

const FIELDS = ['name', 'phone', 'email', 'address', 'city', 'postal', 'details'];

async function forwardQuoteRequest(form, env) {
    const body = Object.fromEntries(FIELDS.map((f) => [f, String(form.get(f) ?? '')]));
    const res = await fetch(`${env.CONTRACT_APP_URL}/api/intake/quote-request`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.INTAKE_SECRET}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) console.error('Contract app rejected the quote request', res.status, await res.text());
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname !== '/quote-request') return env.ASSETS.fetch(request);
        if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

        const form = await request.formData().catch(() => null);
        // The hidden honeypot field is only ever filled in by bots.
        if (form && !form.get('honeypot')) {
            ctx.waitUntil(forwardQuoteRequest(form, env).catch((err) => console.error('Forwarding the quote request failed', err)));
        }
        return new Response(null, { status: 204 });
    },
};

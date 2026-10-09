// Pushes lead events to the dataLayer for Google Tag Manager.
// Events: phone_click, email_click, quote_form_submit, quote_form_success
(function () {
    window.dataLayer = window.dataLayer || [];

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
        if (!link) return;

        const href = link.getAttribute('href');
        const isPhone = href.startsWith('tel:');
        window.dataLayer.push({
            event: isPhone ? 'phone_click' : 'email_click',
            link_url: href,
            link_text: link.textContent.trim(),
            page_path: window.location.pathname
        });
    });

    // Fires only after the browser's required-field validation passes.
    document.addEventListener('submit', (e) => {
        if (e.target.id !== 'contact-form') return;
        window.dataLayer.push({
            event: 'quote_form_submit',
            form_id: 'contact-form',
            page_path: window.location.pathname
        });
    });

    // Static Forms redirects to /?success=true after a successful submission.
    // Runs before toast.js removes the parameter from the URL.
    if (new URLSearchParams(window.location.search).get('success') === 'true') {
        window.dataLayer.push({ event: 'quote_form_success', form_id: 'contact-form' });
    }
})();

// Copies each quote request to the contract app (through /quote-request on this site's Worker)
// while the form still posts to Static Forms as before. sendBeacon finishes even as the page leaves.
document.addEventListener('submit', (e) => {
    if (e.target.id !== 'contact-form' || !navigator.sendBeacon) return;
    navigator.sendBeacon('/quote-request', new FormData(e.target));
});

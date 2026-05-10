document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') !== 'true') return;

    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.hidden = true; }, 300);
    }, 5000);

    params.delete('success');
    const newQuery = params.toString();
    const cleanUrl = window.location.pathname + (newQuery ? '?' + newQuery : '') + window.location.hash;
    window.history.replaceState({}, '', cleanUrl);
});

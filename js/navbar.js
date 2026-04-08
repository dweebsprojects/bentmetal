document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-icon');
    const mobileNav = document.querySelector('.mobile-dd');

    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileNav.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileNav.classList.remove('is-open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileNav = document.querySelector('.mobile-dd');
    const servicesToggle = document.querySelector('.mobile-services');

    if (menuIcon && mobileNav) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('is-open');
        });
    }

    if (servicesToggle) {
        servicesToggle.addEventListener('click', (e) => {
            if (e.target.closest('.mobile-services-link')) {
                e.preventDefault();
                servicesToggle.classList.toggle('is-open');
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (mobileNav && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('is-open');
        }
    });
});
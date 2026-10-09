function updateGtagConsent() {
    if (typeof gtag !== 'function') return;
    var analytics = CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied';
    var advertising = CookieConsent.acceptedCategory('advertising') ? 'granted' : 'denied';
    gtag('consent', 'update', {
        'analytics_storage': analytics,
        'ad_storage': advertising,
        'ad_user_data': advertising,
        'ad_personalization': 'denied'
    });
}

CookieConsent.run({
    // Analytics and ad measurement are on until the visitor turns them off.
    mode: 'opt-out',
    // Bumped when categories change so visitors see the updated choices.
    revision: 1,

    onConsent: updateGtagConsent,
    onChange: updateGtagConsent,

    guiOptions: {
        consentModal: {
            layout: 'box inline',
            position: 'bottom right',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {
            enabled: true,
            readOnly: false,
            autoClear: {
                cookies: [
                    { name: /^_ga/ },
                    { name: '_gid' },
                    { name: '_gat' }
                ]
            }
        },
        advertising: {
            enabled: true,
            readOnly: false,
            autoClear: {
                cookies: [
                    { name: /^_gcl_/ }
                ]
            }
        }
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'We use cookies to keep our site running, understand how visitors use it, and measure whether our Google ads lead to calls and quote requests. You can accept these, reject non-essential cookies, or choose which categories to allow.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage preferences',
                    footer: '<a href="/privacy-policy/">Privacy Policy</a>'
                },
                preferencesModal: {
                    title: 'Cookie Preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Save preferences',
                    closeIconLabel: 'Close',
                    sections: [
                        {
                            title: 'Your privacy choices',
                            description: 'You can choose which cookie categories to allow below. Strictly necessary cookies are always active because the site won\'t work properly without them. For full details, see our <a href="/privacy-policy/">Privacy Policy</a>.'
                        },
                        {
                            title: 'Strictly necessary',
                            description: 'These cookies are essential for the site to function — for example, remembering form input or maintaining session state. They cannot be turned off.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analytics',
                            description: 'These cookies help us understand how visitors use our site so we can improve it.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Advertising measurement',
                            description: 'These cookies, set by Google Ads, tell us when a visit that started from one of our ads leads to a phone call, email, or quote request, so we know whether our advertising is working. We do not use them for remarketing or personalized ads.',
                            linkedCategory: 'advertising'
                        },
                        {
                            title: 'More information',
                            description: 'For any questions about our cookie policy or your privacy choices, contact us at <a href="mailto:info@bentmetal.ca">info@bentmetal.ca</a>.'
                        }
                    ]
                }
            }
        }
    }
});

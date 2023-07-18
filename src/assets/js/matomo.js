const jhMatomoScriptMainMatomoSiteId = 1;
const jhMatomoScriptDevMatomoSiteId = 6;

(function () {
    const nationalPortals = [
        'minnesider.no',
        'vareminnesider.no',
        'ourmemorialpages.co.uk',
        'ourmemorialpages.com',
        'voresmindesider.dk',
        'gedachtenispagina.nl',
        'varaminnessidor.se',
        'minnessidor.fonus.se',
    ];
    const hostedDomains = [
        'localhost',
        'ads1.itpartner.no',
        ...nationalPortals
    ];
    const trackingDomains = [
        ...nationalPortals,
        '*.minnesider.no',
        '*.vareminnesider.no',
        '*.ourmemorialpages.co.uk',
        '*.ourmemorialpages.com',
        '*.voresmindesider.dk',
        '*.gedachtenispagina.nl',
        '*.varaminnessidor.se',
    ];
    const excludedDomains = ['localhost', 'national-portal-fe.development.ads1.itpartner.no', 'national-portal-fe.test.ads1.itpartner.no'];
    const _paq = (window._paq = window._paq || []);
    const matomoURL = 'https://matomo.production.ads1.itpartner.no/';

    try {
        (async function () {
            const currentScriptURL = new URL(document.currentScript.src);
            const matomoSiteId = currentScriptURL.searchParams.get('matomoSiteId');
            const alreadySetSiteId = jhMatomoScriptFindAlreadySetSiteId();
            const shouldDuplicateDataToAnotherSite = (alreadySetSiteId !== jhMatomoScriptMainMatomoSiteId) && (alreadySetSiteId !== 0);

            await jhMatomoScriptSetupMatomoPaqObject(_paq, matomoURL, +matomoSiteId, trackingDomains, hostedDomains, excludedDomains, shouldDuplicateDataToAnotherSite);

            if (shouldDuplicateDataToAnotherSite === false) {
                jhMatomoScriptAddMatomoScriptToPage(matomoURL);
                jhMatomoScriptTriggerMatomoPageView(_paq);
            }
        })();
    } catch (error) {
        console.error('Something went wrong, we could not setup the Matomo script.', error);
    }
})();

async function jhMatomoScriptGetApplicationVersion(options) {
    try {
        let versionTxtRequestURL = '/version.txt'

        if (options && Array.isArray(options.domainsWithVersionFile)) {
            const currentDomain = jhMatomoScriptGetHostname();
            let okToMakeCurrentRequest = false;

            options.domainsWithVersionFile.forEach(domainWithVersionFile => {
                if (currentDomain.includes(domainWithVersionFile)) {
                    okToMakeCurrentRequest = true;
                }
            })

            if (okToMakeCurrentRequest === false) {
                versionTxtRequestURL = `https://minnesider.no${versionTxtRequestURL}`;
            }
        }

        const versionName = await fetch(versionTxtRequestURL)
            .then((r) => r.text())
            .then((r) => {
                let versionLine = 'Unknown';
                r.split('\n').forEach((line) => {
                    if (line.includes('omp_') || line.includes('java-hut')) {
                        versionLine = line;
                    }
                });

                if (options.nameOnly === true) {
                    if (versionLine.includes('omp_')) {
                        return 'omp';
                    }
                    if (versionLine.includes('java-hut')) {
                        return 'java-hut';
                    }
                }

                return versionLine;
            })
            .catch((error) => {
                console.error('Unable to get version number.', error);
                return 'Unknown';
            });

        return versionName ?? 'Unknown';
    } catch (error) {
        console.error(error)
        return 'Unknown';

    }
}

function jhMatomoScriptGetApplicationHostedOrEmbedded() {
    try {
        const bodyElement = document.querySelector('body');
        let pageIsHosted = false;

        if (bodyElement) {
            // Java Hut always has "memorial-pages-hosted" and Nova always has "home_page_background"
            pageIsHosted = bodyElement.classList.contains('memorial-pages-hosted') || bodyElement.classList.contains('home_page_background');
        }

        return pageIsHosted ? 'hosted' : 'embedded';
    } catch (error) {
        console.error(error)
        return 'Unknown'
    }
}

function jhMatomoScriptFindAlreadySetSiteId() {
    try {
        if (Array.isArray(window._paq) === false) {
            return 0;
        }

        if (Array.isArray(window._paq) && window._paq.length === 0) {
            return 0
        }

        let setSiteIdArray = null;
        window._paq.forEach((itemArray) => {
            if (Array.isArray(itemArray)) {
                itemArray.forEach((item) => {
                    if (item === 'setSiteId') {
                        setSiteIdArray = itemArray;
                    }
                });
            }
        });

        let alreadySetSiteId = 0;
        if (setSiteIdArray !== null && setSiteIdArray.length === 2 && setSiteIdArray[0] === 'setSiteId' && isNaN(setSiteIdArray[1]) === false) {
            alreadySetSiteId = setSiteIdArray[1];
        }

        return alreadySetSiteId;
    } catch (error) {
        console.error(error)
        return 0
    }
}

function jhMatomoScriptAddMatomoScriptToPage(matomoURL) {
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = matomoURL + 'matomo.js';

    const firstScriptOnPage = document.getElementsByTagName('script')[0];
    firstScriptOnPage.parentNode.insertBefore(scriptElement, firstScriptOnPage);
}

// Sets up the paq object. The reason this is a Promise is due to some weird timing issues by the ayns jhMatomoScriptGetApplicationVersion
// that caused the custom dimensions to someimtes not be completely setup. Doing things this way solved that problem
function jhMatomoScriptSetupMatomoPaqObject(_paq, matomoURL, matomoSiteId, trackingDomains, hostedDomains, excludedDomains, shouldDuplicateDataToAnotherSite) {
    return new Promise(async (resolve) => {
        _paq.push(['setDomains', trackingDomains]);
        _paq.push(['enableCrossDomainLinking']);
        _paq.push(['enableLinkTracking']);
        _paq.push(['requireCookieConsent']); // step 1 in: https://developer.matomo.org/guides/tracking-consent
        _paq.push(['setDoNotTrack', true]);  // step 4 in: https://matomo.org/faq/general/configure-privacy-settings-in-matomo/

        _paq.push(['setCustomDimension', (customDimensionId = 1), (customDimensionValue = jhMatomoScriptGetHostname())]);
        _paq.push(['setCustomDimension', (customDimensionId = 2), (customDimensionValue = await jhMatomoScriptGetApplicationVersion({ domainsWithVersionFile: hostedDomains }))]);
        _paq.push(['setCustomDimension', (customDimensionId = 3), (customDimensionValue = jhMatomoScriptGetApplicationHostedOrEmbedded())]);

        if (shouldDuplicateDataToAnotherSite) {
            _paq.push(['addTracker', matomoURL + 'matomo.php', jhMatomoScriptMainMatomoSiteId]);
        } else {
            let matomoSiteIdToUse = matomoSiteId
            if (excludedDomains.includes(window.location.hostname)) {
                console.warn('Hostname is excluded from tracking, using dev site id', window.location.hostname);
                matomoSiteIdToUse = jhMatomoScriptDevMatomoSiteId;
            }

            _paq.push(['setSiteId', matomoSiteIdToUse]);
            _paq.push(['setTrackerUrl', matomoURL + 'matomo.php']);
        }

        resolve(true)
    })
}

function jhMatomoScriptTriggerMatomoPageView(_paq) {
    _paq.push(['trackPageView']);
}

function jhMatomoScriptGetHostname() {
    return window.location.hostname?.replace('www.', '') ?? 'Unknown';
}
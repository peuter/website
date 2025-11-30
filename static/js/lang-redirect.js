// Language detection and redirect
// Only runs on the root page to redirect to appropriate language version
(function() {
    // Only redirect if we're on the root path (English default)
    const path = window.location.pathname;
    const basePath = document.querySelector('meta[name="base-path"]')?.content || '/';
    
    // Check if we're on the root/default English page
    if (path === basePath || path === basePath + 'index.html') {
        // Check if user has already made a language choice (stored in localStorage)
        const savedLang = localStorage.getItem('cv-lang-choice');
        if (savedLang) {
            return; // User has already chosen, don't redirect
        }
        
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        const primaryLang = browserLang.split('-')[0].toLowerCase();
        
        // If browser is German, redirect to German version
        if (primaryLang === 'de') {
            window.location.replace(basePath + 'de/');
        }
    }
})();

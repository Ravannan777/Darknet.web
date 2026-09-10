// ==========================================================================
// DARK-NET — Premium interaction layer
// Scroll-triggered reveal animations, scroll progress bar, cursor glow
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

    // 1) Scroll-triggered reveal for sections + their cards, staggered
    var sections = document.querySelectorAll('.master-content-section');
    var cardSelector = '.tech-deep-card, .master-module-card, .platform-install-card, ' +
        '.forensics-details-card, .terminal-documentation-box, .master-warning-banner, .master-developer-card';

    sections.forEach(function (section) {
        section.classList.add('reveal-init');
        var cards = section.querySelectorAll(cardSelector);
        cards.forEach(function (card, i) {
            card.classList.add('reveal-init');
            card.style.setProperty('--d', (i * 0.12) + 's');
        });
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    entry.target.querySelectorAll(cardSelector).forEach(function (card) {
                        card.classList.add('in-view');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        sections.forEach(function (section) { observer.observe(section); });
    } else {
        // Fallback: no IntersectionObserver support — just show everything
        sections.forEach(function (section) {
            section.classList.add('in-view');
            section.querySelectorAll(cardSelector).forEach(function (card) {
                card.classList.add('in-view');
            });
        });
    }

    // 2) Scroll progress bar across the top of the page
    var progressBar = document.getElementById('scrollProgressBar');
    function updateProgress() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // 3) Subtle cursor-reactive ambient glow (desktop only, respects reduced motion)
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', function (e) {
            cursorGlow.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) translate(-50%, -50%)';
            cursorGlow.style.opacity = '1';
        }, { passive: true });
        window.addEventListener('mouseleave', function () {
            cursorGlow.style.opacity = '0';
        });
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

});

// CometVisu Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Demo Lazy Loading - Load iframe on click
    const demoLazyContainers = document.querySelectorAll('.demo-lazy-container');
    
    demoLazyContainers.forEach(container => {
        container.addEventListener('click', function() {
            if (this.classList.contains('loaded') || this.classList.contains('loading')) return;
            
            const demoUrl = this.dataset.demoUrl;
            if (!demoUrl) return;
            
            const self = this;
            const scrollPos = window.scrollY;
            let scrollLocked = true;
            
            // Show loading spinner
            this.classList.add('loading');
            
            // Lock scroll position during iframe load
            const scrollHandler = function() {
                if (scrollLocked) {
                    window.scrollTo(0, scrollPos);
                }
            };
            window.addEventListener('scroll', scrollHandler);
            
            // Create iframe
            const iframe = document.createElement('iframe');
            iframe.src = demoUrl;
            iframe.title = 'CometVisu Demo';
            
            // Determine which class to use based on container
            if (this.classList.contains('showcase-content')) {
                iframe.className = 'showcase-iframe';
            } else {
                iframe.className = 'demo-frame';
                iframe.id = 'demo-frame';
            }
            
            // When iframe is loaded, hide spinner and show demo
            iframe.addEventListener('load', function() {
                // Delay unlock slightly to catch any late scroll events
                setTimeout(function() {
                    scrollLocked = false;
                    window.removeEventListener('scroll', scrollHandler);
                    window.scrollTo(0, scrollPos);

                    const loaded = () => {
                        // Hide loading, show loaded
                        self.classList.remove('loading');
                        self.classList.add('loaded');
                    }

                    if (iframe.contentWindow.cv) {
                        if (iframe.contentWindow.cv.TemplateEngine.getInstance().isDomFinished()) {
                            loaded();
                        } else {
                            iframe.contentWindow.qx.event.message.Bus.subscribe(
                                'setup.dom.finished',
                                function() {
                                    loaded();
                                },
                                this
                            );
                        }
                    } else {
                        loaded();
                    }
                
                }, 100);
                
                // Mark parent showcase-frame as loaded (for resize controls visibility)
                const showcaseFrame = self.closest('.showcase-frame');
                if (showcaseFrame) {
                    showcaseFrame.classList.add('demo-loaded');
                }
            });
            
            // Append iframe (hidden while loading via CSS)
            this.appendChild(iframe);
            
            // Store the base URL for tab switching
            this.dataset.loadedUrl = demoUrl;
            
            // Fallback: unlock and show after 10 seconds
            setTimeout(function() {
                scrollLocked = false;
                window.removeEventListener('scroll', scrollHandler);
                if (self.classList.contains('loading')) {
                    self.classList.remove('loading');
                    self.classList.add('loaded');
                }
            }, 10000);
        });
    });
    
    // Demo Resize Controls
    const resizeButtons = document.querySelectorAll('.resize-btn[data-size]');
    const showcaseContent = document.querySelector('.showcase-content');
    
    if (resizeButtons.length > 0 && showcaseContent) {
        resizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active state
                resizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Get size
                const size = this.dataset.size;
                
                // Apply size to showcase content
                showcaseContent.dataset.size = size;
            });
        });
    }
    
    // Demo Tab Switching
    const demoTabs = document.querySelectorAll('.demo-tab[data-config]');
    const demoFrameContainer = document.querySelector('#demo .demo-lazy-container');
    
    if (demoTabs.length > 0 && demoFrameContainer) {
        demoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active state
                demoTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Get config name
                const config = this.dataset.config;
                
                // Get base URL
                const baseUrl = demoFrameContainer.dataset.demoUrl;
                
                // Build new URL
                let newUrl = baseUrl;
                if (config) {
                    newUrl += '?config=' + config + '&testMode=true&enableCache=false';
                }
                
                // If already loaded, update iframe src
                if (demoFrameContainer.classList.contains('loaded')) {
                    const iframe = demoFrameContainer.querySelector('iframe');
                    if (iframe) {
                        iframe.src = newUrl;
                    }
                } else {
                    // Load the demo with the selected config
                    demoFrameContainer.dataset.demoUrl = newUrl;
                    demoFrameContainer.click();
                }
            });
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .level-card, .backend-card').forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
    
    // Customization Carousel
    initCarousel();
});

function initCarousel() {
    const container = document.querySelector('.carousel-container');
    if (!container) return;
    
    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-btn-prev');
    const nextBtn = container.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function updateCarousel() {
        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    container.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Initialize
    updateCarousel();
}

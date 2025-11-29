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
            if (this.classList.contains('loaded')) return;
            
            const demoUrl = this.dataset.demoUrl;
            if (!demoUrl) return;
            
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
            
            // Append iframe and mark as loaded
            this.appendChild(iframe);
            this.classList.add('loaded');
            
            // Also mark parent showcase-frame as loaded (for resize controls visibility)
            const showcaseFrame = this.closest('.showcase-frame');
            if (showcaseFrame) {
                showcaseFrame.classList.add('demo-loaded');
            }
            
            // Store the base URL for tab switching
            this.dataset.loadedUrl = demoUrl;
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
});

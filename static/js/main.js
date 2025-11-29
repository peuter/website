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
    
    // Hero Demo - Interactive resizable demo
    const demoPlaceholder = document.getElementById('demoPlaceholder');
    const heroIframe = document.getElementById('heroIframe');
    const demoContainer = document.getElementById('demoContainer');
    const resizeHandle = document.getElementById('resizeHandle');
    const resizeDimensions = document.getElementById('resizeDimensions');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    // Demo URL
    const lang = document.documentElement.lang || 'de';
    const demoUrl = 'https://www.cometvisu.org/CometVisu/' + lang + '/develop/demo/';
    
    // Load demo on click
    if (demoPlaceholder && heroIframe) {
        demoPlaceholder.addEventListener('click', function() {
            heroIframe.src = demoUrl;
            heroIframe.classList.remove('hidden');
            demoPlaceholder.style.display = 'none';
        });
    }
    
    // Fullscreen button
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            window.open(demoUrl, '_blank');
        });
    }
    
    // Resizable demo container
    if (resizeHandle && demoContainer && resizeDimensions) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        const updateDimensions = () => {
            const rect = demoContainer.getBoundingClientRect();
            resizeDimensions.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)} px`;
        };
        
        // Initial dimensions
        updateDimensions();
        
        resizeHandle.addEventListener('mousedown', function(e) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = demoContainer.offsetWidth;
            startHeight = demoContainer.offsetHeight;
            demoContainer.classList.add('resizing');
            document.body.style.cursor = 'nwse-resize';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            // Maintain aspect ratio or allow free resize
            const newWidth = Math.max(320, Math.min(1200, startWidth + deltaX));
            const newHeight = Math.max(180, Math.min(800, startHeight + deltaY));
            
            demoContainer.style.width = newWidth + 'px';
            demoContainer.style.height = newHeight + 'px';
            demoContainer.style.aspectRatio = 'unset';
            
            updateDimensions();
        });
        
        document.addEventListener('mouseup', function() {
            if (isResizing) {
                isResizing = false;
                demoContainer.classList.remove('resizing');
                document.body.style.cursor = '';
            }
        });
        
        // Touch support for mobile
        resizeHandle.addEventListener('touchstart', function(e) {
            isResizing = true;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startWidth = demoContainer.offsetWidth;
            startHeight = demoContainer.offsetHeight;
            demoContainer.classList.add('resizing');
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('touchmove', function(e) {
            if (!isResizing) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            const newWidth = Math.max(280, Math.min(window.innerWidth - 48, startWidth + deltaX));
            const newHeight = Math.max(160, Math.min(600, startHeight + deltaY));
            
            demoContainer.style.width = newWidth + 'px';
            demoContainer.style.height = newHeight + 'px';
            demoContainer.style.aspectRatio = 'unset';
            
            updateDimensions();
        }, { passive: false });
        
        document.addEventListener('touchend', function() {
            if (isResizing) {
                isResizing = false;
                demoContainer.classList.remove('resizing');
            }
        });
        
        // Update dimensions on window resize
        window.addEventListener('resize', updateDimensions);
    }
    
    // Demo Tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoIframe = document.getElementById('demo-iframe');
    const demoOverlay = document.querySelector('.demo-overlay');
    
    // Use existing lang variable from above
    const demoBasePath = lang === 'en' 
        ? 'https://www.cometvisu.org/CometVisu/en/latest/_static/CometVisu/'
        : 'https://www.cometvisu.org/CometVisu/de/latest/_static/CometVisu/';
    
    const demoUrls = {
        'tile': demoBasePath + '?config=demo&testMode=true&enableCache=false&design=tile',
        'pure': demoBasePath + '?config=demo&testMode=true&enableCache=false&design=pure'
    };
    
    if (demoTabs.length && demoIframe) {
        demoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const demo = this.dataset.demo;
                
                // Update active state
                demoTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show loading overlay
                if (demoOverlay) {
                    demoOverlay.classList.add('loading');
                }
                
                // Change iframe source
                demoIframe.src = demoUrls[demo];
            });
        });
        
        // Hide overlay when iframe loads
        demoIframe.addEventListener('load', function() {
            if (demoOverlay) {
                demoOverlay.classList.remove('loading');
            }
        });
    }
    
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

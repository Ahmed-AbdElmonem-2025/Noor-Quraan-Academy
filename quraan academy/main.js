document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       1. Scroll Revel Animations
       ============================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    /* ==============================================
       2. Sticky Header & Mobile Nav
       ============================================== */
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMobileNav = document.getElementById('closeMobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });
        
        closeMobileNav.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });

        // Close when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
    }

    /* ==============================================
       3. Smooth Scrolling for Anchor Links
       ============================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ==============================================
       4. Countdown Timer Logic
       ============================================== */
    const countdownElement = document.getElementById('countdown');
    
    // Set timer for 5 hours from load (simulated urgency)
    let time = 5 * 60 * 60; 

    const updateCountdown = () => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;

        countdownElement.innerHTML = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        if (time > 0) {
            time--;
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* ==============================================
       5. FAQ Accordion Logic
       ============================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('open');
            });

            // Open clicked if it wasn't open
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    /* ==============================================
       6. Exit Intent Popup Logic
       ============================================== */
    const exitPopup = document.getElementById('exitPopup');
    const closePopupBtn = document.getElementById('closePopup');
    let hasShownPopup = false;

    const showPopup = (e) => {
        // Trigger if cursor leaves top of window
        if (e.clientY < 10 && !hasShownPopup) {
            exitPopup.classList.remove('hidden');
            hasShownPopup = true;
        }
    };

    // Desktop exit intent
    document.addEventListener('mouseout', showPopup);

    // Mobile specific: show popup after 45 seconds of inactivity or fast scroll back up
    let scrollTimeout;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        
        // Fast scroll up detection
        if (lastScrollTop - st > 50 && !hasShownPopup && st > 500) {
            exitPopup.classList.remove('hidden');
            hasShownPopup = true;
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });

    setTimeout(() => {
        if (!hasShownPopup && window.innerWidth < 768) {
            exitPopup.classList.remove('hidden');
            hasShownPopup = true;
        }
    }, 45000); // 45 seconds on mobile

    closePopupBtn.addEventListener('click', () => {
        exitPopup.classList.add('hidden');
    });

    // Close when clicking outside of popup content
    exitPopup.addEventListener('click', (e) => {
        if (e.target === exitPopup) {
            exitPopup.classList.add('hidden');
        }
    });

    /* ==============================================
       7. Number Counting Animation (Social Proof)
       ============================================== */
    const countStudents = document.getElementById('count-students');
    if (countStudents) {
        const targetCount = 500;
        const duration = 2000; // 2 seconds
        const frameRate = 30;
        const totalFrames = Math.round(duration / (1000 / frameRate));
        let currentFrame = 0;

        const animateCount = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const currentCount = Math.round(easeProgress * targetCount);
            
            countStudents.innerText = `+${currentCount}`;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(animateCount);
            }
        };

        // Trigger when in view or simply on load for hero
        setTimeout(animateCount, 800); // Small delay for reveal animation
    }

});

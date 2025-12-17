/**
 * Mediguard Connect - Main Logic
 * Handles Emergency interactions, Dashboard updates, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

    // Preloader Logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 1500); // Show "medical" load for 1.5s
        }
    });

    // 1. Emergency Simulation with SOUND
    const emergencyBtns = document.querySelectorAll('.btn-emergency');

    // Siren Sound Generator (Web Audio API - No external file needed!)
    function playSiren() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 700; // Start freq

        // Modulate frequency to create "Wee-Woo" siren
        // Ramp up to 1200, then down to 700
        const now = audioCtx.currentTime;
        oscillator.frequency.setValueAtTime(700, now);
        oscillator.frequency.linearRampToValueAtTime(1200, now + 0.6);
        oscillator.frequency.linearRampToValueAtTime(700, now + 1.2);
        oscillator.frequency.linearRampToValueAtTime(1200, now + 1.8);
        oscillator.frequency.linearRampToValueAtTime(700, now + 2.4);

        // Volume envelope
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 2);
        gainNode.gain.linearRampToValueAtTime(0.01, now + 2.5); // Fade out

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(now + 2.5);
    }

    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Play Sound!
            playSiren();

            // Shake effect
            btn.style.animation = 'shake 0.5s';
            setTimeout(() => btn.style.animation = '', 500);

            // Simulation Alert
            const originalText = btn.innerHTML;

            // Only change text for large buttons, simplified for floating
            if (!btn.classList.contains('floating-panic-btn')) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CALLING...';
            }

            btn.disabled = true;

            setTimeout(() => {
                alert(`🚑 STATUS DARURAT TERKONFIRMASI! \n\nLokasi: Terdeteksi\nEstimasi Ambulans: 8 Menit\nStatus: Driver sedang meluncur.`);

                if (!btn.classList.contains('floating-panic-btn')) {
                    btn.innerHTML = '<i class="fas fa-check"></i> AMBULANS OTW';
                }
                btn.style.background = 'var(--success)';

                // Reset after 5s
                setTimeout(() => {
                    if (!btn.classList.contains('floating-panic-btn')) {
                        btn.innerHTML = originalText;
                    }
                    btn.style.background = ''; // Resets to gradient or original
                    btn.disabled = false;
                }, 5000);
            }, 1500);
        });
    });

    // 2. Prolanis Graph Animation on Scroll
    const bars = document.querySelectorAll('.bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate height from 0% to data-target
                const targetHeight = entry.target.getAttribute('data-target');
                entry.target.style.height = targetHeight;
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));

    // 3. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Manually set active class immediately
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 4. Navbar Scroll Spy (Dynamic Active State)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        // If we are not on the homepage (no #home section), do not run scrollspy.
        // This preserves the manually set 'active' class on article pages.
        if (!document.querySelector('#home')) return;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for navbar height (offset by 100px)
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Update on scroll with simple throttle or RAF could be better, but this is fine for now
    window.addEventListener('scroll', () => {
        updateActiveLink();

        // Navbar shadow effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 82, 204, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 82, 204, 0.1)';
        }
    });

    // Initial Call
    updateActiveLink();


    // 5. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .article-card, .pricing-card, .form-container, .monitor-card');

    // Add class for styling
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Live Heartbeat & Data Simulation
    function simulateHeartbeat() {
        // Random BP variation between 115/75 and 125/80
        const systolic = Math.floor(Math.random() * (125 - 115 + 1)) + 115;
        const diastolic = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
        const bpElement = document.querySelector('.vital-item .vital-value');

        if (bpElement) {
            // Blink effect
            bpElement.style.opacity = 0.5;
            setTimeout(() => {
                bpElement.innerText = `${systolic}/${diastolic}`;
                bpElement.style.opacity = 1;
            }, 200);
        }
    }

    // Run simulation every 5 seconds
    setInterval(simulateHeartbeat, 5000);

    // 7. Graph Live Update (Mock) - AGGRESSIVE MODE
    setInterval(() => {
        const bars = document.querySelectorAll('.bar');

        bars.forEach(bar => {
            // 40% chance to update each bar every cycle
            if (Math.random() > 0.6) {
                const originalHeight = parseInt(bar.style.height) || 50;
                // Random fluctuation
                const fluctuation = Math.floor(Math.random() * 20) - 10; // -10 to +10
                let newHeight = originalHeight + fluctuation;

                // Bounds Check
                newHeight = Math.max(30, Math.min(90, newHeight));

                // Occasional Spike
                if (Math.random() < 0.05) { // 5% chance spike
                    newHeight = 95;
                    bar.classList.add('alert');
                } else {
                    bar.classList.remove('alert');
                }

                bar.style.height = `${newHeight}%`;

                // Update Badge text
                if (newHeight > 80) bar.setAttribute('data-value', 'High');
                else bar.setAttribute('data-value', 'Normal');
            }
        });

    }, 800); // Very fast updates (0.8s)

    /* Add simple shake keyframes dynamically */
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    `;
    document.head.appendChild(styleSheet);
});

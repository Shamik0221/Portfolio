document.addEventListener('DOMContentLoaded', () => {
    
    // Typewriter Effect
    const texts = [
        "Software Engineer.",
        "Software Test Engineer.",
        "Automation Test Engineer.",
        "SDET.",
        "Functional QA Engineer.",
        "QA Automation Engineer."
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    
    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        
        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }
        
        const textElement = document.getElementById('typewriter-text');
        if (textElement) {
            textElement.textContent = letter;
        }
        
        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a progress bar container, animate the bars
                if (entry.target.classList.contains('skill-group-card')) {
                    const fills = entry.target.querySelectorAll('.progress-fill');
                    fills.forEach(fill => {
                        const percent = fill.getAttribute('data-percentage');
                        fill.style.width = percent + '%';
                    });
                    
                    const counters = entry.target.querySelectorAll('.skill-percent-counter');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        let count = 0;
                        const duration = 1500; // 1.5s
                        const increment = target / (duration / 16); // 60fps
                        
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count) + '%';
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target + '%';
                            }
                        };
                        updateCount();
                    });
                }
                
                // Unobserve after animating (run once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-hidden').forEach((el) => {
        observer.observe(el);
    });

    // Random rotation for certification cards
    const randomRotateCards = document.querySelectorAll('.random-rotate');
    randomRotateCards.forEach(card => {
        const angle = (Math.random() * 4) - 2; // -2 to 2 degrees
        card.style.transform = `translateY(30px) rotate(${angle}deg)`;
    });

    // 3D Tilt Effect for Certifications
    const certCards = document.querySelectorAll('.cert-card-v2');
    
    certCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4; // Max 4 deg
            const rotateY = ((x - centerX) / centerX) * 4;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Form inputs focus logic for floating labels (handling pre-filled values)
    const inputs = document.querySelectorAll('.float-label-group input, .float-label-group textarea');
    inputs.forEach(input => {
        // Trigger once on load in case there's value
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

});

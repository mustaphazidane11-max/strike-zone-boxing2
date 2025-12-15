document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            
            // Toggle l'icône (fa-bars <-> fa-times)
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click (for smooth scrolling)
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                // Sauf si c'est le bouton de contact qui est géré différemment
                if (link.classList.contains('btn-contact')) {
                    // Si le menu est ouvert, ferme-le quand même après le clic
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    return; 
                }
                
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Scroll to Top Button Visibility
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
                scrollToTopBtn.setAttribute('aria-hidden', 'false');
            } else {
                scrollToTopBtn.style.display = 'none';
                scrollToTopBtn.setAttribute('aria-hidden', 'true');
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initial check
        toggleVisibility();
    }

    // 3. Update Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    
    // 4. Modal Annonce Iftitah (Ghadi Ybqa Yatla3 Dā'iman)
    const openingModal = document.getElementById('opening-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalLinkBtn = document.querySelector('.modal-btn');

    const showModal = () => {
        // Hada ghaybayan modal dā'iman melli kaddir refresh
        openingModal.classList.add('open');
        openingModal.setAttribute('aria-hidden', 'false');
    };

    const hideModal = () => {
        // Ghaykhfi l-modal b-had l-click l-wahda
        openingModal.classList.remove('open');
        openingModal.setAttribute('aria-hidden', 'true');
    };
    
    if (openingModal) {
        // Show modal when the page loads (delay for better UX, 1.5 seconds)
        setTimeout(showModal, 1500); 

        // Close when the close button is clicked
        closeModalBtn.addEventListener('click', hideModal);

        // Close when the link button inside the modal is clicked
        modalLinkBtn.addEventListener('click', hideModal);

        // Close when clicking outside the modal content
        openingModal.addEventListener('click', (e) => {
            if (e.target === openingModal) {
                hideModal();
            }
        });
        
        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && openingModal.classList.contains('open')) {
                hideModal();
            }
        });
    }
    
    
    // 5. Image Carousel Logic (Gallery Section) - Tt3dīl L-Jdīd
    const currentImg = document.getElementById('current-salle-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators-container');
    
    // 1. Array dyāl l-images k-āmil-a
    const galleryImages = [
        { src: "images/salle1.jpg" },
        { src: "images/salle2.jpg" },
        { src: "images/salle3.jpg" },
        { src: "images/salle4.jpg" },
        { src: "images/salle5.jpg" },
        { src: "images/salle6.jpg" },
        { src: "images/salle7.jpg" },
        { src: "images/salle8.jpg" },
        { src: "images/salle9.jpg" },
    ];

    if (currentImg && galleryImages.length > 0) {
        let currentSlideIndex = 0;
        const slideCount = galleryImages.length;
        
        // Function to update the image
        const updateImage = () => {
            // Fade out the old image
            currentImg.style.opacity = 0;
            
            setTimeout(() => {
                // Update the source (l-kh-t-wa l-as-ās-iyya)
                currentImg.src = galleryImages[currentSlideIndex].src;
                
                // Fade in the new image
                currentImg.style.opacity = 1;
                
                // Update indicators
                updateIndicators();
            }, 300); // Wait for the fade out transition (0.3s)
        };
        
        // Function to create indicators (dots)
        const createIndicators = () => {
            galleryImages.forEach((image, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                indicator.addEventListener('click', () => {
                    currentSlideIndex = index;
                    updateImage();
                });
                indicatorsContainer.appendChild(indicator);
            });
        };

        // Function to update the active indicator
        const updateIndicators = () => {
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlideIndex);
            });
        };
        
        // Event Listeners for Buttons
        prevBtn.addEventListener('click', () => {
            // Loop backward
            currentSlideIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
            updateImage();
        });

        nextBtn.addEventListener('click', () => {
            // Loop forward
            currentSlideIndex = (currentSlideIndex + 1) % slideCount;
            updateImage();
        });

        // Initialize the carousel
        createIndicators();
        // Set initial content
        updateImage(); 
    }


    // 6. Contact Form Submission (using Formspree)
    const form = document.getElementById('contact-form-submit');
    const formStatusMessage = document.getElementById('form-status-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;

            const data = new FormData(form);
            const action = e.target.action;

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // Hide loading state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                if (response.ok) {
                    // Message dyāl l-success m-3a t-3dīl dyāl l-button
                    formStatusMessage.textContent = "✅ شكراً! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.";
                    formStatusMessage.className = 'success';
                    formStatusMessage.style.display = 'block';
                    form.reset();
                } else {
                    const responseData = await response.json();
                    let errorMessage = "❌ حدث خطأ أثناء الإرسال. يرجى التأكد من تعبئة جميع الحقول.";
                    if (responseData.errors) {
                        errorMessage += responseData.errors.map(error => ` (${error.message})`).join('');
                    }
                    formStatusMessage.textContent = errorMessage;
                    formStatusMessage.className = 'error';
                    formStatusMessage.style.display = 'block';
                }
            } catch (error) {
                // Hide loading state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                formStatusMessage.textContent = "❌ خطأ في الاتصال بالشبكة. يرجى المحاولة لاحقاً.";
                formStatusMessage.className = 'error';
                formStatusMessage.style.display = 'block';
                console.error('Submission error:', error);
            }
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formStatusMessage.style.display = 'none';
            }, 5000);
        });
    }

});


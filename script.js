// ===================================
// NAVIGATION & MOBILE MENU
// =================================== 
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
});

// ===================================
// ATTRACTION DETAIL PAGES
// ===================================
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show attractions page
    const attractionsPage = document.querySelector('.attractions-page');
    if (attractionsPage) {
        attractionsPage.style.display = 'block';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAttractionDetail(attractionId) {
    // Hide attractions page
    const attractionsPage = document.querySelector('.attractions-page');
    if (attractionsPage) {
        attractionsPage.style.display = 'none';
    }

    // Hide all detail pages
    const detailPages = document.querySelectorAll('.attraction-detail');
    detailPages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    // Show selected detail page
    const selectedDetail = document.getElementById(attractionId + '-detail');
    if (selectedDetail) {
        selectedDetail.classList.add('active');
        selectedDetail.style.display = 'block';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// BOOKING SYSTEM
// ===================================
function bookAttraction(attractionName, attractionId) {
    // Create booking modal or redirect to booking page
    const confirmed = confirm(
        `You're about to book: ${attractionName}\n\n` +
        `This will redirect you to our secure booking system.\n\n` +
        `Continue?`
    );

    if (confirmed) {
        // In a real implementation, this would:
        // 1. Redirect to a booking page with the attraction ID
        // 2. Open a booking modal
        // 3. Integrate with a booking API
        
        // For demo purposes, show a success message
        alert(
            `Booking initiated for: ${attractionName}\n\n` +
            `In a production environment, you would be redirected to:\n` +
            `- A secure payment gateway\n` +
            `- A booking form with date/time selection\n` +
            `- Integration with availability calendar\n\n` +
            `For now, please contact us at:\n` +
            `📧 bookings@italytravel.com\n` +
            `📞 +39 06 1234 5678`
        );

        // Optionally redirect to contact page
        // window.location.href = 'contact.html?booking=' + encodeURIComponent(attractionName);
    }
}

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            inquiryType: document.getElementById('inquiry-type').value,
            destination: document.getElementById('destination').value,
            travelDate: document.getElementById('travel-date').value,
            travelers: document.getElementById('travelers').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };

        // Validate required fields
        if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // In a real implementation, this would send data to a server
        // For demo purposes, simulate success
        console.log('Form submitted:', formData);

        // Show success message
        showFormMessage(
            'Thank you for contacting us! We\'ll get back to you within 24 hours.',
            'success'
        );

        // Reset form
        contactForm.reset();

        // In production, you would send this to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            showFormMessage('Thank you! We\'ll contact you soon.', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showFormMessage('Sorry, something went wrong. Please try again.', 'error');
        });
        */
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// ===================================
// LIVE CHAT (PLACEHOLDER)
// ===================================
function startLiveChat() {
    alert(
        'Live Chat Feature\n\n' +
        'In a production environment, this would open a live chat widget.\n\n' +
        'For now, please contact us via:\n' +
        '📧 Email: info@italytravel.com\n' +
        '📞 Phone: +39 06 1234 5678\n\n' +
        'Or use the contact form to send us a message!'
    );

    // In production, this would integrate with services like:
    // - Intercom
    // - Zendesk Chat
    // - LiveChat
    // - Drift
    // - Tawk.to
}

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// SCROLL TO TOP ON PAGE LOAD
// ===================================
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// FORM INPUT VALIDATION FEEDBACK
// ===================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#dc3545';
        } else if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        } else if (this.value) {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#c41e3a';
    });
});

// ===================================
// NEWSLETTER SUBSCRIPTION
// ===================================
function subscribeNewsletter(email) {
    if (!email) {
        alert('Please enter your email address');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // In production, send to backend
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');

    /* Production code:
    fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for subscribing!');
    })
    .catch(error => {
        alert('Error subscribing. Please try again.');
    });
    */
}

// ===================================
// CHECK URL PARAMETERS FOR BOOKING
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingParam = urlParams.get('booking');
    
    if (bookingParam) {
        // Pre-fill the inquiry type in contact form
        const inquiryTypeSelect = document.getElementById('inquiry-type');
        if (inquiryTypeSelect) {
            inquiryTypeSelect.value = 'booking';
        }

        // Pre-fill the destination
        const destinationInput = document.getElementById('destination');
        if (destinationInput) {
            destinationInput.value = decodeURIComponent(bookingParam);
        }

        // Pre-fill message
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = `I would like to book: ${decodeURIComponent(bookingParam)}\n\nPlease provide more information about availability and pricing.`;
        }

        // Scroll to form
        setTimeout(() => {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    }
});

// ===================================
// PRINT FUNCTIONALITY (FOR ITINERARIES)
// ===================================
function printPage() {
    window.print();
}

// ===================================
// SHARE FUNCTIONALITY
// ===================================
function shareAttraction(attractionName, attractionUrl) {
    if (navigator.share) {
        navigator.share({
            title: attractionName,
            text: `Check out ${attractionName} on Italy Travel!`,
            url: attractionUrl || window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        const tempInput = document.createElement('input');
        tempInput.value = attractionUrl || window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard!');
    }
}

// ===================================
// FAVORITE/WISHLIST FUNCTIONALITY
// ===================================
function toggleFavorite(attractionId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(attractionId)) {
        favorites = favorites.filter(id => id !== attractionId);
        alert('Removed from favorites');
    } else {
        favorites.push(attractionId);
        alert('Added to favorites!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteUI(attractionId);
}

function updateFavoriteUI(attractionId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const heartIcon = document.querySelector(`[data-attraction-id="${attractionId}"] .favorite-icon`);
    
    if (heartIcon) {
        heartIcon.textContent = favorites.includes(attractionId) ? '❤️' : '🤍';
    }
}

// ===================================
// CURRENCY CONVERTER (PLACEHOLDER)
// ===================================
function convertCurrency(amount, from, to) {
    // In production, use a real currency API
    const rates = {
        'EUR': 1,
        'USD': 1.10,
        'GBP': 0.86,
        'JPY': 158.50
    };
    
    const converted = amount * (rates[to] / rates[from]);
    return converted.toFixed(2);
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
console.log('Italy Travel website loaded successfully!');
console.log('For booking inquiries: bookings@italytravel.com');

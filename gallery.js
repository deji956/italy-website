// ===================================
// GALLERY FILTERING 
// =================================== 
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
});

// ===================================
// LIGHTBOX FUNCTIONALITY
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let visibleImages = [];

// Get all gallery images and add click listeners
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    img.addEventListener('click', function() {
        openLightbox(index);
    });
});

function openLightbox(index) {
    // Get all visible gallery items
    visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
        .filter(item => item.style.display !== 'none' && item.style.opacity !== '0');
    
    currentImageIndex = visibleImages.findIndex(item => 
        Array.from(document.querySelectorAll('.gallery-item')).indexOf(item) === index
    );
    
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    showImage(currentImageIndex);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function showImage(index) {
    if (visibleImages.length === 0) return;
    
    const item = visibleImages[index];
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    if (overlay) {
        const title = overlay.querySelector('h3').textContent;
        const location = overlay.querySelector('p').textContent;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br>${location}`;
    }
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage(currentImageIndex);
}

// Event listeners for lightbox controls
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
}

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// ===================================
// LOAD MORE FUNCTIONALITY
// ===================================
const loadMoreBtn = document.querySelector('.btn-load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // In a real implementation, this would load more images from the server
        alert(
            'Load More Feature\n\n' +
            'In a production environment, this would:\n' +
            '- Fetch additional images from the database\n' +
            '- Use pagination or infinite scroll\n' +
            '- Optimize image loading with lazy loading\n\n' +
            'For this demo, all photos are already displayed!'
        );
        
        // Hide the button after clicking (in demo)
        this.style.display = 'none';
    });
}

// ===================================
// LAZY LOADING FOR GALLERY IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image loading animation
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                }, 100);
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.gallery-item img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// IMAGE HOVER EFFECTS
// ===================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });

    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

console.log('Gallery functionality loaded successfully!');

// Cache for preloaded images
const imageCache = {};

// Aggressively preload all gallery images immediately
window.addEventListener('load', function() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    const bgImage = card.style.backgroundImage;
    const imageUrl = bgImage.slice(5, -2);
    if (!imageCache[imageUrl]) {
      const img = new Image();
      img.src = imageUrl;
      imageCache[imageUrl] = img;
    }
  });
});

// Lightbox functions
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const spinner = document.getElementById('lightbox-spinner');
  
  // Show lightbox immediately
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Show spinner, hide image
  spinner.style.display = 'block';
  lightboxImg.classList.remove('loaded');
  
  // Use cached image if available, otherwise load
  if (imageCache[imageSrc] && imageCache[imageSrc].complete) {
    lightboxImg.src = imageSrc;
    spinner.style.display = 'none';
    lightboxImg.classList.add('loaded');
  } else {
    lightboxImg.onload = function() {
      spinner.style.display = 'none';
      lightboxImg.classList.add('loaded');
    };
    lightboxImg.src = imageSrc;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const spinner = document.getElementById('lightbox-spinner');
  
  // Hide immediately
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  // Clear image after a brief delay to allow fade-out
  setTimeout(function() {
    lightboxImg.src = '';
    lightboxImg.classList.remove('loaded');
    spinner.style.display = 'none';
  }, 100);
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the navbar collapse element
  var navbarCollapse = document.getElementById('navbarNav');
  var navbarToggler = document.querySelector('.navbar-toggler');
  var bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
  
  // Add click event listeners to all nav links
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992) { // Only execute on mobile/tablet
        bsCollapse.hide();
      }
    });
  });
  
  // Close navbar when clicking outside
  document.addEventListener('click', function(event) {
    var isNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
    if (!isNavbar && navbarCollapse.classList.contains('show') && window.innerWidth < 992) {
      bsCollapse.hide();
    }
  });
});
/**
 * Global Carousel Manager for Blog Posts
 * Auto-detects and initializes all carousels on the page
 */
class CarouselManager {
  constructor() {
    this.carousels = new Map();
    this.init();
  }

  init() {
    // Handle both initial load and dynamic content
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.findAndInitializeCarousels());
    } else {
      this.findAndInitializeCarousels();
    }
  }

  findAndInitializeCarousels() {
    const containers = document.querySelectorAll('.carousel-container[data-carousel-id]');
    containers.forEach(container => {
      const carouselId = container.dataset.carouselId;
      this.createCarousel(container, carouselId);
    });
  }

  createCarousel(container, carouselId) {
    // Count slides
    const slidesContainer = container.querySelector('.carousel-slides');
    if (!slidesContainer) {
      console.warn(`Carousel ${carouselId}: .carousel-slides not found`);
      return;
    }

    const slides = slidesContainer.querySelectorAll('img');
    const totalSlides = slides.length;

    if (totalSlides === 0) {
      console.warn(`Carousel ${carouselId}: No images found`);
      return;
    }

    // Mark single-slide carousels (will hide controls via CSS)
    if (totalSlides === 1) {
      container.setAttribute('data-single-slide', 'true');
    }

    // Inject controls
    this.injectNavigationButtons(container, carouselId);
    this.injectIndicators(container, carouselId, totalSlides);

    // Store state
    this.carousels.set(carouselId, {
      currentSlide: 0,
      totalSlides: totalSlides,
      container: container,
      slidesContainer: slidesContainer
    });

    // Attach event listeners
    this.attachEventListeners(container, carouselId);
  }

  injectNavigationButtons(container, carouselId) {
    // Find the wrapper to position buttons relative to it
    const wrapper = container.querySelector('.carousel-wrapper');
    if (!wrapper) return;

    // Create prev button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.addEventListener('click', () => this.moveCarousel(carouselId, -1));

    // Create next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.innerHTML = '›';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.addEventListener('click', () => this.moveCarousel(carouselId, 1));

    // Insert buttons after wrapper
    wrapper.parentNode.insertBefore(prevBtn, wrapper.nextSibling);
    wrapper.parentNode.insertBefore(nextBtn, wrapper.nextSibling);
  }

  injectIndicators(container, carouselId, totalSlides) {
    // Create indicators container
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.className = 'carousel-indicators';

    // Create indicator buttons
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.className = 'indicator' + (i === 0 ? ' active' : '');
      indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
      indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      indicator.addEventListener('click', () => this.goToSlide(carouselId, i));
      indicatorsDiv.appendChild(indicator);
    }

    // Insert before caption (if exists) or at end
    const caption = container.querySelector('.carousel-caption');
    if (caption) {
      container.insertBefore(indicatorsDiv, caption);
    } else {
      container.appendChild(indicatorsDiv);
    }
  }

  attachEventListeners(container, carouselId) {
    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    container.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      const threshold = 50;

      if (startX - endX > threshold) this.moveCarousel(carouselId, 1);  // Swipe left
      if (endX - startX > threshold) this.moveCarousel(carouselId, -1); // Swipe right
    });

    // Keyboard navigation
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.moveCarousel(carouselId, -1);
      if (e.key === 'ArrowRight') this.moveCarousel(carouselId, 1);
    });

    // Make container focusable for keyboard navigation
    container.setAttribute('tabindex', '0');
  }

  moveCarousel(carouselId, direction) {
    const carousel = this.carousels.get(carouselId);
    if (!carousel) return;

    carousel.currentSlide += direction;

    // Wrap around
    if (carousel.currentSlide < 0) {
      carousel.currentSlide = carousel.totalSlides - 1;
    }
    if (carousel.currentSlide >= carousel.totalSlides) {
      carousel.currentSlide = 0;
    }

    this.updateCarousel(carouselId);
  }

  goToSlide(carouselId, index) {
    const carousel = this.carousels.get(carouselId);
    if (!carousel) return;

    carousel.currentSlide = index;
    this.updateCarousel(carouselId);
  }

  updateCarousel(carouselId) {
    const carousel = this.carousels.get(carouselId);
    if (!carousel) return;

    const { currentSlide, slidesContainer, container } = carousel;

    // Update transform
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update indicators
    const indicators = container.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
      indicator.setAttribute('aria-selected', index === currentSlide ? 'true' : 'false');
    });
  }
}

// Initialize global carousel manager
const carouselManager = new CarouselManager();

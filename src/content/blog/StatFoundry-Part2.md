---
title: "StatFoundry - Part 2 - Peyton Manning is the Meanest QB in the NFL"
description: "How AI transformed my dusty stats scraper into something actually useful, and what Peyton Manning taught me about data analysis"
pubDate: 2025-08-25
author: "Ben"
tags: ["Football","NFL","Labs", "AI", "ChatGPT", "Technical","StatFoundry","Development"]
image: "/images/blog/StatFoundryPartTwo/fforacle1.png"
---

<style>
  .carousel-container {
    position: relative;
    max-width: 800px;
    margin: 2rem auto;
  }

  .carousel-wrapper {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .carousel-slides {
    display: flex;
    transition: transform 0.3s ease;
  }

  .carousel-slides img {
    width: 100%;
    flex-shrink: 0;
    display: block;
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    z-index: 10;
    transition: background-color 0.2s ease;
  }

  .carousel-btn:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .carousel-prev {
    left: 10px;
  }

  .carousel-next {
    right: 10px;
  }

  .carousel-indicators {
    text-align: center;
    margin-top: 1rem;
  }

  .indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #ccc;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;
  }

  .indicator:hover {
    background: #999;
  }

  .indicator.active {
    background: #007acc;
  }
</style>

<div class="carousel-container" id="fforacle-carousel">
  <div class="carousel-wrapper">
    <div class="carousel-slides">
      <img src="/images/blog/StatFoundryPartTwo/fforacle1.png" alt="FF Oracle Screenshot 1" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle2.png" alt="FF Oracle Screenshot 2" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle3.png" alt="FF Oracle Screenshot 3" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle4.png" alt="FF Oracle Screenshot 4" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle5.png" alt="FF Oracle Screenshot 5" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle6.png" alt="FF Oracle Screenshot 6" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle7.png" alt="FF Oracle Screenshot 7" />
    </div>
  </div>

  <button class="carousel-btn carousel-prev" onclick="moveCarousel('fforacle', -1)" aria-label="Previous image">‹</button>
  <button class="carousel-btn carousel-next" onclick="moveCarousel('fforacle', 1)" aria-label="Next image">›</button>

  <div class="carousel-indicators">
    <button class="indicator active" onclick="goToSlide('fforacle', 0)" aria-label="Go to slide 1"></button>
    <button class="indicator" onclick="goToSlide('fforacle', 1)" aria-label="Go to slide 2"></button>
    <button class="indicator" onclick="goToSlide('fforacle', 2)" aria-label="Go to slide 3"></button>
    <button class="indicator" onclick="goToSlide('fforacle', 3)" aria-label="Go to slide 4"></button>
    <button class="indicator" onclick="goToSlide('fforacle', 4)" aria-label="Go to slide 5"></button>
    <button class="indicator" onclick="goToSlide('fforacle', 5)" aria-label="Go to slide 6"></button>
    <button class="indicator" onclick="goToSlide('fforacle', 6)" aria-label="Go to slide 7"></button>
  </div>
</div>

### The Renaissance: Enter ChatGPT

After years of my Fantasy Football Stat Factory collecting digital dust, something remarkable happened in late 2022. ChatGPT burst onto the scene, and like many developers, I immediately started thinking about how to breathe new life into old projects.

The timing was perfect. My graph database full of NFL stats was sitting there, dormant but intact, just waiting for someone (or something) to make sense of it all.

### The Experiment: FF Oracle

What if I could combine the natural language processing power of ChatGPT with my existing stats database? The idea was simple but powerful: let users ask questions about NFL stats in plain English and get meaningful, data-driven answers.

And so FF Oracle was born.

*[Content continues here...]*

### Why Peyton Manning is the Meanest QB

One of the first queries I tested on FF Oracle revealed something fascinating about Peyton Manning's career statistics that perfectly illustrates the power of AI-assisted data analysis...

### User Research: What Do People Actually Want?

Before diving deeper into the technical implementation, I wanted to understand what users were really looking for when it came to NFL stats. So I conducted some informal user research to better understand the pain points.

<div class="carousel-container" id="survey-carousel">
  <div class="carousel-wrapper">
    <div class="carousel-slides">
      <img src="/images/blog/StatFoundryPartTwo/why are you looking up stats.PNG" alt="Why are you looking up stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/what king of stats.PNG" alt="What kind of stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/How do you get your stats.PNG" alt="How do you get your stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/how easy is it to find stats.PNG" alt="How easy is it to find stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/how easy results1.PNG" alt="Survey results showing difficulty finding stats" />
      <img src="/images/blog/StatFoundryPartTwo/how easy is it avg.jpeg" alt="Average difficulty score for finding stats" />
      <img src="/images/blog/StatFoundryPartTwo/how easy results2.PNG" alt="Additional survey results" />
    </div>
  </div>

  <button class="carousel-btn carousel-prev" onclick="moveCarousel('survey', -1)" aria-label="Previous image">‹</button>
  <button class="carousel-btn carousel-next" onclick="moveCarousel('survey', 1)" aria-label="Next image">›</button>

  <div class="carousel-indicators">
    <button class="indicator active" onclick="goToSlide('survey', 0)" aria-label="Go to slide 1"></button>
    <button class="indicator" onclick="goToSlide('survey', 1)" aria-label="Go to slide 2"></button>
    <button class="indicator" onclick="goToSlide('survey', 2)" aria-label="Go to slide 3"></button>
    <button class="indicator" onclick="goToSlide('survey', 3)" aria-label="Go to slide 4"></button>
    <button class="indicator" onclick="goToSlide('survey', 4)" aria-label="Go to slide 5"></button>
    <button class="indicator" onclick="goToSlide('survey', 5)" aria-label="Go to slide 6"></button>
    <button class="indicator" onclick="goToSlide('survey', 6)" aria-label="Go to slide 7"></button>
  </div>
</div>

The results were eye-opening. Most people found it surprisingly difficult to find the specific NFL stats they were looking for, despite the abundance of sports websites available.

*[Rest of the blog content to be written...]*

<script>
// Carousel state management
const carousels = {
  fforacle: { currentSlide: 0, totalSlides: 7 },
  survey: { currentSlide: 0, totalSlides: 7 }
};

function moveCarousel(carouselId, direction) {
  const carousel = carousels[carouselId];
  carousel.currentSlide += direction;
  
  if (carousel.currentSlide < 0) {
    carousel.currentSlide = carousel.totalSlides - 1;
  }
  if (carousel.currentSlide >= carousel.totalSlides) {
    carousel.currentSlide = 0;
  }
  
  updateCarousel(carouselId);
}

function goToSlide(carouselId, index) {
  carousels[carouselId].currentSlide = index;
  updateCarousel(carouselId);
}

function updateCarousel(carouselId) {
  const container = document.getElementById(carouselId + '-carousel');
  const slides = container.querySelector('.carousel-slides');
  const indicators = container.querySelectorAll('.indicator');
  const currentSlide = carousels[carouselId].currentSlide;
  
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

// Touch/swipe support
document.addEventListener('DOMContentLoaded', function() {
  const carouselContainers = document.querySelectorAll('.carousel-container');
  
  carouselContainers.forEach(container => {
    let startX = 0;
    let endX = 0;
    const carouselId = container.id.replace('-carousel', '');
    
    container.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      const threshold = 50;
      
      if (startX - endX > threshold) moveCarousel(carouselId, 1);  // Swipe left
      if (endX - startX > threshold) moveCarousel(carouselId, -1); // Swipe right
    });
    
    // Keyboard navigation
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') moveCarousel(carouselId, -1);
      if (e.key === 'ArrowRight') moveCarousel(carouselId, 1);
    });
  });
});
</script>
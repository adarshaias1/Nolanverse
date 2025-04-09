document.addEventListener('DOMContentLoaded', function() {
  // Enhanced quotes rotation
  const quotes = document.querySelectorAll('#quotes .quote-box');
  let index = 0;
  quotes[0].classList.add('active');

  function rotateQuotes() {
    const currentQuote = quotes[index];
    const nextIndex = (index + 1) % quotes.length;
    const nextQuote = quotes[nextIndex];

    // Fade out current quote
    currentQuote.style.animation = 'fadeOut 0.5s forwards';
    currentQuote.classList.remove('active');

    // Fade in next quote
    setTimeout(() => {
      nextQuote.style.animation = 'fadeIn 0.5s forwards';
      nextQuote.classList.add('active');
      index = nextIndex;
    }, 500);

    setTimeout(rotateQuotes, 5000);
  }

  setTimeout(rotateQuotes, 5000);

  // Recommendation cycle
  const movieRecommendations = [
    {
      title: "The Prestige",
      category: "Mystery/Thriller",
      rating: "8.5/10",
      year: "2006"
    },
    {
      title: "Inception",
      category: "Sci-Fi/Action",
      rating: "8.8/10",
      year: "2010"
    },
    {
      title: "Interstellar",
      category: "Sci-Fi/Adventure",
      rating: "8.6/10",
      year: "2014"
    },
    // ...add more movies with details
  ];

  const recommendationBox = document.querySelector('.recommendation-box');
  let currentIndex = 0;

  function updateRecommendation(movie) {
    recommendationBox.innerHTML = `
      <div class="movie-card">
        <h3>${movie.title}</h3>
        <div class="movie-details">
          <span class="category">${movie.category}</span>
          <span class="rating">⭐ ${movie.rating}</span>
          <span class="year">${movie.year}</span>
        </div>
      </div>
    `;
  }

  function cycleMovieRecommendations() {
    recommendationBox.classList.add('fade');
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % movieRecommendations.length;
      updateRecommendation(movieRecommendations[currentIndex]);
      
      recommendationBox.classList.remove('fade');
      recommendationBox.classList.add('glow');
      
      setTimeout(() => {
        recommendationBox.classList.remove('glow');
      }, 2000);
    }, 500);
  }

  setInterval(cycleMovieRecommendations, 3000);

  // Toggle video mute/unmute on click
  const video = document.getElementById('bg-video');
  video.muted = true; // Start muted to comply with browser policies
  video.addEventListener('click', function() {
    video.muted = !video.muted;
  });

  const videoControls = document.createElement('div');
  videoControls.className = 'video-controls';
  
  videoControls.innerHTML = `
    <button class="mute-btn">
      <i class="fas fa-volume-mute"></i>
    </button>
    <button class="pause-btn">
      <i class="fas fa-pause"></i>
    </button>
  `;

  video.parentElement.appendChild(videoControls);

  // Video controls functionality
  const muteBtn = videoControls.querySelector('.mute-btn');
  const pauseBtn = videoControls.querySelector('.pause-btn');

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? 
      '<i class="fas fa-volume-mute"></i>' : 
      '<i class="fas fa-volume-up"></i>';
  });

  pauseBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  // Observe elements
  document.querySelectorAll('.service-box, .quote-box, .news-card').forEach(el => {
    observer.observe(el);
  });

  const quoteElements = document.querySelectorAll('.quote-box');
  const quoteNav = document.querySelector('.quote-nav');
  let currentQuote = 0;
  
  // Create navigation dots
  quoteElements.forEach((_, index) => {
      const button = document.createElement('button');
      button.addEventListener('click', () => showQuote(index));
      quoteNav.appendChild(button);
  });
  
  const navButtons = quoteNav.querySelectorAll('button');
  
  function showQuote(index) {
      quoteElements.forEach((quote, i) => {
          quote.classList.remove('active', 'inactive');
          if (i < index) {
              quote.classList.add('inactive');
          } else if (i > index) {
              quote.classList.add('next');
          }
      });
      
      quoteElements[index].classList.add('active');
      
      // Update navigation dots
      navButtons.forEach((btn, i) => {
          btn.classList.toggle('active', i === index);
      });
      
      currentQuote = index;
  }
  
  // Auto-advance quotes
  function autoAdvance() {
      let nextQuote = currentQuote + 1;
      if (nextQuote >= quotes.length) {
          nextQuote = 0;
      }
      showQuote(nextQuote);
  }
  
  // Show first quote initially
  showQuote(0);
  
  // Auto-advance every 5 seconds
  setInterval(autoAdvance, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const quotes = document.querySelectorAll('.quote-box');
    let currentQuote = 0;

    // Hide all quotes except first
    quotes.forEach((quote, index) => {
        if (index !== 0) quote.style.display = 'none';
    });

    // Show next quote every 5 seconds
    setInterval(() => {
        quotes[currentQuote].style.display = 'none';
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].style.display = 'block';
    }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
  const quotes = document.getElementById('quotes');
  const socialLinks = document.querySelectorAll('.social-links a');

  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const color = link.getAttribute('data-color');
      quotes.style.background = `linear-gradient(135deg, #000000 0%, ${color} 100%)`;
    });

    link.addEventListener('mouseleave', () => {
      quotes.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.content');
    const slides = document.querySelectorAll('.service-box');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const slidesToShow = window.innerWidth < 768 ? 1 : 3;
    const slideWidth = slides[0].offsetWidth + 30; // Including gap
    
    // Initialize
    updateSliderPosition();
    updateButtonStates();
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSliderPosition();
        updateButtonStates();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, slides.length - slidesToShow);
        updateSliderPosition();
        updateButtonStates();
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSliderPosition();
        updateButtonStates();
    });
    
    function updateSliderPosition() {
        const translateX = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
    }
    
    function updateButtonStates() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    // Optional: Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < slides.length - slidesToShow) {
                // Swipe left
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right
                currentIndex--;
            }
            updateSliderPosition();
            updateButtonStates();
        }
    }
});
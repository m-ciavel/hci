document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.hamburger').addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('active');
  });

  window.addEventListener("scroll", () => {
    // Check if the viewport width is greater than 768px (not mobile)
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById("side");
        const footer = document.querySelector("footer");
        const footerRect = footer.getBoundingClientRect();
        const sidebarHeight = sidebar.offsetHeight;

        // Get the current scroll position
        const scrollPosition = window.scrollY;

        // When the footer starts appearing in the viewport
        if (footerRect.top < window.innerHeight && scrollPosition + sidebarHeight > footerRect.top) {
            // Adjust the sidebar to be just above the footer
            sidebar.style.top = `${footerRect.top - sidebarHeight}px`;
        } else {
            // Reset sidebar to its fixed position
            sidebar.style.position = "fixed";
            sidebar.style.top = "0";
        }
    }
});

  window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
          const sidebar = document.getElementById('side');
          sidebar.style.position = 'fixed';
          sidebar.style.bottom = '0';
          sidebar.style.top = 'unset';
      }
  });

  document.getElementById('location-icon').addEventListener('click', function() {
    // Open Google Maps with the location of Batangas State University - Alangilan Campus
    const locationUrl = "https://www.google.com/maps/search/?api=1&query=Batangas+State+University+Alangilan+Campus";
    window.open(locationUrl, '_blank'); // Open in a new tab
  });

  document.getElementById('email-icon').addEventListener('click', function() {
    // Open the default email client with a pre-defined email address
    const email = "dummy@gmail.com"; // Replace with your email address
    const subject = "Subject Here"; // Optional subject
    const body = "Body of the email here."; // Optional body
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl; // Open the email client
  });

  document.getElementById('phone-icon').addEventListener('click', function() {
    const phoneNumber = document.getElementById('contact-number').innerText; // Get the phone number from the footer

    // Check if the user is on a mobile device
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // On mobile, open the contacts app
        window.location.href = `tel:${phoneNumber}`; // This will open the dialer with the number
    } else {
        // On desktop, highlight the phone number in the footer
        const phoneElement = document.getElementById('contact-number');
        const range = document.createRange();
        range.selectNodeContents(phoneElement);
        const selection = window.getSelection();
        selection.removeAllRanges(); // Clear any existing selections
        selection.addRange(range); // Highlight the phone number
    }
  });


  //index.html
  let slideIndex = 1;
    showSlides(slideIndex);

    // Function to go to the next or previous slide
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Function to set the current slide
    window.setCurrentSlide = function(n) { // Make it globally accessible
        showSlides(slideIndex = n);
    };

  function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");

      if (slides.length === 0) {
        console.error("No slides found.");
        return; // Exit the function if no slides are present
    }

      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";  
      dots[slideIndex - 1].className += " active";
  }

      // Gallery functionality
      let currentIndex = 0; // Start with the first set of cards
      const cards = document.querySelectorAll('#gallerycontainer .card');
      const galleryDots = document.querySelectorAll('#carouseldotcontainer .carouseldot');
      const cardsPerSet = 4; // Number of cards to display at once
  
      function showCards(index) {
          const start = index * cardsPerSet;
          const end = start + cardsPerSet;
  
          // Hide all cards
          cards.forEach((card, i) => {
              card.style.display = (i >= start && i < end) ? 'block' : 'none';
          });
  
          // Remove active class from all dots
          galleryDots.forEach((dot, i) => {
              dot.classList.remove('active');
          });
  
          // Set the active dot
          if (index < galleryDots.length) {
              galleryDots[index].classList.add('active');
          }
      }
  
      // Function to set the current set of cards based on the dot clicked
      window.setCurrentCard = function(index) { // Make it globally accessible
        currentIndex = index - 1; // Adjust for zero-based index
        showCards(currentIndex);
    };
  
      // Add event listeners to the dots for the slideshow
      const slideshowDots = document.querySelectorAll('#dotcontainer .dot');
      slideshowDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              setCurrentSlide(index + 1); // Call setCurrentSlide with the index of the dot
          });
      });
  
      // Add event listeners to the dots for the gallery
      galleryDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              setCurrentCard(index + 1); // Call setCurrentCard with the index of the dot
          });
      });
  
      // Function to handle category button clicks
      function handleCategoryClick(category) {
          // Remove active class from all category buttons
          document.querySelectorAll('.categorybtn').forEach(btn => {
              btn.classList.remove('active');
          });
  
          // Add active class to the clicked button
          document.getElementById(category).classList.add('active');
  
          // Get the gallery container
          const galleryContainer = document.getElementById('gallerycontainer');
  
          // Change layout based on the selected category
          if (category === 'bestsellers') {
              galleryContainer.classList.add('row-reverse'); // Add row-reverse class
          } else {
              galleryContainer.classList.remove('row-reverse'); // Remove row-reverse class
          }
      }
  
      // Add event listeners to category buttons
      const newArrivalButton = document.getElementById('new-arrival');
      const bestsellersButton = document.getElementById('bestsellers');
  
      if (newArrivalButton) {
          newArrivalButton.addEventListener('click', () => handleCategoryClick('new-arrival'));
      } else {
          console.error("Element with ID 'new-arrival' not found.");
      }
  
      if (bestsellersButton) {
          bestsellersButton.addEventListener('click', () => handleCategoryClick('bestsellers'));
      } else {
          console.error("Element with ID 'bestsellers' not found.");
      }
  
      // Initialize the gallery by showing the first set of cards
      showCards(currentIndex);
  });
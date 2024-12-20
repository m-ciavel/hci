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
    const email = "support@booknook.com"; // Replace with your email address
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
    window.plusSlides = function(n) {
        showSlides(slideIndex += n); // Adjust slide index
    };

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

      const toast = document.getElementById('toast');
      const modal = document.getElementById('cardDialog');
      const modalTitle = document.getElementById('modalTitle');
      const modalImage = document.getElementById('modalImage');
      const modalText = document.getElementById('modalText');
      const closeModal = document.querySelector('.close');
  
      // Show toast notification function (only one instance)
      function showToast(message) {
          toast.textContent = message;
          toast.className = 'toast show';
          setTimeout(() => {
              toast.className = 'toast'; // Hide after 3 seconds
          }, 3000);
      }
  
      // Open modal when card is clicked
      document.querySelectorAll('.card').forEach(card => {
          card.addEventListener('click', () => {
              const imgSrc = card.querySelector('img').src;
              const price = card.querySelector('p').textContent;
              const bookTitle = card.querySelector('img').alt;
              modalImage.src = imgSrc;  // Set the image source
              modalTitle.textContent = bookTitle;
              modalText.textContent = `Price: ${price}`; // Set the price text
              modal.style.display = 'flex';  // Show modal
          });
      });
  
      if (closeModal) {
          closeModal.addEventListener('click', () => modal.style.display = 'none');
      }
  
      window.addEventListener('click', event => {
          if (event.target === modal) modal.style.display = 'none';
      });
  
      // Heart and Cart Icon Click Handlers
      document.querySelectorAll('.wish').forEach(icon => {
          icon.addEventListener('click', (event) => {
              event.stopPropagation();
              showToast('Added to Wishlist <3');
          });
      });
  
      document.querySelectorAll('.addcart').forEach(icon => {
          icon.addEventListener('click', (event) => {
              event.stopPropagation();
              showToast('Added to Cart :)');
          });
      });
  
      // Handle trash icon click for wishlist item removal (ONLY TOAST, NO MODAL)
      document.querySelectorAll('.fa-trash').forEach((trashIcon) => {
          trashIcon.addEventListener('click', function(event) {
              event.stopPropagation(); // Prevent modal from being triggered by clicking trash icon
  
              // Optionally, remove the entire card from the DOM
              const card = event.target.closest('.card');
              if (card) {
                  card.remove(); // Remove the card from the DOM
              }
  
              // Show the toast notification for item removal
              showToast("Item removed from wishlist.");
          });
      });
  
      // FAQ questions toggle
      const faqQuestions = document.querySelectorAll('.faq-question');
      faqQuestions.forEach(function(question) {
          question.addEventListener('click', function() {
              const faqItem = question.closest('.faq-item');
              faqItem.classList.toggle('active');
          });
      });


      const cartItemsContainer = document.getElementById('cart-items');
      if (cartItemsContainer) {
          // Proceed with cart functionality
          cartItemsContainer.addEventListener('click', function(event) {
              if (event.target.classList.contains('remove-item')) {
                  const itemId = parseInt(event.target.getAttribute('data-id'));
                  removeItem(itemId);
              }
          });
  
          const totalPriceElement = document.getElementById('total-price');
          const checkoutButton = document.getElementById('checkout-button');
      
          // Mock cart data (could be retrieved from localStorage, API, etc.)
          const cart = [
              { id: 1, name: "The Invisible Life of Addie Larue", price: 9.99, quantity: 2, image: "assets/tiloal.jpg" },
              { id: 2, name: "The Song of Achilles", price: 9.99, quantity: 1, image: "assets/tsoa.jpg" },
              { id: 3, name: "Babel", price: 9.99, quantity: 3, image: "assets/babel.jpg" }
          ];
      
          // Function to update the cart UI
          function updateCart() {
              cartItemsContainer.innerHTML = '';
              let totalPrice = 0;
      
              cart.forEach(item => {
                  // Create cart item element
                  const itemElement = document.createElement('div');
                  itemElement.classList.add('cart-item');
      
                  itemElement.innerHTML = `
                      <img src="${item.image}" alt="${item.name}">
                      <div class="cart-item-details">
                          <p><strong>${item.name}</strong></p>
                          <p>Price: $${item.price.toFixed(2)}</p>
                          <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
                      </div>
                      <button class="remove-item" data-id="${item.id}">Remove</button>
                  `;
      
                  cartItemsContainer.appendChild(itemElement);
      
                  // Update total price
                  totalPrice += item.price * item.quantity;
              });
      
              totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
          }
      
          // Function to handle removal of cart item
          function removeItem(id) {
              const index = cart.findIndex(item => item.id === id);
              if (index !== -1) {
                  cart.splice(index, 1);
                  updateCart();
              }
          }
      
          // Function to update quantity of cart item
          function updateQuantity(id, quantity) {
              const item = cart.find(item => item.id === id);
              if (item) {
                  item.quantity = quantity;
                  updateCart();
              }
          }
      
          // Event listener for removing items
          cartItemsContainer.addEventListener('click', function(event) {
              if (event.target.classList.contains('remove-item')) {
                  const itemId = parseInt(event.target.getAttribute('data-id'));
                  removeItem(itemId);
              }
          });
      
          // Event listener for quantity change
          cartItemsContainer.addEventListener('input', function(event) {
              if (event.target.classList.contains('quantity-input')) {
                  const itemId = parseInt(event.target.getAttribute('data-id'));
                  const quantity = parseInt(event.target.value);
                  updateQuantity(itemId, quantity);
              }
          });
      
          // Handle checkout button click (for now, just a simple alert)
          checkoutButton.addEventListener('click', function() {
              alert('Proceeding to Checkout. Thank you for your purchase. Happy Reading!');
          });
      
          // Initialize the cart
          updateCart();
      }

      // Check if we're on the profile page
    if (window.location.pathname.includes('profile.html')) {
        // Only run profile-related script on the profile page

        // Handle the 'Edit Profile' button click
        document.getElementById('editProfileBtn').addEventListener('click', function() {
            // Hide the profile and show the edit form
            document.querySelector('.profile-container').style.display = 'none';
            document.getElementById('editProfileForm').style.display = 'block';
        });

        // Handle the profile form submission (optional - just an example)
        document.getElementById('profileForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting the traditional way

            // Get the updated profile data
            const updatedName = document.getElementById('name').value;
            const updatedEmail = document.getElementById('email').value;
            const updatedLocation = document.getElementById('location').value;

            // Update the profile section with the new details
            document.querySelector('.profile-details h2').textContent = updatedName;
            document.querySelector('.profile-details .user-email').textContent = updatedEmail;
            document.querySelector('.profile-details .user-location').textContent = updatedLocation;

            // Hide the edit form and show the profile again
            document.querySelector('.profile-container').style.display = 'block';
            document.getElementById('editProfileForm').style.display = 'none';
        });
    }

     

  });


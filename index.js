// Theme Toggle Logic
      const themeToggleBtn = document.getElementById("theme-toggle");
      const themeToggleIcon = document.getElementById("theme-toggle-icon");
      const themeToggleMobileBtn = document.getElementById(
        "theme-toggle-mobile"
      );
      const themeToggleMobileIcon = document.getElementById(
        "theme-toggle-icon-mobile"
      );

      // Function to set theme
      function setTheme(theme) {
        if (theme === "dark") {
          document.body.classList.add("dark-mode");
          themeToggleIcon.classList.replace("fa-moon", "fa-sun");
          themeToggleMobileIcon.classList.replace("fa-moon", "fa-sun");
          localStorage.setItem("theme", "dark");
        } else {
          document.body.classList.remove("dark-mode");
          themeToggleIcon.classList.replace("fa-sun", "fa-moon");
          themeToggleMobileIcon.classList.replace("fa-sun", "fa-moon");
          localStorage.setItem("theme", "light");
        }
      }

      // Check for saved theme on load
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Default to light mode
        setTheme("light");
      }

      // Toggle theme on button click
      themeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      });

      themeToggleMobileBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerOffset = document.querySelector("nav").offsetHeight; // Get dynamic header height
            const offsetPosition =
              targetElement.getBoundingClientRect().top +
              window.scrollY -
              headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
          // Close mobile menu if open
          const mobileMenu = document.getElementById("mobile-menu");
          const mobileMenuOverlay = document.getElementById(
            "mobile-menu-overlay"
          );
          if (!mobileMenu.classList.contains("translate-x-full")) {
            mobileMenu.classList.add("translate-x-full");
            mobileMenuOverlay.classList.add("hidden");
            document.body.style.overflow = ""; // Re-enable scrolling
          }
        });
      });

      // Mobile menu toggle
      const mobileMenuButton = document.getElementById("mobile-menu-button");
      const closeMobileMenuButton =
        document.getElementById("close-mobile-menu");
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
        mobileMenuOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Disable scrolling on body
      });

      closeMobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
        mobileMenuOverlay.classList.add("hidden");
        document.body.style.overflow = ""; // Re-enable scrolling
      });

      mobileMenuOverlay.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
        mobileMenuOverlay.classList.add("hidden");
        document.body.style.overflow = ""; // Re-enable scrolling
      });

      // Dynamically set the current year for the copyright notice
      document.getElementById("currentYear").textContent =
        new Date().getFullYear();

      // Optional: Add active class to nav links on scroll
      const sections = document.querySelectorAll("main section");
      const navLinks = document.querySelectorAll(".nav-link");

      window.addEventListener("scroll", () => {
        let current = "";
        // Offset to account for fixed header and a bit more for visual comfort
        const offset = document.querySelector("nav").offsetHeight + 50;
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - offset;
          const sectionHeight = section.clientHeight;
          if (
            pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight
          ) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          // Remove active styles from all links
          link.classList.remove("font-bold", "text-primary");
          link.classList.add("font-medium", "text-lighttext");

          // Apply active styles to the current section's link
          if (link.getAttribute("href").includes(current)) {
            link.classList.add("font-bold", "text-primary");
            link.classList.remove("font-medium", "text-lighttext");
          }
        });

        // Back to top button visibility
        const backToTopButton = document.getElementById("back-to-top");
        if (window.scrollY > 300) {
          // Show button after scrolling 300px
          backToTopButton.classList.remove("invisible", "opacity-0");
          backToTopButton.classList.add("visible", "opacity-100");
        } else {
          backToTopButton.classList.remove("visible", "opacity-100");
          backToTopButton.classList.add("invisible", "opacity-0");
        }
      });

      // Back to top button click handler
      document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

    //   <!-- JS to clear form after submission -->    
      const form = document.getElementById('contact-form');
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop the default form submission
        const formData = new FormData(form);
        fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Thanks for your message!"); // Optional success message
              form.reset(); // Clear form
            } else {
              alert("Oops! There was a problem submitting your form.");
            }
          })
          .catch((error) => {
            alert("Oops! There was a problem submitting your form.");
          });
      });
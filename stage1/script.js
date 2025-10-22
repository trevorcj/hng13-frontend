document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
    });
  }
});

const timeEl = document.querySelector("[data-testid='test-user-time']");

if (timeEl) {
  const updateTime = function () {
    const currentTime = Date.now();
    timeEl.textContent = currentTime;
  };

  // Update on render
  updateTime();

  // Update time every second
  setInterval(updateTime, 1000);
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const successMessage = document.querySelector(
    "[data-testid='test-contact-success']"
  );

  const errorMessages = {
    name: document.querySelector("[data-testid='test-contact-error-name']"),
    email: document.querySelector("[data-testid='test-contact-error-email']"),
    subject: document.querySelector(
      "[data-testid='test-contact-error-subject']"
    ),
    message: document.querySelector(
      "[data-testid='test-contact-error-message']"
    ),
  };

  const showError = (field, message) => {
    const errorEl = errorMessages[field];
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
    const inputEl = document.getElementById(
      field === "name" ? "fullName" : field
    );
    if (inputEl) {
      inputEl.setAttribute("aria-invalid", "true");
    }
  };

  const clearError = (field) => {
    const errorEl = errorMessages[field];
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
    const inputEl = document.getElementById(
      field === "name" ? "fullName" : field
    );
    if (inputEl) {
      inputEl.removeAttribute("aria-invalid");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let isValid = true;

    // Full Name Validation
    if (fullNameInput.value.trim() === "") {
      showError("name", "Full Name is required.");
      isValid = false;
    } else {
      clearError("name");
    }

    if (emailInput.value.trim() === "") {
      showError("email", "Email is required.");
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError("email");
    }

    if (subjectInput.value.trim() === "") {
      showError("subject", "Subject is required.");
      isValid = false;
    } else {
      clearError("subject");
    }

    if (messageInput.value.trim() === "") {
      showError("message", "Message is required.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError("message", "Message must be at least 10 characters long.");
      isValid = false;
    } else {
      clearError("message");
    }

    return isValid;
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    successMessage.classList.add("hidden");

    if (validateForm()) {
      successMessage.classList.remove("hidden");

      contactForm.reset();
      Object.keys(errorMessages).forEach(clearError);
    } else {
      successMessage.classList.add("hidden");
    }
  });

  fullNameInput.addEventListener("input", () => validateForm());
  emailInput.addEventListener("input", () => validateForm());
  subjectInput.addEventListener("input", () => validateForm());
  messageInput.addEventListener("input", () => validateForm());
}

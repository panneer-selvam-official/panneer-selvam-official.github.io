/* =========================================================
   PANNEER SELVAM M — PORTFOLIO SCRIPT
   Mobile nav, active link highlight, scroll reveal,
   back-to-top, contact form validation
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  // ---- Footer year ----
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById("navToggle");
  const navLinksEl = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    navLinksEl.classList.toggle("open");
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinksEl.classList.remove("open");
    });
  });

  // ---- Active nav link highlight on scroll ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightActiveLink() {
    let currentId = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 110;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  // ---- Scroll reveal animation ----
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // ---- Back to top button ----
  const backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- Scroll listeners (combined for performance) ----
  window.addEventListener("scroll", function () {
    highlightActiveLink();
    toggleBackToTop();
  });
  highlightActiveLink();
  toggleBackToTop();

  // ---- Contact form validation ----
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");

  function setError(fieldId, message) {
    const group = document.getElementById(fieldId).closest(".form-group");
    const errorEl = document.getElementById(fieldId + "Error");
    if (message) {
      group.classList.add("error");
      errorEl.textContent = message;
    } else {
      group.classList.remove("error");
      errorEl.textContent = "";
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    successMsg.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let valid = true;

    if (name.length < 2) {
      setError("name", "Please enter your name.");
      valid = false;
    } else {
      setError("name", "");
    }

    if (!isValidEmail(email)) {
      setError("email", "Please enter a valid email address.");
      valid = false;
    } else {
      setError("email", "");
    }

    if (subject.length < 3) {
      setError("subject", "Please enter a subject.");
      valid = false;
    } else {
      setError("subject", "");
    }

    if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      valid = false;
    } else {
      setError("message", "");
    }

    if (!valid) return;

    // NOTE: No backend is connected. Hook this up to a service like
    // Formspree, EmailJS, or your own API endpoint to actually send email.
    successMsg.textContent = "Thanks! This is a demo form — connect a backend or a service like Formspree/EmailJS to receive real messages.";
    form.reset();
  });

});

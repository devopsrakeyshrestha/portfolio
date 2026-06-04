const EXPERIENCE_START_YEAR = 2013;

const EMAILJS_PUBLIC_KEY = "rIFWAqkoGkeRVckn6";
const EMAILJS_SERVICE_ID = "service_wb09crv";
const EMAILJS_TEMPLATE_ID = "template_cnj33wg";

function getExperienceYears(startYear) {
  return `${Math.max(0, new Date().getFullYear() - startYear)}+`;
}

function updateExperienceYears() {
  document.querySelectorAll("[data-experience-start-year]").forEach((element) => {
    const startYear = Number(element.getAttribute("data-experience-start-year"));
    if (!Number.isNaN(startYear) && startYear > 0) {
      element.textContent = getExperienceYears(startYear);
    }
  });
}

function updateMetaDescription() {
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute(
      "content",
      `Rakesh Shrestha is a Cloud and DevOps Engineer with ${getExperienceYears(EXPERIENCE_START_YEAR)} years of experience in AWS, Azure, GCP, Kubernetes, Terraform, CI/CD, and security-first infrastructure.`,
    );
  }
}

function initFooterYear() {
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }
}

function initIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function initEmailJs() {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
}

function setMobileMenuOpen(isOpen) {
  const menu = document.getElementById("mobile-menu");
  const toggle = document.getElementById("mobile-menu-toggle");
  if (!menu || !toggle) return;

  menu.classList.toggle("hidden", !isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  setMobileMenuOpen(menu.classList.contains("hidden"));
}

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification-text");
  if (!notification || !notificationText) return;

  notificationText.textContent = message;

  if (type === "error") {
    notification.classList.remove("bg-green-500");
    notification.classList.add("bg-red-500");
  } else {
    notification.classList.remove("bg-red-500");
    notification.classList.add("bg-green-500");
  }

  notification.classList.remove("translate-y-24");
  window.setTimeout(() => {
    notification.classList.add("translate-y-24");
  }, 3000);
}

function setSubmittingState(isSubmitting) {
  const submitBtn = document.getElementById("button");
  const btnText = document.getElementById("btn-text");
  const btnIcon = document.getElementById("btn-icon");
  const btnSpinner = document.getElementById("btn-spinner");
  if (!submitBtn || !btnText || !btnIcon || !btnSpinner) return;

  submitBtn.disabled = isSubmitting;
  btnText.textContent = isSubmitting ? "Sending..." : "Send Email";
  btnIcon.classList.toggle("hidden", isSubmitting);
  btnSpinner.classList.toggle("hidden", !isSubmitting);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function onAnchorClick(event) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      setMobileMenuOpen(false);
    });
  });
}

function initSkillCardObserver() {
  if (prefersReducedMotion()) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  document.querySelectorAll(".skill-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("shadow-lg", window.scrollY > 50);
  });
}

function initContactForm() {
  const contactForm = document.getElementById("form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function onContactSubmit(event) {
    event.preventDefault();

    const honeypot = contactForm.querySelector('[name="website"]');
    if (honeypot && honeypot.value.trim() !== "") {
      showNotification("Message sent successfully.", "success");
      contactForm.reset();
      return;
    }

    if (typeof emailjs === "undefined") {
      showNotification(
        "Email service is unavailable. Please email contact@shrestha-rakesh.com.np directly.",
        "error",
      );
      return;
    }

    setSubmittingState(true);

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm).then(
      () => {
        setSubmittingState(false);
        showNotification("Message sent successfully.");
        contactForm.reset();
      },
      (err) => {
        setSubmittingState(false);
        showNotification(
          "Could not send your message. Please try again or email contact@shrestha-rakesh.com.np.",
          "error",
        );
        console.error("EmailJS error:", err);
      },
    );
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle?.addEventListener("click", toggleDarkMode);

  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    localStorage.setItem("theme", "dark");
  }
}

function initMobileMenu() {
  const toggle = document.getElementById("mobile-menu-toggle");
  toggle?.addEventListener("click", toggleMobileMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenuOpen(false);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateExperienceYears();
  updateMetaDescription();
  initFooterYear();
  initIcons();
  initEmailJs();
  initThemeToggle();
  initMobileMenu();
  initContactForm();
  initNavbarScroll();
  initSmoothScroll();
  initSkillCardObserver();
});

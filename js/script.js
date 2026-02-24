// Initialize Lucide icons.
lucide.createIcons();

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

updateExperienceYears();

const descriptionMeta = document.querySelector('meta[name="description"]');
if (descriptionMeta) {
  descriptionMeta.setAttribute(
    "content",
    `Rakesh Shrestha is a Cloud and DevOps Engineer with ${getExperienceYears(2013)} years of experience in AWS, Azure, GCP, Kubernetes, Terraform, CI/CD, and security-first infrastructure.`,
  );
}

// EmailJS configuration.
const EMAILJS_PUBLIC_KEY = "rIFWAqkoGkeRVckn6";
const EMAILJS_SERVICE_ID = "service_wb09crv";
const EMAILJS_TEMPLATE_ID = "template_cnj33wg";

(function initEmailJs() {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
  if (!savedTheme) {
    localStorage.setItem("theme", "dark");
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification-text");

  notificationText.textContent = message;

  if (type === "error") {
    notification.classList.remove("bg-green-500");
    notification.classList.add("bg-red-500");
  } else {
    notification.classList.remove("bg-red-500");
    notification.classList.add("bg-green-500");
  }

  notification.classList.remove("translate-y-24");
  setTimeout(() => {
    notification.classList.add("translate-y-24");
  }, 3000);
}

const contactForm = document.getElementById("form");
const submitBtn = document.getElementById("button");
const btnText = document.getElementById("btn-text");
const btnIcon = document.getElementById("btn-icon");
const btnSpinner = document.getElementById("btn-spinner");

function setSubmittingState(isSubmitting) {
  if (isSubmitting) {
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.classList.add("hidden");
    btnSpinner.classList.remove("hidden");
  } else {
    submitBtn.disabled = false;
    btnText.textContent = "Send Email";
    btnIcon.classList.remove("hidden");
    btnSpinner.classList.add("hidden");
  }
}

contactForm.addEventListener("submit", function onContactSubmit(event) {
  event.preventDefault();
  setSubmittingState(true);

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this).then(
    () => {
      setSubmittingState(false);
      showNotification("Message Sent Successfully");
      contactForm.reset();
    },
    (err) => {
      setSubmittingState(false);
      const authScopeError =
        "Gmail_API: Request had insufficient authentication scopes.";
      showNotification(authScopeError, "error");
      alert(authScopeError);
      console.error(authScopeError, err);
    },
  );
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function onAnchorClick(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      document.getElementById("mobile-menu").classList.add("hidden");
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

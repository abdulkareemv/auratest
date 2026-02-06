/* ===================== SELECT MODAL ELEMENTS ===================== */
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalDescription = document.getElementById("modalDescription");
const modalDate = document.getElementById("modalDate");
const modalTime = document.getElementById("modalTime");
const modalVenue = document.getElementById("modalVenue");
const eventModal = document.getElementById("eventModal");

/* ===================== OPEN MODAL ===================== */
function openEventModal(card) {

  /* ========== BASIC DETAILS ========== */
  modalTitle.innerText = card.dataset.title || "";
  modalType.innerText = card.dataset.type || "";
  modalDescription.innerText = card.dataset.description || "";
  modalDate.innerText = card.dataset.date || "";
  modalTime.innerText = card.dataset.time || "";
  modalVenue.innerText = card.dataset.venue || "";

/* ========== EVENT ICON ========== */

const modalIconBox = document.getElementById("modalIcon");
const iconClass = card.dataset.icon || "fa-calendar-alt";

modalIconBox.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;


  
  /* ========== RULES (NUMBERED) ========== */
  const rulesList = document.getElementById("modalRules");
  rulesList.innerHTML = "";
  if (card.dataset.rules) {
    card.dataset.rules
      .trim()
      .split("\n")
      .forEach(rule => {
        if (rule.trim()) {
          const li = document.createElement("li");
          li.textContent = rule.trim();
          rulesList.appendChild(li);
        }
      });
  }

  /* ========== PRIZES (DYNAMIC) ========== */
  const prizes = (card.dataset.prize || "").split(",");

  ["prize1","prize2","prize3"].forEach((id, index) => {
    const el = document.getElementById(id);
    el.innerText = prizes[index] ? `₹${prizes[index].trim()}` : "";
    el.parentElement.style.display = prizes[index] ? "block" : "none";
  });

  /* ========== COORDINATORS ================= */
  const staffBox = document.getElementById("modalStaffCoordinators");
  const studentBox = document.getElementById("modalStudentCoordinators");

  staffBox.innerHTML = "";
  studentBox.innerHTML = "";

  /* STAFF COORDINATORS */
  if (card.dataset.staff) {
    card.dataset.staff.split(",").forEach(entry => {
      entry = entry.trim();
      let name = entry;
      let mobile = "";

      if (entry.includes("-")) {
        const parts = entry.split("-");
        name = parts[0].trim();
        mobile = parts[1].trim();
      }

      staffBox.innerHTML += `
        <div class="coordinator-card">
          <div class="coordinator-avatar">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div>
            <strong>${name}</strong>
            ${
              mobile
                ? `<span><a href="tel:${mobile}">${mobile}</a></span>`
                : ""
            }
          </div>
        </div>
      `;
    });
  }

  /* STUDENT COORDINATORS */
  if (card.dataset.students) {
    card.dataset.students.split(",").forEach(entry => {
      entry = entry.trim();
      let name = entry;
      let mobile = "";

      if (entry.includes("-")) {
        const parts = entry.split("-");
        name = parts[0].trim();
        mobile = parts[1].trim();
      }

      studentBox.innerHTML += `
        <div class="coordinator-card">
          <div class="coordinator-avatar">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div>
            <strong>${name}</strong>
            ${
              mobile
                ? `<span><a href="tel:${mobile}">${mobile}</a></span>`
                : ""
            }
          </div>
        </div>
      `;
    });
  }

  // Auto-hide empty sections
  staffBox.previousElementSibling.style.display =
    staffBox.style.display =
      staffBox.innerHTML.trim() ? "grid" : "none";

  studentBox.previousElementSibling.style.display =
    studentBox.style.display =
      studentBox.innerHTML.trim() ? "grid" : "none";

  document.getElementById("coordinatorSection").style.display =
    staffBox.innerHTML.trim() || studentBox.innerHTML.trim()
      ? "block"
      : "none";

/* ========== REGISTRATION BUTTON ========== */
const registerBtn = document.getElementById("registerBtn");
const regUrl = card.dataset.regurl || "#";
const fee = card.dataset.fee || "Free";

registerBtn.href = regUrl;
registerBtn.innerText =
  fee === "Free"
    ? "Register Now (Free)"
    : `Register Now (₹${fee})`;

registerBtn.style.display = regUrl !== "#" ? "inline-flex" : "none";

    /* ========== MODAL BACKGROUND IMAGE ========== */
  const modalContent = eventModal.querySelector(".event-modal-content");

  const bgImage = card.dataset.bg;

  if (bgImage) {
    modalContent.style.backgroundImage = `
      linear-gradient(
        rgba(2, 6, 23, 0.88),
        rgba(2, 6, 23, 0.88)
      ),
      url('${bgImage}')
    `;

    modalContent.style.backgroundSize = "100% auto";
    modalContent.style.backgroundRepeat = "repeat-y";
    modalContent.style.backgroundPosition = "top center";
  } else {
    modalContent.style.backgroundImage = "";
  }
// Reset modal scroll after it becomes visible
setTimeout(() => {
    modalContent.scrollTop = 0;
}, 10);

  /* ========== SHOW MODAL ========== */
  eventModal.classList.add("active");
  document.body.style.overflow = "hidden";
  // Reset modal scroll after it becomes visible
setTimeout(() => {
    modalContent.scrollTop = 0;
}, 10);
}

/* ===================== CLOSE MODAL ===================== */
function closeEventModal() {
  eventModal.classList.remove("active");
  document.body.style.overflow = "";
}

/* Close on clicking overlay */
eventModal.addEventListener("click", e => {
  if (e.target.id === "eventModal") closeEventModal();
});

/* Close on Escape key */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeEventModal();
});

/* ===================== MOBILE TOUCH HOVER EFFECT ===================== */
const touchElements = document.querySelectorAll(
  ".coordinator-card, .close-btn, .register-btn, .event-card, .event-modal-close"
);

touchElements.forEach(el => {
  el.addEventListener("touchstart", () => {
    el.classList.add("touch-active");
  });
  el.addEventListener("touchend", () => {
    el.classList.remove("touch-active");
  });
  el.addEventListener("touchcancel", () => {
    el.classList.remove("touch-active");
  });
});

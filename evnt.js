function openEventModal(card) {

  /* ================= BASIC DETAILS ================= */
  modalTitle.innerText = card.dataset.title || "";
  modalType.innerText = card.dataset.type || "";
  modalDescription.innerText = card.dataset.description || "";
  modalDate.innerText = card.dataset.date || "";
  modalTime.innerText = card.dataset.time || "";
  modalVenue.innerText = card.dataset.venue || "";

  /* ================= RULES (NUMBERED) ================= */
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

  /* ================= PRIZES (DYNAMIC) ================= */
  const prizes = (card.dataset.prize || "").split(",");

  document.getElementById("prize1").innerText =
    prizes[0] ? `₹${prizes[0]}` : "-";

  document.getElementById("prize2").innerText =
    prizes[1] ? `₹${prizes[1]}` : "-";

  document.getElementById("prize3").innerText =
    prizes[2] ? `₹${prizes[2]}` : "-";

/* ================= COORDINATORS ================= */
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

/* Auto-hide only the empty part */
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




  /* ================= REGISTRATION FEE ================= */
  const fee = card.dataset.fee || "Free";
  document.getElementById("registerBtn").innerText =
    fee === "Free"
      ? "Register Now (Free)"
      : `Register Now (₹${fee})`;

  /* ================= SHOW MODAL ================= */
  eventModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ================= CLOSE ================= */
function closeEventModal() {
  eventModal.classList.remove("active");
  document.body.style.overflow = "";
}

eventModal.addEventListener("click", e => {
  if (e.target.id === "eventModal") closeEventModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeEventModal();
});

// Select all elements with hover effects(mobile touch effect)
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

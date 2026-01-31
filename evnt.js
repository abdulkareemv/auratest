function openEventModal(card) {
  document.getElementById("modalTitle").innerText = card.dataset.title;
  document.getElementById("modalType").innerText = card.dataset.type;
  document.getElementById("modalDescription").innerText = card.dataset.description;
  document.getElementById("modalDate").innerText = card.dataset.date;
  document.getElementById("modalTime").innerText = card.dataset.time;
  document.getElementById("modalVenue").innerText = card.dataset.venue;
  document.getElementById("modalPrize").innerText = card.dataset.prize;
  document.getElementById("modalCoordinators").innerText = card.dataset.coordinators;

  const rulesList = document.getElementById("modalRules");
  rulesList.innerHTML = "";

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

  document.getElementById("eventModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeEventModal() {
  document.getElementById("eventModal").classList.remove("active");
  document.body.style.overflow = "";
}

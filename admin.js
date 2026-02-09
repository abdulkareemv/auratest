/* 🔴 LIVE VISITORS (last 5 minutes approximation) */
const ACTIVE_TIME = 5 * 60 * 1000;
const now = Date.now();

let visits = JSON.parse(localStorage.getItem("activeUsers") || "[]");
visits = visits.filter(t => now - t < ACTIVE_TIME);
visits.push(now);

localStorage.setItem("activeUsers", JSON.stringify(visits));
document.getElementById("liveUsers").innerText = visits.length;


/* 🟢 REGISTRATION DATA FROM GOOGLE SHEET */
const sheetId = "SHEET_ID_HERE";
const sheetURL = `https://opensheet.elk.sh/${sheetId}/Sheet1`;

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {

    document.getElementById("totalRegs").innerText = data.length;

    const inHouse = data.filter(r => r.Type === "InHouse").length;
    const external = data.filter(r => r.Type === "External").length;

    document.getElementById("inHouse").innerText = inHouse;
    document.getElementById("external").innerText = external;

    /* 📌 Event-wise count */
    const eventMap = {};
    data.forEach(r => {
      eventMap[r.Event] = (eventMap[r.Event] || 0) + 1;
    });

    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    for (const event in eventMap) {
      const li = document.createElement("li");
      li.textContent = `${event} – ${eventMap[event]}`;
      eventList.appendChild(li);
    }
  })
  .catch(err => {
    console.error("Sheet fetch error", err);
  });

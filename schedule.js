function showDay(day) {
  document.getElementById("day1").classList.remove("active");
  document.getElementById("day2").classList.remove("active");
  document.querySelectorAll(".day-btn").forEach(btn => btn.classList.remove("active"));

  if(day === 1){
    document.getElementById("day1").classList.add("active");
    document.querySelectorAll(".day-btn")[0].classList.add("active");
  } else {
    document.getElementById("day2").classList.add("active");
    document.querySelectorAll(".day-btn")[1].classList.add("active");
  }
}

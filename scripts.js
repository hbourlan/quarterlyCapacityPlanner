// import form data
const formResults = document.getElementById("form");

// define variables
let velocity, rollover, engineers, daysUnavailable, holidays;

// add event listener to form
formResults.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent page reload

  // access form elements
  velocity = parseFloat(document.getElementById("velocityInput").value);
  engineers = parseInt(document.getElementById("engineersInput").value, 10);
  daysUnavailable = parseFloat(document.getElementById("removeDaysInput").value || 0);
  holidays = parseFloat(document.getElementById("holidayInput").value || 0);
  rollover = parseFloat(document.getElementById("rolloverInput").value || 0);

  const totalDaysUnavailable = daysUnavailable + (holidays * engineers);

  calculateRecommendedVelocity(velocity, rollover, engineers, totalDaysUnavailable);
});

function calculateRecommendedVelocity(velocity, rollover, engineers, totalDaysUnavailable) {
  const sprintDays = 10; // 2-week sprint
  const hoursPerDay = 8;

  const engineerHours = sprintDays * hoursPerDay * engineers;
  const unavailableHours = totalDaysUnavailable * hoursPerDay;

  const velocityPerHour = velocity / engineerHours;
  const adjustedHours = engineerHours - unavailableHours;
  const adjustedVelocity = Math.round(velocityPerHour * adjustedHours) - rollover;

  const aggressive = Math.round(adjustedVelocity + 3);
  const standard = Math.round(adjustedVelocity);
  const mild = Math.round(adjustedVelocity - 2);

  // send results to UI
  document.getElementById("aggressive").textContent = `Aggressive - We want to boost velocity:  ${aggressive}`;
  document.getElementById("standard").textContent = `Standard:  ${standard}`;
  document.getElementById("mild").textContent = `Mild - Let's take it easy:  ${mild}`;
}

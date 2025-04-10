// script.js
function calculateCapacity() {
  const teamSize = Number(document.getElementById("engineersInput").value);
  const oooDays = Number(document.getElementById("removeDaysInput").value);
  const velocity = Number(document.getElementById("velocityInput").value);

  const sprints = 6;
  const hoursPerDay = 6;
  const hoursPerSprintPerPerson = 60;

  //error message if team size or velocity is missing
  if (teamSize <= 0 || velocity <= 0) {
    document.getElementById("results").innerHTML = `<p>Please enter valid inputs for team size and velocity.</p>`;
    return;
  }

  const totalHoursPerSprint = teamSize * hoursPerSprintPerPerson; //get total hours of team
  const totalAvailableHours = totalHoursPerSprint * sprints - oooDays * hoursPerDay; //deduct OOO days from total hours of team
  const avgHoursPerPoint = totalHoursPerSprint / velocity; //get average hours per point based on velocity

  const maxQuarterCapacity = velocity * sprints; //get max velocity for the quarter based on average velocity
  const adjustedQuarterCapacity = totalAvailableHours / avgHoursPerPoint; //get max number of actual availability in points

  const maxWithVariance = maxQuarterCapacity * 0.8; //get 80% capacity
  const adjustedWithVariance = adjustedQuarterCapacity * 0.8; //get 80% capacity

  const recommendedRange = [
    Math.round(adjustedWithVariance),
    Math.round(adjustedQuarterCapacity)
  ];

  const recommendedPerSprint = [
    Math.round(recommendedRange[0] / sprints),
    Math.round(recommendedRange[1] / sprints)
  ];

  document.getElementById("results").innerHTML = `
    <h2 style="font-weight: bold;">Results</h2>
    <p>Total Hours per Sprint: <strong>${totalHoursPerSprint}</strong> <em>(60 hrs per engineer)</em></p>
    <p>Actual Team Availability: <strong>${totalAvailableHours}</strong></p>
    <p>Average Hours per Story Point: <strong>${avgHoursPerPoint.toFixed(2)}</strong></p>
    <p>Max Quarterly Capacity (SP): <strong>${Math.round(maxQuarterCapacity)}</strong></p>
    <p>Adjusted Quarterly Capacity (SP): <strong>${Math.round(adjustedQuarterCapacity)}</strong></p>
    <p>Max w/ 20% Variance: <strong>${Math.round(maxWithVariance)}</strong></p>
    <p>Adjusted w/ 20% Variance: <strong>${Math.round(adjustedWithVariance)}</strong></p>
    <p>Recommended Quarterly Range: <strong>${recommendedRange[0]} - ${recommendedRange[1]} SP</strong></p>
    <p>Recommended Per Sprint: <strong>${recommendedPerSprint[0]} - ${recommendedPerSprint[1]} SP</strong></p>
  `;
}

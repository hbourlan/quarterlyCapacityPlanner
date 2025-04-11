// Event listener for form submission
const formResults = document.getElementById("form");

let velocity, teamSize, oooDays, holidays;

// add event listener to form
formResults.addEventListener("submit", function(event){
  event.preventDefault(); // prevent form from submitting

  // Access form elements
  velocity = document.getElementById("velocityInput").value;
  teamSize = document.getElementById("teamSizeInput").value;
  oooDays = document.getElementById("removeDaysInput").value;
  holidays = document.getElementById("addHolidaysInput").value;

  // Input validation check
  if (teamSize <= 0 || velocity <= 0) {
    document.getElementById("results").innerHTML = "<p>Please enter valid inputs for team size and velocity.</p>";
    return;
  }

  calculateRecommendedCapacity(velocity, teamSize, oooDays, holidays);
});


function calculateRecommendedCapacity(velocity, teamSize, oooDays, holidays){
  
  const sprints = 6;
  const sprintLength = 10;

  const maxQuarterCapacity = velocity * sprints; // Calculate max capacity for the quarter (6 sprints)

  // Calculate average points per person and per day
  const pointsPerPerson = velocity / teamSize;
  const pointsPerDay = pointsPerPerson / sprintLength;

  // Calculate adjustments for OOO days and holidays
  const oooAdjustment = oooDays * pointsPerDay;
  const holidayAdjustment = holidays * pointsPerDay * teamSize;

  const totalAdjustments = oooAdjustment + holidayAdjustment; 
  const adjustedQuarterCapacity = maxQuarterCapacity - totalAdjustments;

  // Apply 20% variance to max and adjusted capacities
  const maxWithVariance = maxQuarterCapacity * 0.8;
  const adjustedWithVariance = adjustedQuarterCapacity * 0.8;

  // Send to UI
  document.getElementById("maxCapacity").textContent = `Max Quarter Capacity: ${maxQuarterCapacity.toFixed(1)} story points`;
  document.getElementById("adjustedCapacity").textContent = `Adjusted Capacity: ${adjustedQuarterCapacity.toFixed(1)} story points`;
  document.getElementById("maxWithVariance").textContent = `Max with Variance (80%): ${maxWithVariance.toFixed(1)} story points`;
  document.getElementById("adjustedWithVariance").textContent = `Adjusted with Variance (80%): ${adjustedWithVariance.toFixed(1)} story points`;
};

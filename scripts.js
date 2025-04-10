// Event listener for form submission
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission (page reload)

  // Get input values
  const teamSize = Number(document.getElementById("teamSize").value); // Team size
  const oooDays = Number(document.getElementById("oooDays").value); // OOO days
  const velocity = Number(document.getElementById("velocity").value); // Average velocity
  const holidays = Number(document.getElementById("addHolidaysInput").value); // Holidays

  // Validation check
  if (teamSize <= 0 || velocity <= 0) {
    document.getElementById("results").innerHTML = "<p>Please enter valid inputs for team size and velocity.</p>";
    return;
  }

  // Constants
  const sprints = 6; // Number of sprints (quarterly capacity)
  const sprintLength = 10; // Sprint length in days (default 2 weeks = 10 days)

  // Calculate max capacity for the quarter (6 sprints)
  const maxQuarterCapacity = velocity * sprints;

  // Calculate average points per person and per day
  const pointsPerPerson = velocity / teamSize;
  const pointsPerDay = pointsPerPerson / sprintLength;

  // Calculate adjustments for OOO days and holidays
  const oooAdjustment = oooDays * pointsPerDay;
  const holidayAdjustment = holidays * pointsPerDay * teamSize;

  // Total adjustments
  const totalAdjustments = oooAdjustment + holidayAdjustment;

  // Adjusted quarter capacity
  const adjustedQuarterCapacity = maxQuarterCapacity - totalAdjustments;

  // Apply 80% variance to max and adjusted capacities
  const maxWithVariance = maxQuarterCapacity * 0.8;
  const adjustedWithVariance = adjustedQuarterCapacity * 0.8;

  // Display results
  document.getElementById("maxCapacity").textContent = `Max Quarter Capacity: ${maxQuarterCapacity.toFixed(1)} story points`;
  document.getElementById("adjustedCapacity").textContent = `Adjusted Capacity: ${adjustedQuarterCapacity.toFixed(1)} story points`;
  document.getElementById("maxWithVariance").textContent = `Max with Variance (80%): ${maxWithVariance.toFixed(1)} story points`;
  document.getElementById("adjustedWithVariance").textContent = `Adjusted with Variance (80%): ${adjustedWithVariance.toFixed(1)} story points`;
});

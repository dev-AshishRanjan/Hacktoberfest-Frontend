const activityInput = document.getElementById("activity");
const durationInput = document.getElementById("duration");
const logButton = document.getElementById("log");
const workoutsList = document.getElementById("workouts");

logButton.addEventListener("click", logWorkout);

function logWorkout() {
    const activity = activityInput.value;
    const duration = durationInput.value;

    if (activity === "" || duration <= 0) {
        alert("Please fill in valid workout details.");
        return;
    }

    const workoutItem = document.createElement("li");
    workoutItem.textContent = `Activity: ${activity}, Duration: ${duration} minutes`;
    workoutsList.appendChild(workoutItem);

    // Clear the input fields
    activityInput.value = "";
    durationInput.value = "";
}

// Get DOM elements
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const cancelButton = document.getElementById('cancel-button');
const timerSlider = document.getElementById('timer-slider');

let intervalId; // To hold the interval ID for timer updates
let timerDuration = 0; // To track the timer duration
let remainingSeconds = 0; // To track the remaining seconds when stopped
let isTimerRunning = false; // To track if the timer is currently running

// Convert minutes and seconds to a formatted time string
function formatTime(minutes, seconds) {
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
}

// Update the timer display based on the given duration
function updateTimerDisplay(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  timerDisplay.textContent = formatTime(minutes, seconds);
}

// Start the timer with the specified duration or remaining seconds
function startTimer(duration) {
  let seconds;
  if (duration) {
    timerDuration = duration;
    seconds = duration * 60;
  } else {
    seconds = remainingSeconds;
  }

  intervalId = setInterval(() => {
    updateTimerDisplay(seconds);
    timerSlider.value = seconds / 60; // Update the slider value to match the timer

    if (seconds <= 0) {
      stopTimer();
      alert('Time is up!');
    } else {
      seconds--;
    }
  }, 1000);

  isTimerRunning = true;
  toggleButtonState(); // Toggle button state
}

// Stop the timer
function stopTimer() {
  clearInterval(intervalId);
  remainingSeconds = timerDuration * 60 - Math.floor((Date.now() - startTime) / 1000); // Calculate remaining seconds
  isTimerRunning = false;
  toggleButtonState(); // Toggle button state
}

// Cancel the timer and reset the values
function cancelTimer() {
  clearInterval(intervalId);
  remainingSeconds = 0;
  timerDuration = 0;
  timerSlider.value = 0;
  updateTimerDisplay(0);
  isTimerRunning = false;
  toggleButtonState(); // Toggle button state
}

// Toggle the visibility and state of buttons
function toggleButtonState() {
  if (isTimerRunning) {
    stopButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
    startButton.style.display = 'none';
  } else {
    stopButton.style.display = 'none';
    cancelButton.style.display = 'none';
    startButton.style.display = 'inline-block';
  }
}

// Event listeners
startButton.addEventListener('click', () => {
  const durationInput = parseInt(timerSlider.value);
  startTimer(durationInput);
});

stopButton.addEventListener('click', stopTimer);

cancelButton.addEventListener('click', cancelTimer);

// Update the timer display and slider value when the slider value changes
timerSlider.addEventListener('input', () => {
  const durationInput = parseInt(timerSlider.value);
  updateTimerDisplay(durationInput * 60);
});

// Initial setup
updateTimerDisplay(timerSlider.value * 60);
toggleButtonState(); // Ensure correct button visibility initially

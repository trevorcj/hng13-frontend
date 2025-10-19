// Selecting HTML Elements
const timeEl = document.querySelector(".time");

const updateTime = function () {
  const currentTime = Date.now();
  timeEl.textContent = currentTime;
};

// Update on render
updateTime();

// Update time every second
setInterval(updateTime, 1000);

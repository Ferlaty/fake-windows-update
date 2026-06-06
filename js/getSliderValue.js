const slider = document.getElementById('updateLength');
const output = document.getElementById('sliderValue');

// Update the current slider value every time you drag it
slider.addEventListener('input', function() {
  output.textContent = this.value;
});
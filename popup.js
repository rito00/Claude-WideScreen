document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const sliderLabel = document.getElementById('slider-label');

  initializeSlider();

  function updateSliderColor() {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(90deg, #4BD865 ${percent}%, #CCCCCC ${percent}%)`;
  }

  function updateSliderValue(value) {
    slider.value = value;
    sliderLabel.textContent = value;
    updateSliderColor();
  }

  function initializeSlider() {
    chrome.storage.local.get('width', ({ width }) => {
      updateSliderValue(width || slider.value);
    });

    slider.addEventListener('input', () => {
      const value = slider.value;
      chrome.storage.local.set({ width: value });
      updateSliderValue(value);
    });
  }
});
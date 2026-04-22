const global = {
  currentColor: "rgb(128, 128, 128)"
};

const colors = ['red', 'green', 'blue'];

const parseRGB = (color) => {
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  return match ? [match[1], match[2], match[3]] : null;
};

const updateSliders = (r, g, b) => {
  [r, g, b].forEach((val, i) => {
    document.getElementById(`${colors[i]}-slider`).value = val;
    document.getElementById(`${colors[i]}-value`).textContent = val;
  });
};

const setColor = (color) => {
  global.currentColor = color;
  document.getElementById("color-box").style.backgroundColor = color;
  const rgb = parseRGB(color);
  if (rgb) updateSliders(...rgb);
};

const getSwatches = () => JSON.parse(localStorage.getItem('swatches') || '[]');
const saveSwatches = (swatches) => localStorage.setItem('swatches', JSON.stringify(swatches));

const createSwatch = (color) => {
  const box = document.createElement("div");
  box.classList.add("swatch-item");
  box.style.backgroundColor = color;
  box.addEventListener("click", () => setColor(color));

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-button");
  removeBtn.textContent = "✖";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    box.remove();
    saveSwatches(getSwatches().filter(c => c !== color));
  });

  box.appendChild(removeBtn);
  return box;
};

const addToSwatch = () => {
  const swatches = getSwatches();
  if (swatches.includes(global.currentColor)) return;
  swatches.push(global.currentColor);
  saveSwatches(swatches);
  document.querySelector("#swatch-box").appendChild(createSwatch(global.currentColor));
};

const setup = () => {
  const updateColor = () => {
    const rgb = colors.map(color => {
      const val = document.getElementById(`${color}-slider`).value;
      document.getElementById(`${color}-value`).textContent = val;
      return val;
    });
    setColor(`rgb(${rgb.join(', ')})`);
  };

  colors.forEach(color => {
    document.getElementById(`${color}-slider`).addEventListener("input", updateColor);
  });

  updateColor();
  document.querySelector("#save-button").addEventListener("click", addToSwatch);
  getSwatches().forEach(color => document.querySelector("#swatch-box").appendChild(createSwatch(color)));
};

window.addEventListener("load", setup);
const themeToggle = document.querySelector(".theme-toggle");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const API_KEY = "hf_yoursecrettokenkey"; //api key

const exampleprompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
];

//set theme based on prefered or system default
(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPreferDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isDarkTheme =
    savedTheme === "dark" || (!savedTheme && systemPreferDark);
  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();

// switch btw Themes
const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
};

//calculate width/height base on chosen ratio
const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  //ensure dimensions are multiple of 16(AI Model requirements)
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

  return { width: calculatedWidth, height: calculatedHeight };
};

//send req to hugging face api to create image

const generateImages = async (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  const { width, height } = getImageDimensions(aspectRatio);

  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    const imgCard = document.getElementById(`img-card-${i}`);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: promptText,
          width,
          height,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);

      // set image src
      const img = imgCard.querySelector(".result-img");
      img.src = imgUrl;

      // attach download handler
      const downloadBtn = imgCard.querySelector(".img-download-btn");
      downloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = imgUrl;
        a.download = `ai-image-${i + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      // remove loading state
      imgCard.classList.remove("loading", "error");
    } catch (error) {
      console.error(error);
      imgCard.classList.remove("loading");
      imgCard.classList.add("error");
      const statusText = imgCard.querySelector(".status-text");
      if (statusText) {
        statusText.textContent = "Failed to generate image.";
      }
    }
  });

  await Promise.allSettled(imagePromises);
};

//create placeholder card with loading spinners + download button
const createImageCards = (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  gridGallery.innerHTML = "";

  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `
      <div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
        <div class="status-container">
          <div class="spinner"></div>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p class="status-text">Generating...</p>                     
        </div>
        <img class="result-img" />
        <div class="img-overlay">
          <button class="img-download-btn" type="button">
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>`;
  }

  generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

//handle for submission
const handleFormSubmit = (e) => {
  e.preventDefault();

  //fet from values
  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

// fill prompt with random input
promptBtn.addEventListener("click", () => {
  const prompt =
    exampleprompts[Math.floor(Math.random() * exampleprompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);

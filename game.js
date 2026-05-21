// ============================================================
//  DRESS-UP GAME — game.js
//  HOW TO ADD YOUR OWN DESIGNS:
//  1. Put your PNG files in the matching folder under images/
//  2. Add the filename (just the name, not the full path) to
//     the correct array below.
//  3. The "label" is what shows under the thumbnail.
// ============================================================

const OUTFITS = {

  tops: {
    label: "👕 Tops",
    folder: "images/clothes/",
    layerId: "layer-tops",
    items: [
      // { file: "shirt_red.png",    label: "Red Shirt" },
      // { file: "shirt_blue.png",   label: "Blue Shirt" },
      // { file: "dress_pink.png",   label: "Pink Dress" },
      // ADD YOUR FILES HERE ↑
    ]
  },

  bottoms: {
    label: "👖 Bottoms",
    folder: "images/clothes/",
    layerId: "layer-bottoms",
    items: [
      // { file: "pants_jeans.png",  label: "Jeans" },
      // { file: "skirt_floral.png", label: "Floral Skirt" },
      // ADD YOUR FILES HERE ↑
    ]
  },

  shoes: {
    label: "👟 Shoes",
    folder: "images/clothes/",
    layerId: "layer-shoes",
    items: [
      // { file: "shoes_sneakers.png", label: "Sneakers" },
      // { file: "shoes_heels.png",    label: "Heels" },
      // ADD YOUR FILES HERE ↑
    ]
  },

  hats: {
    label: "🎩 Hats",
    folder: "images/clothes/",
    layerId: "layer-hats",
    items: [
      // { file: "hat_cap.png",    label: "Cap" },
      // { file: "hat_crown.png",  label: "Crown" },
      // ADD YOUR FILES HERE ↑
    ]
  },

  accessories: {
    label: "👜 Accessories",
    folder: "images/accessories/",
    layerId: "layer-accessories",
    items: [
      // { file: "bag_handbag.png",  label: "Handbag" },
      // { file: "glasses_sun.png",  label: "Sunglasses" },
      // ADD YOUR FILES HERE ↑
    ]
  }

};

// ============================================================
//  STATE — tracks what's currently selected
// ============================================================
let currentCategory = null;
const selected = {};   // e.g. { tops: "shirt_red.png", hats: null }

// ============================================================
//  BUILD THE UI ON PAGE LOAD
// ============================================================
window.addEventListener("DOMContentLoaded", () => {
  buildCategoryButtons();
});

function buildCategoryButtons() {
  const container = document.getElementById("category-buttons");
  container.innerHTML = "";

  for (const [key, cat] of Object.entries(OUTFITS)) {
    if (cat.items.length === 0) continue; // skip empty categories

    const btn = document.createElement("button");
    btn.className = "cat-btn";
    btn.textContent = cat.label;
    btn.onclick = () => openCategory(key);
    container.appendChild(btn);
  }
}

// ============================================================
//  OPEN A CATEGORY → show its items in the picker panel
// ============================================================
function openCategory(key) {
  currentCategory = key;
  const cat = OUTFITS[key];

  // Highlight active button
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(b => { if (b.textContent === cat.label) b.classList.add("active"); });

  // Set panel title
  document.getElementById("picker-title").textContent = cat.label;

  // Build item grid
  const grid = document.getElementById("item-grid");
  grid.innerHTML = "";

  // "Remove" option — click to take off this layer
  const removeCard = document.createElement("div");
  removeCard.className = "item-card" + (selected[key] == null ? " selected" : "");
  removeCard.innerHTML = `<div style="width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:2rem;">✕</div><span>None</span>`;
  removeCard.onclick = () => wearItem(key, null);
  grid.appendChild(removeCard);

  // Each item
  cat.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card" + (selected[key] === item.file ? " selected" : "");
    card.innerHTML = `
      <img src="${cat.folder}${item.file}" alt="${item.label}" onerror="this.style.opacity=0.3" />
      <span>${item.label}</span>
    `;
    card.onclick = () => wearItem(key, item.file);
    grid.appendChild(card);
  });
}

// ============================================================
//  WEAR AN ITEM → update character layer + highlight selection
// ============================================================
function wearItem(categoryKey, filename) {
  selected[categoryKey] = filename;

  const cat = OUTFITS[categoryKey];
  const layer = document.getElementById(cat.layerId);

  if (filename) {
    layer.src = cat.folder + filename;
  } else {
    layer.src = "";
  }

  // Refresh the grid to show new selection highlight
  openCategory(categoryKey);
}

// ============================================================
//  RESET — remove all clothing
// ============================================================
function resetOutfit() {
  for (const key of Object.keys(OUTFITS)) {
    selected[key] = null;
    const layer = document.getElementById(OUTFITS[key].layerId);
    if (layer) layer.src = "";
  }
  document.getElementById("picker-title").textContent = "Pick a category";
  document.getElementById("item-grid").innerHTML = "";
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
}

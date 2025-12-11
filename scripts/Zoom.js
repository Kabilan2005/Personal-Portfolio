const cards = document.querySelectorAll(".gallery-card");
const modal = document.querySelector(".zoom-modal");
const zoomLeft = document.querySelector(".zoom-left");
const zoomSource = document.querySelector(".zoom-source");
const zoomView = document.querySelector(".zoom-view");

document.querySelectorAll(".view-story").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".gallery-card");
    card.classList.add("flipped");
    const back = card.querySelector(".card-back .desc");
    back.textContent = card.dataset.desc;
  });
});

document.querySelectorAll(".close-story").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".gallery-card");
    card.classList.remove("flipped");
  });
});

document.querySelectorAll(".view-zoom").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".gallery-card");
    openZoom(card.dataset.img);
  });
});

document.querySelectorAll(".img-wrapper img.thumb").forEach(img => {
  img.addEventListener("click", () => {
    const card = img.closest(".gallery-card");
    openZoom(card.dataset.img);
  });
});

function openZoom(src) {
  zoomSource.src = src;
  zoomView.style.backgroundImage = `url("${src}")`;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeZoom() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector(".zoom-close").addEventListener("click", closeZoom);

modal.addEventListener("click", e => {
  if (e.target === modal) closeZoom();
});

zoomLeft.addEventListener("mousemove", e => {
  const rect = zoomSource.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  zoomView.style.backgroundPosition = `${x}% ${y}%`;
});

document.querySelector(".zoom-right").addEventListener("mousemove", e => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  zoomView.style.backgroundPosition = `${x}% ${y}%`;
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeZoom();
});

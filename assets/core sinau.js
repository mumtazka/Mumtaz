const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const darkToggle = document.getElementById("dark-toggle"); // checkbox toggle lu

// === fungsi update warna cursor ===
function updateCursorColor() {
  if (document.body.classList.contains("dark")) {
    circles.forEach(c => c.style.backgroundColor = "white"); // mode gelap → putih
  } else {
    circles.forEach(c => c.style.backgroundColor = "black"); // mode terang → hitam
  }
}

// === animasi trail ===
circles.forEach(circle => { circle.x = 0; circle.y = 0; });

window.addEventListener("mousemove", e => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = (x - 12) + "px";
    circle.style.top = (y - 12) + "px";
    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}
animateCircles();

// === toggle dark / light ===
darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  updateCursorColor();
});

// === set awal (biar ga kosong) ===
updateCursorColor();

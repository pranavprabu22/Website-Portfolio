const projects = [
  {
    title: "MLPerf Inference Benchmarking",
    description:
      "Developed and evaluated multi-GPU inference pipelines using AMD MI210 GPUs for large-scale ML benchmarks.",
    github: "https://github.com/account1/mlperf-inference",
    demo: null,
    tech: ["Python", "PyTorch", "MLPerf", "GPU"],
  },
  {
    title: "Nature Unplugged",
    description:
      "A digital wellness web platform focused on reducing screen fatigue through guided offline activities.",
    github: "https://github.com/account2/nature-unplugged",
    demo: "https://nature-unplugged.com",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Floating Point Adder",
    description:
      "Implemented IEEE-754 style floating point addition under strict 8-bit storage constraints.",
    github: "https://github.com/account1/float-adder",
    demo: null,
    tech: ["C", "Computer Architecture"],
  }
];

const grid = document.getElementById("project-grid");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="tech">
      ${project.tech.map(t => `<span>${t}</span>`).join("")}
    </div>
    <div class="project-links">
      <a href="${project.github}" target="_blank">GitHub →</a>
      ${project.demo ? `<a href="${project.demo}" target="_blank">Live →</a>` : ""}
    </div>
  `;

  grid.appendChild(card);
});

// ===== Dynamic Background =====
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 0.5,
  dx: (Math.random() - 0.5) * 0.4,
  dy: (Math.random() - 0.5) * 0.4
}));

let mouse = { x: null, y: null };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;

    const dist = mouse.x
      ? Math.hypot(p.x - mouse.x, p.y - mouse.y)
      : 999;

    const alpha = dist < 120 ? 0.8 : 0.25;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56,189,248,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
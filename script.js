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

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("reveal");
  observer.observe(section);
});

const heroCanvas = document.getElementById("hero-visual");
const hctx = heroCanvas.getContext("2d");

function resizeHeroCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = heroCanvas.getBoundingClientRect();

  heroCanvas.width = rect.width * dpr;
  heroCanvas.height = rect.height * dpr;

  hctx.resetTransform();
  hctx.scale(dpr, dpr);
}

resizeHeroCanvas();
window.addEventListener("resize", resizeHeroCanvas);

const nodes = Array.from({ length: 24 }, () => ({
  x: Math.random() * heroCanvas.offsetWidth,
  y: Math.random() * heroCanvas.offsetHeight,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
}));

function drawHero() {
  hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;
  
    // Subtle mouse repulsion
    if (heroMouse.x !== null) {
      const dx = n.x - heroMouse.x;
      const dy = n.y - heroMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      if (dist < 120) {
        const force = (120 - dist) / 120;
        n.x += (dx / dist) * force * 1.2;
        n.y += (dy / dist) * force * 1.2;
      }
    }
  
    if (n.x < 0 || n.x > heroCanvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > heroCanvas.height) n.vy *= -1;
  });

  // Lines
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        let alpha = 1 - dist / 120;

        if (heroMouse.x !== null) {
          const mx = (nodes[i].x + nodes[j].x) / 2 - heroMouse.x;
          const my = (nodes[i].y + nodes[j].y) / 2 - heroMouse.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < 150) alpha += 0.15;
        }

        hctx.strokeStyle = `rgba(56,189,248,${Math.min(alpha, 0.9)})`;
        hctx.lineWidth = 1;
        hctx.beginPath();
        hctx.moveTo(nodes[i].x, nodes[i].y);
        hctx.lineTo(nodes[j].x, nodes[j].y);
        hctx.stroke();
      }
    }
  }

  // Nodes
  nodes.forEach(n => {
    hctx.beginPath();
    hctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    hctx.fillStyle = "#38bdf8";
    hctx.fill();
  });

  requestAnimationFrame(drawHero);
}

drawHero();

let heroMouse = { x: null, y: null };

const heroSection = document.querySelector(".hero");

heroSection.addEventListener("mousemove", e => {
  const rect = heroCanvas.getBoundingClientRect();
  heroMouse.x = e.clientX - rect.left;
  heroMouse.y = e.clientY - rect.top;
});

heroSection.addEventListener("mouseleave", () => {
  heroMouse.x = null;
  heroMouse.y = null;
});

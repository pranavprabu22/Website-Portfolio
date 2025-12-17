/* =========================================================
   PROJECT DATA + RENDERING
========================================================= */

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



/* =========================================================
   FULL-PAGE BACKGROUND PARTICLES
========================================================= */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resizeBackground() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeBackground);
resizeBackground();

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

function animateBackground() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;

    const dist = mouse.x
      ? Math.hypot(p.x - mouse.x, p.y - mouse.y)
      : Infinity;

    const alpha = dist < 120 ? 0.8 : 0.25;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56,189,248,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animateBackground);
}

animateBackground();



/* =========================================================
   NAVIGATION + SCROLL INTERACTIONS
========================================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});



/* =========================================================
   SECTION REVEAL ANIMATIONS
========================================================= */

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



/* =========================================================
   HERO CANVAS — NODE GRAPH ANIMATION
========================================================= */

const heroCanvas = document.getElementById("hero-visual");
const hctx = heroCanvas.getContext("2d");

let nodes = [];
let heroCenter = { x: 0, y: 0 };
let heroMouse = { x: null, y: null };

const HERO_CONFIG = {
  cohesion: 0.0006,
  separation: 7,          // 🔥 higher = stronger close repulsion
  separationDist: 60,     // interaction range
  damping: 0.997,
  maxSpeed: 1.1,
  preferredRadius: 140,
};

function updateHeroCenter() {
  heroCenter.x = heroCanvas.offsetWidth / 2;
  heroCenter.y = heroCanvas.offsetHeight / 2;
}

function resizeHeroCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = heroCanvas.getBoundingClientRect();

  if (!rect.width || !rect.height) return;

  heroCanvas.width = rect.width * dpr;
  heroCanvas.height = rect.height * dpr;

  hctx.setTransform(1, 0, 0, 1, 0, 0);
  hctx.scale(dpr, dpr);

  updateHeroCenter();
}

function initNodes() {
  nodes = Array.from({ length: 24 }, () => ({
    x: heroCenter.x + (Math.random() - 0.5) * 180,
    y: heroCenter.y + (Math.random() - 0.5) * 180,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }));
}

function drawHero() {
  hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  nodes.forEach((n, i) => {
    /* ---------- Cohesion toward center ---------- */
    const dxC = heroCenter.x - n.x;
    const dyC = heroCenter.y - n.y;
  
    n.vx += dxC * HERO_CONFIG.cohesion;
    n.vy += dyC * HERO_CONFIG.cohesion;
  
    /* ---------- Soft radius constraint ---------- */
    const distFromCenter = Math.hypot(dxC, dyC);
    const radiusError = distFromCenter - HERO_CONFIG.preferredRadius;
  
    n.vx -= (dxC / distFromCenter) * radiusError * 0.0004;
    n.vy -= (dyC / distFromCenter) * radiusError * 0.0004;
  
    /* ---------- Separation from nearby nodes ---------- */
    nodes.forEach((m, j) => {
      if (i === j) return;
  
      const dx = n.x - m.x;
      const dy = n.y - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      if (dist > 0 && dist < HERO_CONFIG.separationDist) {
        // Strong when close, weak when far
        const strength = HERO_CONFIG.separation * Math.exp(-(dist * dist) / (2 * 400));
      
        // Clamp to prevent instability
        const capped = Math.min(strength, 0.08);
      
        n.vx += (dx / dist) * capped;
        n.vy += (dy / dist) * capped;
      }      
    });
  
    /* ---------- Mouse interaction (unchanged, safe) ---------- */
    if (heroMouse.x !== null) {
      const dx = n.x - heroMouse.x;
      const dy = n.y - heroMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      if (dist < 120) {
        const force = (120 - dist) / 120;
        n.vx += (dx / dist) * force * 0.12;
        n.vy += (dy / dist) * force * 0.12;
      }
    }
  
    /* ---------- Damping ---------- */
    n.vx *= HERO_CONFIG.damping;
    n.vy *= HERO_CONFIG.damping;
  
    /* ---------- Speed clamp ---------- */
    const speed = Math.hypot(n.vx, n.vy);
    if (speed > HERO_CONFIG.maxSpeed) {
      n.vx = (n.vx / speed) * HERO_CONFIG.maxSpeed;
      n.vy = (n.vy / speed) * HERO_CONFIG.maxSpeed;
    }
  
    /* ---------- Apply movement ---------- */
    n.x += n.vx;
    n.y += n.vy;
  });

  // Draw lines
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
          if (Math.hypot(mx, my) < 150) alpha += 0.15;
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

  // Draw nodes
  nodes.forEach(n => {
    hctx.beginPath();
    hctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    hctx.fillStyle = "#38bdf8";
    hctx.fill();
  });

  requestAnimationFrame(drawHero);
}



/* =========================================================
   HERO MOUSE EVENTS
========================================================= */

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



/* =========================================================
   INITIALIZATION
========================================================= */

window.addEventListener("load", () => {
  resizeHeroCanvas();
  initNodes();
  drawHero();
});

window.addEventListener("resize", resizeHeroCanvas);
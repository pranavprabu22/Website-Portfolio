/* =========================================================
   PROJECT DATA + RENDERING
========================================================= */

const projects = [
  {
    title: "Chess AI — Minimax & Alpha-Beta Pruning with Optimized Evaluation",
    description:
      "Developed a chess engine implementing standard Minimax and Alpha-Beta pruning algorithms with a sophisticated evaluation function. Designed piece-square tables for positional and phase-dependent strategies, optimized move ordering with MVV-LVA heuristics, integrated Iterative Deepening Search and Quiescence Search, and employed Transposition Tables to improve performance. These optimizations allowed the AI to make strategic decisions efficiently across multiple game formats, balancing speed with move quality.",
    github: "https://github.com/JeffersonChen888/CSE150B-Group-Project",
    demo: null,
    tech: ["Python", "Minimax & Alpha-Beta Pruning", "Iterative Deepening Search", "Quiescence Search"]
  },
  {
    title: "Productivity Suite — Calendar, Task List & Journal",
    description:
      "Developed a full-stack web application for task and time management, featuring a calendar, customizable task lists, and a journal with code support. The journal leverages CodeMirror to allow syntax highlighting for JavaScript, Python, and C++. Implemented CI/CD pipelines with GitHub Actions, automated testing with Jest, and code quality checks via Codacy, ensuring a robust and maintainable development workflow.",
    github: "https://github.com/cse110-sp24-group10/cse110-sp24-group10",
    demo: null,
    tech: ["JavaScript", "HTML/CSS", "CodeMirror", "Jest", "CI/CD"]
  },
  {
    title: "Predicting Diseases Using Machine Learning",
    description:
      "Developed a multi-model machine learning pipeline to predict the presence of diseases using the SUPPORT2 dataset from UC Irvine. Explored and preprocessed 21 key patient features, addressing null values and class imbalance. Implemented multi-class logistic regression, neural networks (Keras), SVM, XGBoost, Gradient Boosted Trees, and K-Nearest Neighbors, with hyperparameter tuning and cross-validation to optimize model performance. Achieved the best results with XGBoost, providing interpretable feature importance for disease prediction.",
    github: "https://github.com/sebastian-dv/CSE-151A-Project",
    demo: null,
    tech: ["Python", "Pandas", "scikit-learn", "Keras", "XGBoost"]
  },
  {
    title: "Bidirectional Modern–Early Modern English Translator",
    description:
      "A computational linguistics project building a bidirectional translator between Modern English and Shakespearean Early Modern English. This involved constructing a parallel corpus from No Fear Shakespeare, preprocessing text, and implementing Seq2Seq LSTM, Marian MT, and T5 transformer models for style-preserving translation. Models were evaluated using BLEU, perplexity, WER, and a custom stylistic classifier.",
    github: "https://github.com/pprabu-ucsd/LIGN-167-Final-Project-Bidirectional-Shakespeare-Modern-English-Conversion",
    demo: null,
    tech: ["Python", "NLP", "Machine Learning", "Transformers", "Hugging Face"],
  },
  {
    title: "AI Mood Calendar",
    description:
      "A multimodal mood logging and mental health support system integrating real-time facial emotion recognition (YOLOv8), speech-to-text conversion (Google Speech Recognition), structured storage (SQLite), and AI agent analysis (Gemini LLM + Google ADK). Users can log moods, fetch past entries, and receive personalized feedback. The project emphasized synchronization of multimodal inputs, database-backed longitudinal tracking, real-time inference tradeoffs, LLM-driven analysis, and ethical handling of sensitive emotional data.",
    github: "https://github.com/pranavprabu22/AI_Mood_Calendar",
    demo: null,
    tech: ["Python", "Computer Vision", "Speech Recognition", "SQLite", "YOLOv8", "Google ADK"],
  },
  {
    title: "Emotion‑Based Music Recommendation System",
    description:
      "A real-time, vision-driven music recommender that detects user emotions via webcam (YOLO + OpenCV) and dynamically recommends Spotify tracks aligned with detected moods. The system maps facial expressions to valence-arousal features, queries the Spotify API for adaptive music selection, and presents results through a Flask web interface. Key learnings include feature representation bridging human emotions and computational inputs, real-time system optimization, API robustness, and ethical considerations for personalization and privacy.",
    github: "https://github.com/pranavprabu22/Emotion_Based_Music_Recommendation_System",
    demo: null,
    tech: ["Python", "Computer Vision", "Flask", "YOLO", "OpenCV", "Spotify API"],
  },
  {
    title: "Emotion‑Driven Adaptive Gaming",
    description:
      "An adaptive version of the Chrome Dino Runner where gameplay speed dynamically adjusts to the player’s facial expressions using YOLO-based emotion recognition and OpenCV. The system integrates real-time emotion detection with Pygame mechanics, mapping emotions to game speed and creating a feedback loop between affect and difficulty, with persistent high score tracking. Key learnings include latency-aware emotion recognition, concurrency for responsive interaction, interpretable adaptation rules, and user-centered design for engagement.",
    github: "https://github.com/pranavprabu22/Emotion_Driven_Adaptive_Gaming",
    demo: null,
    tech: ["Python", "Computer Vision", "Pygame", "YOLO", "OpenCV"],
  },
  {
    title: "EPE Tutorials",
    description:
      "A collection of tutorials designed to teach machine learning concepts and practical skills, including a Python crash course, an introduction to PyTorch models, and guidance on working with LBN (Latent Bayesian Network) models. The tutorials emphasize hands-on learning and step-by-step explanations for building foundational ML knowledge.",
    github: "https://github.com/pranavprabu22/EPE-Tutorials",
    demo: null,
    tech: ["Python", "PyTorch", "Machine Learning", "LBN"],
  },
  {
    title: "Sentiment Analysis Model Comparison",
    description:
      "A project comparing four sentiment analysis models—Naive Bayes, DistilBERT, Logistic Regression, and Support Vector Machine (SVM)—on a movie review dataset. The workflow included data preprocessing (punctuation removal, tokenization, stemming, lemmatization), model training, evaluation, and result comparison using metrics like F1 score, accuracy, precision, and recall. The SVM model achieved the best performance.",
    github: "https://github.com/pranavprabu22/Sentiment-Analysis-Model-Comparison",
    demo: null,
    tech: ["Python", "NLP", "Machine Learning", "DistilBERT", "SVM", "Naive Bayes", "Logistic Regression"],
  },
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
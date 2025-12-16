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

/*
  PORTFÓLIO CODE NEXT ON
  Para adicionar um projeto, inclua um novo objeto em "projects".
  Não é necessário alterar o HTML.
*/
const projects = [
  {
    title: "Atlas — Plataforma de Gestão",
    category: "Sistemas",
    description: "Projeto demo de uma plataforma web criada para centralizar operações, organizar informações e oferecer uma visão mais clara do negócio em um único ambiente.",
    year: "2026",
    type: "Sistema web",
    label: "Projeto demonstrativo",
    link: "portfolio-atlas.html"
  }
];

const grid = document.querySelector("#portfolio-grid");
const filters = document.querySelector("#portfolio-filters");
const count = document.querySelector("#project-count");

const categories = ["Todos", ...new Set(projects.map(project => project.category))];
let activeCategory = "Todos";

function renderFilters() {
  filters.innerHTML = categories.map(category =>
    '<button class="portfolio-filter ' + (category === activeCategory ? "active" : "") + '" data-category="' + category + '">' + category + "</button>"
  ).join("");

  filters.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProjects();
    });
  });
}

function renderProjects() {
  const visibleProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  count.textContent = projects.length;

  if (!visibleProjects.length) {
    grid.innerHTML = '<div class="portfolio-empty reveal visible"><h3>Nosso portfólio está começando.</h3><p>Os projetos realizados serão adicionados aqui conforme forem publicados. Cada trabalho poderá ter sua categoria, descrição, ano e informações principais.</p><p class="portfolio-note">Área preparada para atualização contínua.</p></div>';
    return;
  }

  grid.innerHTML = visibleProjects.map((project, index) => `
    <a class="portfolio-card reveal visible" href="${project.link}" aria-label="Ver projeto ${project.title}">
      <div class="portfolio-cover">
        <div class="portfolio-cover-mark"><span>CodeNextOn</span> / ${String(index + 1).padStart(2, "0")}</div>
      </div>
      <div class="portfolio-card-body">
        <span class="portfolio-tag">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="portfolio-details">
          <div><strong>${project.type}</strong><span>Tipo de projeto</span></div>
          <div><strong>${project.year}</strong><span>Ano</span></div>
          <div><strong>${project.label}</strong><span>Identificação</span></div>
        </div>
      </div>
    </a>
  `).join("");
}

renderFilters();
renderProjects();

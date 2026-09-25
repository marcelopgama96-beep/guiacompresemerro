import { categories as baseCategories, posts } from "./data/posts.js";

const app = document.querySelector("#app");
const basePath = getBasePath();
const routes = new Map([
  ["/", renderHome],
  ["/privacidade", renderPrivacy],
  ["/contato", renderContact],
  ["/busca", renderSearch],
  ["/configuracoes", renderSettings]
]);

let carouselIndex = 0;

window.addEventListener("popstate", renderApp);
window.addEventListener("DOMContentLoaded", renderApp);

function getBasePath() {
  const marker = "/guiacompresemerro";
  return window.location.pathname.startsWith(marker) ? marker : "";
}

function withBase(path) {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${basePath}${path}`;
}

function currentPath() {
  const path = window.location.pathname.replace(basePath, "") || "/";
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

function isDevMode() {
  const host = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  return host === "localhost" || host === "127.0.0.1" || params.get("dev") === "1";
}

function getCategories() {
  try {
    const stored = JSON.parse(localStorage.getItem("gcse-categories") || "null");
    return Array.isArray(stored) && stored.length ? stored : baseCategories;
  } catch {
    return baseCategories;
  }
}

function saveCategories(nextCategories) {
  localStorage.setItem("gcse-categories", JSON.stringify(nextCategories));
}

function categoryById(id) {
  return getCategories().find((category) => category.id === id) || baseCategories[0];
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

function formatViews(value) {
  return new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(value);
}

function sortByRecent(items = posts) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortByViews(items = posts) {
  return [...items].sort((a, b) => b.views - a.views);
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function searchPosts(term) {
  const normalizedTerm = normalize(term.trim());
  if (!normalizedTerm) return sortByRecent(posts);

  return posts.filter((post) => {
    const category = categoryById(post.categoryId);
    const haystack = normalize(
      [post.title, post.excerpt, category.name, post.author, post.tags.join(" ")].join(" ")
    );
    return haystack.includes(normalizedTerm);
  });
}

function setMeta(title, description) {
  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", description);
}

function navigate(path) {
  window.history.pushState({}, "", withBase(path));
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function link(path, label, className = "") {
  const active = currentPath() === path ? "is-active" : "";
  return `<a class="${className} ${active}" href="${withBase(path)}" data-link>${label}</a>`;
}

function asset(path) {
  return `${basePath}/${path}`.replace("//", "/");
}

function renderApp() {
  const path = currentPath();
  const route = routes.get(path) || renderNotFound;
  app.innerHTML = `
    ${renderHeader()}
    <main id="conteudo" tabindex="-1">
      ${route()}
    </main>
    ${renderFooter()}
  `;

  bindNavigation();
  bindSearch();
  bindRouteBehaviors(path);
}

function renderHeader() {
  const devLink = isDevMode()
    ? `<li>${link("/configuracoes", "Configurações DEV", "nav-link nav-link-dev")}</li>`
    : "";

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${withBase("/")}" data-link aria-label="Guia: Compre Sem Erro - Home">
          <img src="${asset("assets/logo.svg")}" alt="" width="44" height="44" />
          <span>
            <strong>Guia:</strong>
            <small>Compre Sem Erro</small>
          </span>
        </a>
        <nav class="main-nav" aria-label="Navegação principal">
          <ul>
            <li>${link("/", "Home", "nav-link")}</li>
            <li>${link("/privacidade", "Política de Privacidade", "nav-link")}</li>
            <li>${link("/contato", "Contato", "nav-link")}</li>
            ${devLink}
          </ul>
        </nav>
        <form class="search-form" role="search" aria-label="Buscar reviews">
          <label class="sr-only" for="site-search">Buscar posts</label>
          <input id="site-search" name="q" type="search" placeholder="Buscar reviews" autocomplete="off" />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand footer-brand" href="${withBase("/")}" data-link>
            <img src="${asset("assets/logo.svg")}" alt="" width="38" height="38" />
            <span>
              <strong>Guia:</strong>
              <small>Compre Sem Erro</small>
            </span>
          </a>
          <p>Reviews independentes, critérios claros e atalhos confiáveis para comprar melhor.</p>
        </div>
        <div>
          <h2>Links</h2>
          <ul>
            <li>${link("/", "Home")}</li>
            <li>${link("/privacidade", "Política de Privacidade")}</li>
            <li>${link("/contato", "Contato")}</li>
          </ul>
        </div>
        <div>
          <h2>Transparência</h2>
          <p>Alguns links podem gerar comissão de afiliado, sem custo extra para você.</p>
        </div>
      </div>
    </footer>
  `;
}

function renderHome() {
  setMeta(
    "Guia: Compre Sem Erro | Reviews honestos e escolhas inteligentes",
    "Reviews de produtos, comparativos e guias de compra para escolher com segurança."
  );

  const recentPosts = sortByRecent();
  const topPosts = sortByViews(posts).slice(0, 4);

  return `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">reviews claros + links de afiliados</p>
          <h1>Escolha produtos melhores sem cair em compra por impulso.</h1>
          <p>
            O Guia: Compre Sem Erro transforma especificações, avaliações e preço em recomendações práticas para sua rotina.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="${withBase("/busca")}" data-link>Explorar reviews</a>
            <a class="button button-secondary" href="#mais-visitados">Ver mais visitados</a>
          </div>
        </div>
        <div class="hero-panel" aria-label="Resumo editorial do Guia">
          <div class="score-card">
            <span>Critérios avaliados</span>
            <strong>6</strong>
            <small>preço, durabilidade, uso real, garantia, reputação e custo-benefício</small>
          </div>
          <div class="hero-product">
            <img src="${asset("assets/products/notebook.svg")}" alt="Ilustração de notebook avaliado" />
          </div>
          <div class="trust-list">
            <span>✓ Comparativos objetivos</span>
            <span>✓ Categorias bem organizadas</span>
            <span>✓ Indicação de afiliado sinalizada</span>
          </div>
        </div>
      </div>
    </section>

    <section class="container page-layout">
      <div class="content-stack">
        ${renderCarousel(recentPosts.slice(0, 5))}
        <section id="mais-visitados" class="section-block">
          <div class="section-heading">
            <p class="eyebrow">popular agora</p>
            <h2>Posts mais visitados</h2>
          </div>
          <div class="post-grid">
            ${topPosts.map(renderPostCard).join("")}
          </div>
        </section>
      </div>
      ${renderSidebar()}
    </section>
  `;
}

function renderCarousel(items) {
  const activePost = items[carouselIndex % items.length];
  const category = categoryById(activePost.categoryId);

  return `
    <section class="section-block carousel-block" aria-labelledby="recentes-title">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">acabou de sair</p>
          <h2 id="recentes-title">Posts mais recentes</h2>
        </div>
        <div class="carousel-controls" aria-label="Controles do carrossel">
          <button class="icon-button" type="button" data-carousel="prev" aria-label="Post anterior">‹</button>
          <button class="icon-button" type="button" data-carousel="next" aria-label="Próximo post">›</button>
        </div>
      </div>
      <article class="carousel-card" aria-live="polite">
        <div class="carousel-media">
          <img src="${asset(activePost.image)}" alt="Ilustração do review: ${activePost.title}" />
        </div>
        <div class="carousel-copy">
          <span class="category-pill" style="--pill-color: ${category.color}">${category.name}</span>
          <h3>${activePost.title}</h3>
          <p>${activePost.excerpt}</p>
          <div class="post-meta">
            <span>${formatDate(activePost.date)}</span>
            <span>${activePost.readTime}</span>
            <span>${formatViews(activePost.views)} visitas</span>
          </div>
          <a class="button button-primary" href="${activePost.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener">
            Ver oferta indicada
          </a>
        </div>
      </article>
      <div class="carousel-dots" aria-label="Posts no carrossel">
        ${items
          .map(
            (_, index) =>
              `<button type="button" class="${index === carouselIndex ? "is-active" : ""}" data-carousel-index="${index}" aria-label="Ir para o post ${
                index + 1
              }"></button>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderPostCard(post) {
  const category = categoryById(post.categoryId);
  return `
    <article class="post-card">
      <a href="${post.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" aria-label="Abrir oferta indicada para ${post.title}">
        <img src="${asset(post.image)}" alt="" loading="lazy" />
      </a>
      <div class="post-card-body">
        <span class="category-pill" style="--pill-color: ${category.color}">${category.name}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="post-meta">
          <span>${formatDate(post.date)}</span>
          <span>★ ${post.rating.toFixed(1)}</span>
          <span>${formatViews(post.views)} visitas</span>
        </div>
      </div>
    </article>
  `;
}

function renderSidebar() {
  const categoryList = getCategories();
  const recent = sortByRecent().slice(0, 4);

  return `
    <aside class="sidebar" aria-label="Categorias e posts recentes">
      <section class="sidebar-panel">
        <h2>Categorias</h2>
        <div class="category-list">
          ${categoryList
            .map(
              (category) => `
                <a class="category-link" href="${withBase(`/busca?q=${encodeURIComponent(category.name)}`)}" data-link>
                  <span style="--category-color: ${category.color}"></span>
                  <strong>${category.name}</strong>
                  <small>${category.description}</small>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="sidebar-panel">
        <h2>Recentes</h2>
        <div class="mini-post-list">
          ${recent
            .map(
              (post) => `
                <a href="${withBase(`/busca?q=${encodeURIComponent(post.title)}`)}" data-link>
                  <img src="${asset(post.image)}" alt="" loading="lazy" />
                  <span>
                    <strong>${post.title}</strong>
                    <small>${formatDate(post.date)}</small>
                  </span>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
    </aside>
  `;
}

function renderSearch() {
  const params = new URLSearchParams(window.location.search);
  const term = params.get("q") || "";
  const results = searchPosts(term);

  setMeta(
    term ? `Busca por "${term}" | Guia: Compre Sem Erro` : "Busca | Guia: Compre Sem Erro",
    "Encontre reviews por produto, categoria, tema ou necessidade de compra."
  );

  return `
    <section class="container search-page">
      <div class="section-heading">
        <p class="eyebrow">busca</p>
        <h1>${term ? `Resultados para "${term}"` : "Todos os reviews"}</h1>
        <p>${results.length} ${results.length === 1 ? "post encontrado" : "posts encontrados"}.</p>
      </div>
      <div class="page-layout">
        <div class="post-grid search-results">
          ${results.length ? results.map(renderPostCard).join("") : renderEmptySearch(term)}
        </div>
        ${renderSidebar()}
      </div>
    </section>
  `;
}

function renderEmptySearch(term) {
  return `
    <div class="empty-state">
      <h2>Nenhum resultado encontrado</h2>
      <p>Tente buscar por categoria, tipo de produto ou necessidade. Exemplo: notebook, cozinha, ergonomia.</p>
      <a class="button button-primary" href="${withBase("/busca")}" data-link>Ver todos os reviews</a>
    </div>
  `;
}

function renderPrivacy() {
  setMeta(
    "Política de Privacidade | Guia: Compre Sem Erro",
    "Entenda como o Guia: Compre Sem Erro trata dados, cookies e links de afiliados."
  );

  return `
    <section class="container text-page">
      <p class="eyebrow">transparência</p>
      <h1>Política de Privacidade</h1>
      <p>
        Esta página resume como o Guia: Compre Sem Erro lida com informações de navegação, contato e links de afiliados.
      </p>
      <h2>Dados coletados</h2>
      <p>
        Podemos receber informações enviadas voluntariamente em formulários de contato e dados técnicos agregados de navegação,
        como páginas acessadas, dispositivo e origem do tráfego.
      </p>
      <h2>Cookies e afiliados</h2>
      <p>
        Links para lojas parceiras podem usar identificadores de afiliado. Ao clicar nesses links, a loja de destino pode
        registrar cookies próprios para atribuir comissão, sem alterar o preço final para você.
      </p>
      <h2>Uso das informações</h2>
      <p>
        Os dados são usados para responder contatos, melhorar conteúdos, entender categorias mais úteis e manter a operação do site.
      </p>
      <h2>Contato</h2>
      <p>
        Para dúvidas sobre privacidade, acesse a página de contato e envie sua solicitação.
      </p>
    </section>
  `;
}

function renderContact() {
  setMeta(
    "Contato | Guia: Compre Sem Erro",
    "Fale com o Guia: Compre Sem Erro para sugestões, dúvidas comerciais e pedidos editoriais."
  );

  return `
    <section class="container contact-page">
      <div class="section-heading">
        <p class="eyebrow">fale conosco</p>
        <h1>Contato</h1>
        <p>Envie sugestões de produtos, dúvidas sobre reviews ou propostas comerciais.</p>
      </div>
      <div class="contact-grid">
        <form class="contact-form" aria-label="Formulario de contato">
          <label>
            Nome
            <input type="text" name="name" autocomplete="name" required />
          </label>
          <label>
            E-mail
            <input type="email" name="email" autocomplete="email" required />
          </label>
          <label>
            Assunto
            <select name="subject">
              <option>Sugestão de review</option>
              <option>Parceria ou afiliados</option>
              <option>Dúvida sobre conteúdo</option>
            </select>
          </label>
          <label>
            Mensagem
            <textarea name="message" rows="6" required></textarea>
          </label>
          <button class="button button-primary" type="submit">Enviar mensagem</button>
          <p class="form-note" role="status"></p>
        </form>
        <aside class="contact-aside">
          <h2>Critérios editoriais</h2>
          <p>
            Priorizamos produtos com procura real, avaliações consistentes e informações suficientes para comparação justa.
          </p>
          <ul>
            <li>Reviews com pontos fortes e limitações.</li>
            <li>Links de afiliados identificados.</li>
            <li>Atualizações quando preços ou versões mudarem.</li>
          </ul>
        </aside>
      </div>
    </section>
  `;
}

function renderSettings() {
  setMeta(
    "Configurações DEV | Guia: Compre Sem Erro",
    "Gerencie categorias locais do Guia: Compre Sem Erro em modo de desenvolvimento."
  );

  if (!isDevMode()) {
    return `
      <section class="container text-page">
        <p class="eyebrow">acesso restrito</p>
        <h1>Configurações disponíveis apenas em modo DEV</h1>
        <p>Esta área fica bloqueada fora do ambiente local. Para demonstração, use localhost ou acrescente <code>?dev=1</code>.</p>
        <a class="button button-primary" href="${withBase("/")}" data-link>Voltar para Home</a>
      </section>
    `;
  }

  return `
    <section class="container settings-page">
      <div class="section-heading">
        <p class="eyebrow">modo DEV</p>
        <h1>Configurações de categorias</h1>
        <p>Gerencie categorias disponíveis nesta demonstração. As alterações ficam salvas apenas no navegador.</p>
      </div>
      <form class="settings-form" aria-label="Adicionar categoria">
        <label>
          Nome da categoria
          <input type="text" name="name" placeholder="Ex.: Eletrônicos" required />
        </label>
        <label>
          Descrição
          <input type="text" name="description" placeholder="Breve descrição da categoria" required />
        </label>
        <label>
          Cor
          <input type="color" name="color" value="#0f766e" />
        </label>
        <button class="button button-primary" type="submit">Adicionar categoria</button>
      </form>
      <div class="settings-list" aria-live="polite">
        ${renderCategoryEditor()}
      </div>
    </section>
  `;
}

function renderCategoryEditor() {
  return getCategories()
    .map(
      (category) => `
        <article class="category-editor" data-category-id="${category.id}">
          <span style="--category-color: ${category.color}"></span>
          <div>
            <strong>${category.name}</strong>
            <p>${category.description}</p>
          </div>
          <button type="button" class="text-button" data-remove-category="${category.id}">Remover</button>
        </article>
      `
    )
    .join("");
}

function renderNotFound() {
  setMeta("Página não encontrada | Guia: Compre Sem Erro", "A página solicitada não foi encontrada.");
  return `
    <section class="container text-page">
      <p class="eyebrow">404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe ou foi movido.</p>
      <a class="button button-primary" href="${withBase("/")}" data-link>Voltar para Home</a>
    </section>
  `;
}

function bindNavigation() {
  document.querySelectorAll("[data-link]").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      event.preventDefault();
      const url = new URL(href, window.location.origin);
      navigate(`${url.pathname.replace(basePath, "")}${url.search}`);
    });
  });
}

function bindSearch() {
  const form = document.querySelector(".search-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const query = String(data.get("q") || "").trim();
    navigate(`/busca${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  });
}

function bindRouteBehaviors(path) {
  bindCarousel();
  bindContactForm();
  if (path === "/configuracoes") bindSettingsForm();
}

function bindCarousel() {
  const buttons = document.querySelectorAll("[data-carousel]");
  const dots = document.querySelectorAll("[data-carousel-index]");
  if (!buttons.length && !dots.length) return;

  const itemsLength = Math.min(sortByRecent().length, 5);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.carousel === "next" ? 1 : -1;
      carouselIndex = (carouselIndex + direction + itemsLength) % itemsLength;
      renderApp();
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      carouselIndex = Number(dot.dataset.carouselIndex);
      renderApp();
    });
  });
}

function bindContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    const note = form.querySelector(".form-note");
    note.textContent = "Mensagem registrada para demonstração. Conecte um provedor de envio quando publicar.";
  });
}

function bindSettingsForm() {
  const form = document.querySelector(".settings-form");
  const list = document.querySelector(".settings-list");
  if (!form || !list) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const description = String(data.get("description") || "").trim();
    const color = String(data.get("color") || "#0f766e");
    if (!name || !description) return;

    const id = normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const nextCategories = [...getCategories().filter((category) => category.id !== id), { id, name, description, color }];
    saveCategories(nextCategories);
    list.innerHTML = renderCategoryEditor();
    form.reset();
    bindCategoryRemoval(list);
  });

  bindCategoryRemoval(list);
}

function bindCategoryRemoval(list) {
  list.querySelectorAll("[data-remove-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.removeCategory;
      saveCategories(getCategories().filter((category) => category.id !== id));
      list.innerHTML = renderCategoryEditor();
      bindCategoryRemoval(list);
    });
  });
}

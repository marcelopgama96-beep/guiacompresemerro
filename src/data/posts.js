export const categories = [
  {
    id: "tecnologia",
    name: "Tecnologia",
    description: "Notebooks, acessorios e gadgets para rotina conectada.",
    color: "#0f766e"
  },
  {
    id: "casa",
    name: "Casa Inteligente",
    description: "Itens praticos para conforto, limpeza e automacao domestica.",
    color: "#f59e0b"
  },
  {
    id: "cozinha",
    name: "Cozinha",
    description: "Eletroportateis e utensilios que valem espaco na bancada.",
    color: "#e11d48"
  },
  {
    id: "bem-estar",
    name: "Bem-estar",
    description: "Produtos para cuidado pessoal, saude e rotina mais leve.",
    color: "#2563eb"
  },
  {
    id: "mobilidade",
    name: "Mobilidade",
    description: "Acessorios, bicicletas e itens para se mover melhor.",
    color: "#7c3aed"
  }
];

export const posts = [
  {
    id: "tanquinho-colormaq-lcs-10kg",
    title: "Tanquinho Colormaq LCS 10kg vale a pena? Review para lavanderias compactas",
    excerpt:
      "Analisamos capacidade, consumo, programas de lavagem e avaliações de usuários para entender se o modelo é uma boa compra.",
    categoryId: "casa",
    author: "Equipe Guia",
    date: "2026-09-25",
    readTime: "8 min",
    views: 7718,
    rating: 4.7,
    image: "https://carrefourbr.vtexassets.com/arquivos/ids/192755044/image-0.jpg?v=638845581750870000",
    gallery: [
      {
        src: "https://carrefourbr.vtexassets.com/arquivos/ids/192755044/image-0.jpg?v=638845581750870000",
        alt: "Tanquinho Colormaq LCS 10kg prata em vista frontal"
      },
      {
        src: "https://imgs.via.com.br/55003066/2xg.jpg",
        alt: "Tanquinho Colormaq LCS 10kg com tampa aberta"
      },
      {
        src: "https://lojasguaibim.vtexassets.com/arquivos/ids/165032-800-auto?aspect=true&height=auto&v=638007487607200000&width=800",
        alt: "Interior do cesto do Tanquinho Colormaq LCS 10kg"
      },
      {
        src: "https://baianao.com.br/cdn/shop/files/WhatsApp-Image-2024-12-23-at-10.46.05_3f3be104-a6af-4500-83d2-f46cc89c4752.webp?v=1769631228",
        alt: "Tanquinho Colormaq LCS 10kg com medidas externas"
      }
    ],
    contentPath: "posts/tanquinho-colormaq-lcs-10kg.md",
    affiliateUrl:
      "https://www.mercadolivre.com.br/tanquinho-colormaq-lavadora-roupas-semi-automatica-lcs-10kg-cor-prata/p/MLB14815390?pdp_filters=deal%3AMLB1578289-1&extra_comm=false&brand_comm=false#polycard_client=affiliates&wid=MLB6136385922&sid=affiliates",
    tags: ["tanquinho", "lavanderia", "colormaq", "10kg", "casa"],
    featured: true
  },
  {
    id: "fone-bluetooth-cancelamento-ruido",
    title: "Fone Bluetooth com cancelamento de ruido: o que observar antes de comprar",
    excerpt:
      "Comparamos conforto, bateria, microfone e isolamento para encontrar o melhor equilibrio entre preco e qualidade.",
    categoryId: "tecnologia",
    author: "Equipe Guia",
    date: "2026-09-20",
    readTime: "7 min",
    views: 18340,
    rating: 4.7,
    image: "assets/products/fone-bluetooth.svg",
    affiliateUrl: "https://example.com/afiliado/fone-bluetooth",
    tags: ["audio", "bluetooth", "home office"],
    featured: true
  },
  {
    id: "air-fryer-familia",
    title: "Air fryer para familia: capacidade, potencia e limpeza fazem diferenca",
    excerpt:
      "Um guia direto para escolher uma air fryer que aguente o uso diario sem virar trambolho na cozinha.",
    categoryId: "cozinha",
    author: "Lia Martins",
    date: "2026-09-18",
    readTime: "6 min",
    views: 22180,
    rating: 4.8,
    image: "assets/products/air-fryer.svg",
    affiliateUrl: "https://example.com/afiliado/air-fryer",
    tags: ["cozinha", "eletroportatil", "familia"],
    featured: true
  },
  {
    id: "robo-aspirador-apartamento",
    title: "Robo aspirador em apartamento: quando vale o investimento?",
    excerpt:
      "Mapeamento, bateria, altura e reservatorio sao os pontos que separam comodidade real de compra por impulso.",
    categoryId: "casa",
    author: "Equipe Guia",
    date: "2026-09-15",
    readTime: "8 min",
    views: 19610,
    rating: 4.6,
    image: "assets/products/robo-aspirador.svg",
    affiliateUrl: "https://example.com/afiliado/robo-aspirador",
    tags: ["limpeza", "casa inteligente", "apartamento"],
    featured: true
  },
  {
    id: "smartwatch-custo-beneficio",
    title: "Smartwatch custo-beneficio: sensores, tela e bateria sem exagero",
    excerpt:
      "Nem todo relogio inteligente precisa custar caro. Veja os criterios que realmente impactam o uso.",
    categoryId: "bem-estar",
    author: "Rafa Nunes",
    date: "2026-09-12",
    readTime: "5 min",
    views: 16490,
    rating: 4.5,
    image: "assets/products/smartwatch.svg",
    affiliateUrl: "https://example.com/afiliado/smartwatch",
    tags: ["fitness", "saude", "tecnologia"],
    featured: false
  },
  {
    id: "cadeira-ergonomica-home-office",
    title: "Cadeira ergonomica para home office: ajustes que protegem sua rotina",
    excerpt:
      "Altura, apoio lombar, bracos e espuma: entenda o que testar antes de fechar a compra.",
    categoryId: "casa",
    author: "Equipe Guia",
    date: "2026-09-09",
    readTime: "9 min",
    views: 24720,
    rating: 4.9,
    image: "assets/products/cadeira.svg",
    affiliateUrl: "https://example.com/afiliado/cadeira-ergonomica",
    tags: ["home office", "ergonomia", "conforto"],
    featured: false
  },
  {
    id: "notebook-estudos-trabalho",
    title: "Notebook para estudo e trabalho: configuracao equilibrada em 2026",
    excerpt:
      "Processador, memoria, tela e armazenamento explicados sem enrolacao para evitar gargalos no dia a dia.",
    categoryId: "tecnologia",
    author: "Lia Martins",
    date: "2026-09-06",
    readTime: "10 min",
    views: 30180,
    rating: 4.8,
    image: "assets/products/notebook.svg",
    affiliateUrl: "https://example.com/afiliado/notebook",
    tags: ["notebook", "estudo", "trabalho"],
    featured: true
  },
  {
    id: "garrafa-termica-trabalho",
    title: "Garrafa termica para trabalho: vedacao e temperatura sem surpresa",
    excerpt:
      "Avaliamos materiais, facilidade de limpeza e transporte para quem leva cafe ou agua todos os dias.",
    categoryId: "bem-estar",
    author: "Rafa Nunes",
    date: "2026-09-02",
    readTime: "4 min",
    views: 11420,
    rating: 4.4,
    image: "assets/products/garrafa.svg",
    affiliateUrl: "https://example.com/afiliado/garrafa-termica",
    tags: ["rotina", "trabalho", "hidratacao"],
    featured: false
  },
  {
    id: "capacete-bike-urbana",
    title: "Capacete para bike urbana: seguranca, conforto e ventilacao",
    excerpt:
      "Um bom capacete precisa proteger bem, ajustar facil e nao virar incomodo depois de dez minutos.",
    categoryId: "mobilidade",
    author: "Equipe Guia",
    date: "2026-08-29",
    readTime: "6 min",
    views: 9820,
    rating: 4.6,
    image: "assets/products/capacete.svg",
    affiliateUrl: "https://example.com/afiliado/capacete-bike",
    tags: ["bike", "seguranca", "mobilidade"],
    featured: false
  }
];

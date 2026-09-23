import {
  educationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  publicationSchema,
  writingSchema,
} from "./schema";

export const profile = profileSchema.parse({
  name: "Marcus Gawronsky",
  givenName: "Marcus",
  familyName: "Gawronsky",
  headline: "Applied AI, decision science, quantitative research, and reliable software",
  summary:
    "I turn mathematical and computational research into reproducible evidence, working systems, and tools that can be inspected, tested, and trusted.",
  location: "Cape Town, South Africa",
  roles: ["Technology leader", "Quantitative researcher", "Research software engineer"],
  interests: [
    "Applied artificial intelligence",
    "Causal inference",
    "Information geometry",
    "Quantitative finance",
    "Reproducible research",
  ],
  links: [
    { label: "GitHub", url: "https://github.com/marcusinthesky" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/marcussky/" },
    { label: "ORCID", url: "https://orcid.org/0000-0003-0554-0850" },
    {
      label: "Google Scholar",
      url: "https://scholar.google.com/citations?hl=en&user=C_c7ZFEAAAAJ",
    },
    { label: "Hugging Face", url: "https://huggingface.co/marcusinthesky" },
    { label: "Kaggle", url: "https://www.kaggle.com/marcusgawronsky" },
  ],
});

export const publications = publicationSchema.array().parse([
  {
    slug: "systematic-covariance-envelopes",
    title:
      "Systematic Covariance Envelopes from Wasserstein Geometry: Evidence from Language-Model Representations",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2024,
    status: "Submitted / under review",
    lede: "How much systematic covariance can be recovered from the geometry of probability-valued representations?",
    summary:
      "Uses Wasserstein geometry over language-model representations to study systematic covariance structure without treating text as a bag of features.",
    keywords: ["Wasserstein geometry", "representation learning", "covariance"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2410.23447" }],
  },
  {
    slug: "wasserstein-barycentric-interaction-fields",
    title:
      "Wasserstein-Barycentric Interaction Fields for Spatial Factor Models: Evidence from Language-Model Representations",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2026,
    status: "Submitted / under review",
    lede: "Can distributional similarity define economically meaningful interaction fields?",
    summary:
      "Develops spatial factor structures from Wasserstein barycentres of textual representations, connecting distributional geometry with cross-sectional interaction.",
    keywords: ["spatial econometrics", "factor models", "optimal transport"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2608.21699" }],
  },
  {
    slug: "portfolio-risk-bounds",
    title:
      "Portfolio Risk Bounds without Cross-Asset Return Covariances: Distributional Fields from Language-Model Representations",
    authors: ["Marcus Gawronsky", "Chun-Sung Huang"],
    year: 2026,
    status: "Submitted / under review",
    lede: "Can portfolio risk be bounded without estimating every cross-asset covariance directly?",
    summary:
      "Studies information-derived dependence structures and distributional fields as a route to portfolio-risk bounds under weaker covariance information.",
    keywords: ["portfolio risk", "distributional fields", "language models"],
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2608.21706" }],
  },
  {
    slug: "pricing-offshore-services",
    title: "Pricing Offshore Services: Evidence from the Paradise Papers",
    authors: ["Marcus Gawronsky"],
    year: 2022,
    status: "Master's thesis",
    summary:
      "An event study combining graph theory, network econometrics, and spatial econometrics to examine offshore-service pricing.",
    keywords: ["event study", "network econometrics", "Paradise Papers"],
    links: [{ label: "UCT repository", url: "https://open.uct.ac.za/handle/11427/36849" }],
  },
]);

export const projects = projectSchema.array().parse([
  {
    slug: "pricing-perspective",
    title: "Pricing Perspective",
    lede: "Can information extracted from language models become a measurable object in quantitative finance?",
    summary:
      "A reproducible research programme connecting probability-valued firm information, Wasserstein geometry, spatial interaction, asset co-movement, and portfolio risk—built with explicit provenance, tested pipelines, and machine-checked proofs.",
    narrative: [
      "Pricing Perspective co-locates research manuscripts, data pipelines, simulations, formal Lean proofs, and a static publication website so that claims and evidence evolve atomically.",
      "The public site presents three connected papers and their replication surface without placing notebooks, external APIs, or third-party scripts in the critical rendering path.",
    ],
    role: "Research, modelling, software architecture, and reproducibility",
    technologies: ["Python", "Lean 4", "LaTeX", "Next.js", "Nix", "DVC"],
    featured: true,
    links: [
      { label: "Website", url: "https://marcusinthesky.github.io/PricingPerspective/" },
      { label: "GitHub", url: "https://github.com/marcusinthesky/PricingPerspective" },
    ],
  },
  {
    slug: "precarious-papers",
    title: "Precarious Papers",
    lede: "What does the market learn from public financial-data breaches?",
    summary:
      "An empirical investigation of offshore entities, leaked disclosures, network structure, and market pricing, combining event studies, graph theory, and reproducible analysis.",
    narrative: [
      "The project grew from the master's research programme and combines event-study design, graph structure, and reproducible analytical pipelines.",
    ],
    role: "Research and implementation",
    technologies: ["Python", "Jupyter", "Econometrics", "Graph theory"],
    featured: true,
    links: [{ label: "GitHub", url: "https://github.com/marcusinthesky/precarious-papers" }],
  },
  {
    slug: "talks",
    title: "Talks",
    lede: "Explaining technical ideas without flattening them.",
    summary:
      "Presentations for research, industry, and leadership audiences on machine learning, quantitative methods, reproducibility, and organisational strategy.",
    narrative: [
      "A public archive of presentation material designed to make technical ideas legible beyond their original room.",
    ],
    role: "Author and presenter",
    technologies: ["HTML", "Scientific communication", "Data visualisation"],
    featured: true,
    links: [{ label: "GitHub", url: "https://github.com/marcusinthesky/Talks" }],
  },
]);

export const writing = writingSchema.array().parse([
  {
    slug: "models-are-markup-tokens-are-features",
    title: "Models are Markup, Tokens are Features",
    summary:
      "A practical account of treating model structure as markup and token-specific adaptation as a feature-selection problem.",
    source: "Hugging Face",
    publishedAt: "2026-08-20",
    canonicalUrl:
      "https://huggingface.co/blog/marcusinthesky/models-are-markup-tokens-are-features",
    local: false,
  },
  {
    slug: "reproducibility-is-a-graph",
    title: "Reproducibility is a Graph",
    summary:
      "A reproducible result is not a folder of code. It is a dependency structure connecting data, assumptions, transformations, software, environments, and outputs.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-05",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/reproducibility-is-a-graph/",
    local: false,
  },
  {
    slug: "tidal-wave-of-ai-research-in-finance",
    title: "The Tidal Wave of AI Research in Finance",
    summary:
      "AI has expanded what can be measured in finance. It has also expanded the space of plausible-looking mistakes: a note on scale, validation, and methodological discipline.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-04",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/tidal-wave-of-ai-research-in-finance/",
    local: false,
  },
  {
    slug: "vintage-reproducible-ettax-models",
    title: "Vintage Reproducible ET Tax Models",
    summary:
      "Analytical results change when data, policy rules, assumptions, and software change. A practical note on preserving vintages so historical results stay reconstructable.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-03",
    canonicalUrl:
      "https://marcusinthesky.github.io/PricingPerspective/blog/vintage-reproducible-ettax-models/",
    local: false,
  },
  {
    slug: "beyond-average-revenue",
    title: "Beyond Average Revenue",
    summary:
      "An experiment-analysis perspective on commercial impact beyond a single average treatment effect.",
    source: "Solenya",
    publishedAt: "2026-01-24",
    canonicalUrl: "https://www.solenya.ai/blog/24-ab-test-myrunway",
    local: false,
  },
  {
    slug: "architecting-solenya-api-v1",
    title: "Architecting Solenya API V1",
    summary: "Design choices behind an applied-AI API and the infrastructure around it.",
    source: "Solenya",
    publishedAt: "2025-01-23",
    canonicalUrl: "https://www.solenya.ai/blog/23-ingredients-and-engine",
    local: false,
  },
  {
    slug: "what-is-zero-shot-discovery",
    title: "What is Zero-shot Discovery?",
    summary: "An introduction to finding useful structure without task-specific labelled examples.",
    source: "Solenya",
    publishedAt: "2024-01-03",
    canonicalUrl: "https://www.solenya.ai/blog/03-zs-discovery",
    local: false,
  },
]);

export const experience = experienceSchema.array().parse([
  {
    organization: "Solenya",
    role: "Co-Founder & Chief Technology Officer",
    location: "Cape Town, South Africa",
    period: "June 2024 — present",
    highlights: [
      "Lead the technical organisation across research, product, and infrastructure.",
      "Built production multimodal inference and the supporting cloud and ML platform.",
      "Designed causal and statistical measurement for large-scale commercial experiments.",
    ],
  },
  {
    organization: "MyRunway",
    role: "Senior Data Scientist; Data Scientist",
    location: "Cape Town, South Africa",
    period: "January 2021 — April 2024",
    highlights: [
      "Built data-platform, experimentation, causal-measurement, optimisation, and multimodal-ML systems.",
      "Developed reusable analytical marts used across pricing, purchasing, and stock management.",
    ],
  },
  {
    organization: "DataProphet",
    role: "Junior Data Scientist",
    location: "Cape Town, South Africa",
    period: "August 2019 — January 2021",
    highlights: [
      "Delivered industrial machine-learning work from modelling through deployment and handover.",
    ],
  },
  {
    organization: "WorldQuant University via Hubble Studios",
    role: "Lecturer & Subject Matter Expert in Financial Engineering",
    location: "Cape Town, South Africa",
    period: "September 2018 — February 2019",
    highlights: [
      "Developed graduate material covering risk, simulation, machine learning, and macroeconomic modelling.",
    ],
  },
]);

export const education = educationSchema.array().parse([
  {
    institution: "University of Cape Town",
    qualification: "PhD Candidate in Finance",
    period: "2022 — expected 2027",
    summary:
      "Research in spatial econometrics, representation learning, functional data analysis, and information geometry.",
  },
  {
    institution: "University of Cape Town",
    qualification: "MSc Advanced Analytics & Decision Sciences",
    period: "2019 — 2021",
    summary: "Major in Statistics with Data Science; thesis on pricing offshore services.",
  },
  {
    institution: "University of Cape Town",
    qualification: "BBusSc Finance",
    period: "2014 — 2018",
    summary: "Finance, Investments & Banking major with an Economics minor.",
  },
]);

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
    "I translate mathematical and computational research into production systems, reproducible evidence, and tools people can trust.",
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
    { label: "Zindi", url: "https://zindi.africa/users/marcusinthesky" },
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
    summary:
      "Uses distributional geometry over language-model representations to study systematic covariance structure.",
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
    summary:
      "Develops interaction fields that connect Wasserstein barycentres, textual representations, and spatial factor models.",
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
    summary:
      "Studies information-derived portfolio risk bounds that do not require direct cross-asset covariance estimates.",
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
    summary:
      "A reproducible research programme connecting probability-valued firm information, asset co-movement, spatial interaction fields, and certified diversification bounds.",
    narrative: [
      "Pricing Perspective co-locates research manuscripts, data pipelines, simulations, formal Lean proofs, and a static publication website so that claims and evidence evolve atomically.",
      "The public site presents three connected papers and their replication surface without placing notebooks, external APIs, or third-party scripts in the critical rendering path.",
    ],
    role: "Research, modelling, software architecture, and reproducibility",
    technologies: ["Python", "Lean 4", "LaTeX", "Next.js", "Nix", "DVC"],
    featured: true,
    links: [
      { label: "Website", url: "https://marcusinthesky.github.io/pricing-perspective/" },
      { label: "GitHub", url: "https://github.com/marcusinthesky/PricingPerspective" },
    ],
  },
  {
    slug: "precarious-papers",
    title: "Precarious Papers",
    summary:
      "A financial-econometrics investigation of public financial-data breaches, offshore entities, and market pricing.",
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
    summary:
      "Presentations for industry and research audiences on machine learning, quantitative methods, and organisational strategy.",
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
      "Why research reproducibility is better understood as a dependency graph than as a folder of scripts.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-05",
    canonicalUrl:
      "https://marcusinthesky.github.io/pricing-perspective/blog/reproducibility-is-a-graph/",
    local: false,
  },
  {
    slug: "tidal-wave-of-ai-research-in-finance",
    title: "The Tidal Wave of AI Research in Finance",
    summary:
      "A research perspective on the scale, opportunities, and methodological risks of AI work in finance.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-04",
    canonicalUrl:
      "https://marcusinthesky.github.io/pricing-perspective/blog/tidal-wave-of-ai-research-in-finance/",
    local: false,
  },
  {
    slug: "vintage-reproducible-ettax-models",
    title: "Vintage Reproducible ET Tax Models",
    summary:
      "A note on preserving analytical vintages and making tax-model results reproducible over time.",
    source: "Pricing Perspective",
    publishedAt: "2026-09-03",
    canonicalUrl:
      "https://marcusinthesky.github.io/pricing-perspective/blog/vintage-reproducible-ettax-models/",
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

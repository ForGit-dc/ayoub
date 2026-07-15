// CLIENT-SIDE UI data only.
//
// The bot's behavior prompt and full knowledge base now live SERVER-SIDE in
// supabase/functions/_shared/knowledge.ts (so a visitor can't override the prompt
// or read the raw base). Human source of truth: /KNOWLEDGE_BASE.md + /SYSTEM_PROMPT.md.
//
// This file only holds the suggestion buttons shown in the UI. The suggestedQA
// answers are returned to the user verbatim (they do NOT go through the model),
// so keep every fact here in sync with KNOWLEDGE_BASE.md - no invented numbers.

export const suggestedPrompts = [
  "Give me a 30-second intro.",
  "Tell me about your cloud pipeline at Opinion Science.",
  "What concrete impact have you delivered?",
  "Why should a team hire you?",
];

export const suggestedQA = [
  {
    id: "intro30",
    label_en: "30-sec intro",
    label_fr: "Intro 30 s",
    user_en: "Give me a 30-second intro.",
    user_fr: "Présente-toi en 30 secondes.",
    answer_en: "I’m Ayoub El Yanboiy, a Data Engineer based in Paris and a recent ENSAI graduate (Data Science, Data Engineering). I build cloud data pipelines end to end on GCP and AWS (Cloud Functions, Apache Kafka, BigQuery, Terraform, Docker, CI/CD), with a solid statistics background from ENSAI and INED. Ask me about my cloud work at Opinion Science, my projects, or how to reach me.",
    answer_fr: "Je suis Ayoub El Yanboiy, Data Engineer basé à Paris et jeune diplômé de l’ENSAI (Data Science, Ingénierie des Données). Je construis des pipelines de données cloud de bout en bout sur GCP et AWS (Cloud Functions, Apache Kafka, BigQuery, Terraform, Docker, CI/CD), avec une vraie base statistique venue de l’ENSAI et de l’INED. Demande-moi mon travail cloud chez Opinion Science, mes projets, ou comment me joindre."
  },
  {
    id: "flagship",
    label_en: "Cloud pipeline (Opinion Science)",
    label_fr: "Pipeline cloud (Opinion Science)",
    user_en: "Tell me about your cloud pipeline at Opinion Science.",
    user_fr: "Parle-moi de ton pipeline cloud chez Opinion Science.",
    answer_en: "For my end-of-studies internship I built a cloud infrastructure to collect, process and analyze online content for LLM analysis of disinformation. It runs on GCP (Cloud Functions, Cloud Tasks) with an Apache Kafka bus, hybrid PostgreSQL + BigQuery storage, and a semantic clustering pipeline (UMAP + HDBSCAN) with GPT-4o annotation. On a September 2025 Twitter corpus of 203,456 segments (90,000 after deduplication), I produced 142 thematic clusters covering 88% of the corpus, and by annotating only 5 representatives per cluster instead of every segment, I drastically cut the LLM annotation cost.",
    answer_fr: "Pour mon stage de fin d’études, j’ai construit une infrastructure cloud pour collecter, traiter et analyser des contenus en ligne, afin d’alimenter des LLM sur la désinformation. Elle tourne sur GCP (Cloud Functions, Cloud Tasks) avec un bus Apache Kafka, un stockage hybride PostgreSQL + BigQuery, et un pipeline de clustering sémantique (UMAP + HDBSCAN) avec annotation GPT-4o. Sur un corpus Twitter de septembre 2025 de 203 456 segments (90 000 après déduplication), j’ai obtenu 142 clusters thématiques couvrant 88% du corpus, et en n’annotant que 5 représentants par cluster au lieu de chaque segment, j’ai réduit drastiquement le coût d’annotation LLM."
  },
  {
    id: "impact",
    label_en: "Concrete impact",
    label_fr: "Impact concret",
    user_en: "What concrete impact have you delivered?",
    user_fr: "Quel impact concret as-tu livré ?",
    answer_en: "At Opinion Science I replaced an hourly batch architecture with a real-time Apache Kafka orchestration, and through clustering-first annotation (UMAP + HDBSCAN + GPT-4o, only 5 representatives per cluster instead of every segment) I drastically cut the LLM annotation cost on a 203,456-segment corpus. At INED I structured a longitudinal dataset following 18,000+ children over 10 years and modeled mental-health determinants with logistic regression. I optimize for cost, reliability and scale, not just accuracy.",
    answer_fr: "Chez Opinion Science, j’ai remplacé une architecture batch horaire par une orchestration temps réel Apache Kafka, et grâce à une annotation par clustering (UMAP + HDBSCAN + GPT-4o, seulement 5 représentants par cluster au lieu de chaque segment) j’ai réduit drastiquement le coût d’annotation LLM sur un corpus de 203 456 segments. À l’INED, j’ai structuré un jeu de données longitudinal suivant 18 000+ enfants sur 10 ans et modélisé les déterminants de la santé mentale par régression logistique. J’optimise le coût, la fiabilité et le passage à l’échelle, pas seulement la précision."
  },
  {
    id: "why_hire",
    label_en: "Why hire you?",
    label_fr: "Pourquoi te recruter ?",
    user_en: "Why should a team hire you?",
    user_fr: "Pourquoi une équipe devrait-elle te recruter ?",
    answer_en: "Because I industrialize data pipelines end to end, not just notebooks. I built a cloud-native ingestion pipeline on GCP with an Apache Kafka bus and a semantic clustering pipeline that annotates only a few representatives per cluster instead of every segment, drastically cutting the LLM cost. I pair data engineering (GCP, AWS, Terraform, Docker, CI/CD) with real statistical rigor (ENSAI, and longitudinal modeling on 18,000+ children at INED), I am a DataCamp-certified Data Engineer, and I am immediately available.",
    answer_fr: "Parce que j’industrialise les pipelines de données de bout en bout, pas juste des notebooks. J’ai construit un pipeline d’ingestion cloud-native sur GCP avec un bus Apache Kafka et un pipeline de clustering sémantique qui n’annote que quelques représentants par cluster au lieu de chaque segment, réduisant drastiquement le coût LLM. J’allie l’ingénierie des données (GCP, AWS, Terraform, Docker, CI/CD) et une vraie rigueur statistique (ENSAI, et de la modélisation longitudinale sur 18 000+ enfants à l’INED), je suis certifié Data Engineer par DataCamp, et je suis disponible immédiatement."
  },
  {
    id: "cloud_stack",
    label_en: "Cloud & data stack",
    label_fr: "Stack cloud & data",
    user_en: "What cloud and data stack do you work with?",
    user_fr: "Avec quelle stack cloud et data travailles-tu ?",
    answer_en: "On GCP I work with Cloud Functions, Cloud Tasks and BigQuery; on AWS with S3, Lambda, EC2, Rekognition and DynamoDB. For orchestration and streaming I use Apache Kafka and PySpark, for Infrastructure as Code and containers Terraform and Docker, and for CI/CD GitLab CI. My databases are PostgreSQL and NoSQL (DynamoDB), and I code mainly in Python (plus Java / Spring Boot and R). Want the detail on a specific project?",
    answer_fr: "Sur GCP je travaille avec Cloud Functions, Cloud Tasks et BigQuery ; sur AWS avec S3, Lambda, EC2, Rekognition et DynamoDB. Pour l’orchestration et le streaming j’utilise Apache Kafka et PySpark, pour l’Infrastructure as Code et les conteneurs Terraform et Docker, et pour la CI/CD GitLab CI. Mes bases sont PostgreSQL et NoSQL (DynamoDB), et je code surtout en Python (plus Java / Spring Boot et R). Tu veux le détail sur un projet précis ?"
  },
  {
    id: "ined",
    label_en: "Data science at INED",
    label_fr: "Data science à l’INED",
    user_en: "What did you do at INED?",
    user_fr: "Qu’as-tu fait à l’INED ?",
    answer_en: "At INED (a French public demographic research institute) I was a Data Scientist intern. I cleaned and structured the ELFE cohort, a longitudinal dataset following 18,000+ children over 10 years, handling missing values and specific populations (twins, orphans). I then built logistic-regression models to isolate mental-health determinants (SDQ scores), selecting models with the AIC criterion, and produced statistical indicators for family-policy evaluation. This was a statistics and R role, separate from my cloud work.",
    answer_fr: "À l’INED (institut public de recherche démographique), j’étais Data Scientist en stage. J’ai nettoyé et structuré la cohorte ELFE, un jeu de données longitudinal suivant 18 000+ enfants sur 10 ans, en gérant les valeurs manquantes et les populations spécifiques (jumeaux, orphelins). J’ai ensuite construit des régressions logistiques pour isoler les déterminants de la santé mentale (scores SDQ), avec sélection de modèles par le critère AIC, et produit des indicateurs pour l’évaluation des politiques familiales. C’était un rôle de statistiques et de R, distinct de mon travail cloud."
  },
  {
    id: "contact",
    label_en: "Contact details",
    label_fr: "Coordonnées",
    user_en: "How can I contact you?",
    user_fr: "Comment te contacter ?",
    answer_en: "You can reach me by email at yanboiyayoub@gmail.com or by phone at +33 7 74 39 32 09. I’m also on LinkedIn (/in/ayoub-el-yanboiy).",
    answer_fr: "Tu peux me joindre par email à yanboiyayoub@gmail.com ou par téléphone au +33 7 74 39 32 09. Je suis aussi sur LinkedIn (/in/ayoub-el-yanboiy)."
  }
];

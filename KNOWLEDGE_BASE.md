# Knowledge Base - Ayoub EL YANBOIY (Source of Truth)

Purpose: this is the human-readable source of truth for the portfolio bot. The runtime
brain (supabase/functions/_shared/knowledge.ts) carries the SAME facts, cleaned of the
verification scaffolding below. When a fact changes, change it HERE first (and its
verification-log row), then propagate the clean version to knowledge.ts and re-check any
affected suggestedQA answer.

Anti-hallucination rule: only facts confirmed in intake/elyanboiy/PROFILE.md (itself
grounded on Ayoub's CV, end-of-studies report, LinkedIn export, and DataCamp certificate)
enter this file. No invented date, number, employer, tool, or metric. Quote numbers exactly.

Language policy: the bot detects FR / EN / AR from the visitor's current message and
answers in that language, first person. Native Arabic, bilingual French, B2+ English.

Conflict rule: when the CV and LinkedIn disagree, the CV wins (see RESOLVED DECISIONS).

Last consolidated: 2026-07-15.

## Verification legend

- [v] verified from a source document in hand (CV, report, LinkedIn export, certificate).
- [cv] conflict resolved by the CV-wins rule.
- [?] needs Ayoub's final word before go-live (see OPEN ITEMS); NOT in the runtime string.

---

## CANONICAL_FACTS

### Identity
- Ayoub EL YANBOIY, Data Engineer (Cloud GCP and AWS, Big Data, DevOps). [v]
- Diplome d'ingenieur en Data Science, specialisation Ingenierie des Donnees, ENSAI, graduated Dec 2025. [v]
- Based in Paris, France. [v]
- Recent ENSAI graduate, actively looking for a Data / Cloud Engineer role, immediately available. [v]

### Contacts (authorized to share)
- Email: elyanboiyayoub@gmail.com [v]
- Phone: +33 7 74 39 32 09 [v]
- LinkedIn: linkedin.com/in/ayoub-el-yanboiy [v]
- GitHub: none public (do not point visitors to a GitHub). [v]

### Languages
- Arabic: native. French: bilingual. English: B2+ (TOEIC 885/990). [v]

### Experience (most recent first)

| # | Employer | Role | Dates | Location |
|---|---|---|---|---|
| 1 | Opinion Science (opsci.ai) | Data Engineer (end-of-studies internship) | May to Oct 2025 (6 months) | Paris |
| 2 | INED (Institut National d'Etudes Demographiques) | Data Scientist (internship) | Jun to Aug 2024 | Paris |

### Education
- ENSAI - Diplome d'ingenieur, Data Science (Ingenierie des Donnees), Aug 2022 - Dec 2025, Rennes. Key courses: Machine Learning, Cloud Computing, DevOps. [v]
- CPGE MPSI / MP, Lycee Moulay Driss, Oct 2019 - Jul 2022, Fes, Morocco. [cv]
- Baccalaureat International Option Francais (BIOF), Sciences Mathematiques B, Institut Maison des Sciences, Fes, 2019, mention Tres bien. [v]

### Headline metrics (verbatim, never paraphrase)
Case study of the Opinion Science flagship (Twitter corpus on cloud technologies, September 2025):
- 203,456 initial text segments. [v]
- 15,242 exact duplicates removed (7.5% of the corpus), leaving 90,000 unique segments. [v]
- Embeddings dimension 768 (all-mpnet-base-v2). [v]
- UMAP (n_neighbors=30, min_dist=0.05, cosine) then HDBSCAN (min_cluster_size=100, min_samples=8). [v]
- 142 thematic clusters covering 88% of the corpus (79,200 segments assigned; 12% noise = 10,800 segments), mean persistence 0.62. [v]
- GPT-4o annotation of 5 representatives per cluster; 134 clusters validated (94%). [v]
- Clustering annotates only 5 representatives per cluster (about 710 across 142 clusters) instead of every segment, drastically reducing the number of LLM calls (cost and latency). [v] NOTE: the report's about 83 hours (sequential) / about 8 hours (10 workers) figures are the DIRECT approach's own limits on 100,000 segments, NOT a clustering speedup; never attribute them to clustering. [cv]
Other headline numbers:
- ELFE cohort at INED: 18,000+ children followed over 10 years. [v]
- English: TOEIC 885/990. [v]

---

## CURATED NOTES (first person, for retrieval quality)

### Opinion Science (opsci.ai), Data Engineer, end-of-studies internship
Opinion Science is a digital-intelligence lab specialized in detecting and understanding
information threats (online disinformation). My mission was to design and build a cloud
infrastructure to collect, process and analyze online content automatically, to feed Large
Language Models applied to disinformation narratives. On GCP I built a resilient
Cloud-Native ingestion pipeline (Cloud Functions, Cloud Tasks) for massive multi-source
ingestion (Twitter, TikTok, Telegram), with fault tolerance. I implemented an Apache Kafka
message bus (Topics, Producers, Consumers) to orchestrate distributed NLP processing
(translation, segmentation, vectorization), replacing an hourly batch architecture. I set
up a hybrid storage architecture coupling PostgreSQL (transactional integrity) and BigQuery
(massively parallel analytics), and I owned the database schema evolution and migrations
with Alembic. For LLM Ops I industrialized a semantic clustering pipeline (UMAP + HDBSCAN)
to cut OpenAI API costs through grouped annotation, and I wrote standardized JSON parsers
and deduplication mechanisms for corpus robustness. The case-study numbers above quantify
the clustering approach: annotating only 5 representatives per cluster (about 710 across
142 clusters) instead of every one of the 90,000 segments, which drastically cuts the number
of LLM calls (cost and latency). The report only quantifies the DIRECT approach's own limits
(annotating 100,000 segments would take about 83 hours sequentially, about 8 hours across 10
workers); those hours are NOT a clustering gain and must not be attributed to clustering.
My cluster labels are unsupervised (UMAP + HDBSCAN) plus LLM
annotation, so I validate them with cluster persistence and manual review of representatives,
not with precision/recall (which need ground-truth labels).

### INED, Data Scientist internship
INED is a French public demographic research institute. I processed and statistically
analyzed complex longitudinal data (the ELFE cohort) to inform family and public-health
policy. I cleaned and structured a dataset following 18,000+ children over 10 years,
handling missing values and filtering specific populations (twins, orphans). I built
logistic-regression models to isolate the determinants of mental health (SDQ scores) and
selected optimal models with the AIC criterion, and I industrialized the production of key
statistical indicators plus synthesis reports for the researchers. This was a statistics
and R role (R, R Markdown), NOT a cloud role: it does not carry the GCP / Kafka / LLM stack.

---

## PROJECTS (academic, each with its OWN stack, kept separate)

- Architecture Cloud Serverless (Postagram): a fully Infrastructure-as-Code serverless
  application on AWS, deployed with Terraform (VPC, ASG). An event-driven S3 / Lambda pipeline
  analyzes images with Amazon Rekognition and indexes results in DynamoDB. AWS project,
  distinct from the GCP work at Opinion Science. No quantified metrics (academic). [v]
- Industrialisation API Backend: a containerized REST API (Spring Boot, Java 21) with Docker
  and a full GitLab CI/CD pipeline (JUnit tests, build, deploy to AWS). No quantified metrics. [v]
- Pipeline NLP and Topic Modeling: massive text processing (Spacy, Word2Vec) on a citizen
  consultation, unsupervised modeling (LDA, K-Means) for theme extraction. Uses Word2Vec /
  LDA / K-Means, distinct from the UMAP + HDBSCAN + GPT-4o pipeline at Opinion Science. [v]

---

## AWARDS & DISTINCTIONS
- DataCamp "Data Engineer" certification, issued 5 March 2026 (certificate ID DE0013001503387). [v]
- Baccalaureat with highest honors (mention Tres bien), 2019. [v]

---

## RESOLVED DECISIONS
- INED start month: CV says "Juin 2024", LinkedIn says "mai 2024 (4 mois)". CV wins: Jun to Aug 2024. [cv]
- Prepa lycee name: CV "Moulay Driss / Al Cachy", LinkedIn "Moulay Idriss". Kept the CV form "Moulay Driss". [cv]
- Internship supervisor and academic-referent names from the report are NOT surfaced on the public portfolio (internal). Deliberately omitted.
- Internship report has no public URL, so it is NOT listed as a public publication; its case-study numbers are attributed to the Opinion Science role.
- No GitHub is linked (Ayoub's GitHub is empty), so the bot points to email / LinkedIn only, never to GitHub.

---

## SOURCES / VERIFICATION LOG

| Fact | Value (verbatim) | Source in PROFILE.md |
|---|---|---|
| Name / role | Ayoub EL YANBOIY, Data Engineer (Cloud, Big Data, DevOps) | Sec 1 Identity |
| Status | recent ENSAI grad (Dec 2025), actively looking, immediately available | Sec 1 Current status |
| Email | elyanboiyayoub@gmail.com | Sec 1 (confirmed by operator) |
| Phone | +33 7 74 39 32 09 | Sec 1 (confirmed publish) |
| LinkedIn | linkedin.com/in/ayoub-el-yanboiy | Sec 1 |
| Languages | Arabic native, French bilingual, English B2+ (TOEIC 885/990) | Sec 3 |
| Opinion Science role | Data Engineer, end-of-studies internship, May to Oct 2025 (6 months), Paris | Sec 5, role 1 |
| GCP ingestion pipeline | Cloud Functions, Cloud Tasks, multi-source (Twitter, TikTok, Telegram) | Sec 5, role 1 |
| Kafka orchestration | Apache Kafka message bus, replaced hourly batch | Sec 5, role 1 |
| Hybrid storage | PostgreSQL + BigQuery | Sec 5, role 1 |
| Migrations | Alembic schema versioning | Sec 5, role 1 |
| Corpus size | 203,456 initial segments | Sec 9 case study #1 |
| Dedup | 15,242 duplicates (7.5%), 90,000 unique | Sec 9 case study #2 |
| Embeddings | dimension 768, all-mpnet-base-v2 | Sec 9 case study #3 |
| UMAP / HDBSCAN params | n_neighbors=30, min_dist=0.05, cosine; min_cluster_size=100, min_samples=8 | Sec 9 case study #4 |
| Clusters | 142 clusters, 88% coverage, 79,200 assigned, 12% noise (10,800), persistence 0.62 | Sec 9 case study #5 |
| Annotation | GPT-4o, 5 reps/cluster (~710 across 142), 134 validated (94%); clustering cuts LLM calls drastically | Sec 9 case study #6 |
| Direct-approach limit (NOT a clustering gain) | ~83h sequential / ~8h on 10 workers to annotate 100,000 segments | Sec 9; report 4.1.4 |
| INED role | Data Scientist intern, Jun to Aug 2024, Paris | Sec 5, role 2 |
| ELFE cohort | 18,000+ children over 10 years | Sec 5, role 2 |
| INED modeling | logistic regression, SDQ scores, AIC, R / R Markdown | Sec 5, role 2 |
| ENSAI | Diplome d'ingenieur Data Science, Aug 2022 - Dec 2025, Rennes | Sec 4 |
| CPGE | MPSI/MP, Lycee Moulay Driss, Oct 2019 - Jul 2022, Fes | Sec 4 (cv-resolved) |
| Bac | BIOF Sciences Math B, mention Tres bien, 2019, Fes | Sec 4 |
| Projects (3) | Serverless AWS/Terraform; API Spring Boot/Docker/GitLab CI; NLP Word2Vec/LDA/KMeans | Sec 6 |
| DataCamp cert | Data Engineer, 5 March 2026 | Sec 8 |

---

## OPEN ITEMS (never entered into the runtime KB; do not invent answers)
- Confirm the exact prepa lycee name (Moulay Driss vs Moulay Idriss). Currently "Moulay Driss" per CV.
- No public code repository exists yet. If Ayoub publishes one, add it and re-enable GitHub redirects.
- No public URL for the end-of-studies report; keep it internal unless Ayoub provides a shareable link.

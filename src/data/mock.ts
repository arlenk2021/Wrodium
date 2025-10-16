// Mock data for Wrodium dashboard panels

export const brandReview = {
  snapshotAt: "2025-10-12T09:30:00Z",
  reputationScore: 82,
  backlinkSummary: {
    total: 426,
    highAuthority: 58,
    mediumAuthority: 241,
    lowAuthority: 127,
    recent30d: 37,
  },
  strengths: [
    "Thought leadership content performs well in developer communities",
    "Fast response to product feedback on X and GitHub",
  ],
  weaknesses: [
    "Sparse product how-to videos",
    "Backlink anchors skew toward brand-only, fewer feature phrases",
  ],
  mentionsSample: [
    { source: "DevForum", title: "Wrodium API write-up", sentiment: "positive" },
    { source: "ProductHunt", title: "Feature request thread", sentiment: "neutral" },
    { source: "Blog - ops.tools", title: "RAG evaluation", sentiment: "positive" },
  ],
  // optional for charts:
  backlinkTrend6mo: [62, 68, 71, 74, 79, 85],
};

export const aiVisibility = {
  intents: [
    { intent: "compare-rag-tools", volumeIndex: 87, difficultyIndex: 62 },
    { intent: "news-fact-checking-ai", volumeIndex: 74, difficultyIndex: 55 },
    { intent: "seo-workflows-for-llm", volumeIndex: 68, difficultyIndex: 47 },
  ],
  promptsByLLM: [
    {
      llm: "ChatGPT",
      prompt:
        "You are an editor. Given a draft about Wrodium, propose 5 fact-checking steps with sources.",
    },
    {
      llm: "Claude",
      prompt:
        "Given a RAG pipeline spec, write risk mitigations for hallucinations and source freshness.",
    },
    {
      llm: "Perplexity",
      prompt:
        "Find recent public benchmarks on RAG QA accuracy and summarize tradeoffs.",
    },
    {
      llm: "Gemini",
      prompt:
        "Generate 3 SEO outlines for an enterprise AI accuracy page with schema suggestions.",
    },
  ],
  suggestedPromptsForConsumers: [
    "Which AI tool gives the most reliable citations for news?",
    "How do I structure a vector DB for mixed media evidence?",
    "What schema improves click-through for AI product pages?",
  ],
};

export const promptRestructuring = {
  userQuery: "Best way to build a RAG pipeline for news accuracy",
  predictedRewrites: [
    "How to design a RAG system that reduces hallucinations for news",
    "RAG pipeline architecture for fact-checking with sources",
    "Implementing freshness-aware RAG for breaking news",
  ],
  contextScaffold: {
    entities: ["Wrodium", "RAG", "vector database", "retrieval", "schema.org"],
    constraints: [
      "Fresh sources under 48 hours",
      "Citations must include author and date",
      "Use deterministic reranking",
    ],
    outline: [
      "Goals and non-goals",
      "Content ingestion and normalization",
      "Indexing strategy and embeddings",
      "Query planning and reformulation",
      "Attribution and citation policy",
      "Evaluation and monitoring",
    ],
  },
};

export const updatePanel = {
  page: {
    url: "https://wrodium.ai/accuracy",
    lastScoredAt: "2025-10-12T09:45:00Z",
    score: 88,
    schema: {
      type: "Product",
      status: "ok",
      issues: ["Missing `dateModified` on HowTo snippets"],
    },
  },
  realtimeCheck: {
    now: "2025-10-12T10:00:00Z",
    withinFreshnessWindow: true,
    suggestedUpdates: [
      "Add a section clarifying evaluation datasets used in September",
      "Link to two independent third-party reviews",
    ],
    sources: [
      { name: "AITruth.org", lastUpdated: "2025-10-10" },
      { name: "Enterprise AI Weekly", lastUpdated: "2025-10-11" },
    ],
  },
};

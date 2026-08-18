/* ===========================================================================
   PROJECTS — this is the only file you edit to add a project.
   ===========================================================================

   Add a new project by copying the template below to the TOP of the array.
   Order in this array is the order on the page. Nothing else needs changing:
   the filter buttons, counts and layout all derive from this data.

   ---------------------------------------------------------------------------
   {
     slug:    "kebab-case-id",        // unique; used for the anchor link
     title:   "project-name",
     kind:    "AI Engineering",       // becomes a filter button. Reuse an existing
                                      // kind, or invent one - the filters update.
     featured: true,                  // true = full card. false = compact row.
     tagline: "One line. What it does, in plain words.",

     summary: `Two or three sentences. What problem, what approach.
               Backticks let you write across lines.`,

     metrics: [                       // 0-4 of them. Keep it to what you measured.
       { value: "100%", label: "recall@4" },
       { value: "0.772", label: "MRR" },
     ],

     finding: `The interesting part. What did the numbers actually say - especially
               if it was not what you expected? Leave empty ("") to omit.`,

     stack: ["Python", "FastAPI"],
     repo:  "https://github.com/Bennittah/name",
     demo:  "",                       // optional live URL; omit or "" for none
   },
   ---------------------------------------------------------------------------

   Two rules worth keeping:

   1. Only put a number in `metrics` if you measured it. An unmeasured metric is
      worse than no metric - it is the first thing a technical reader will probe.
   2. `finding` is the part people remember. "Accuracy was 81%" is a number;
      "augmentation beat a pretrained backbone, and here is why" is a finding.
   =========================================================================== */

window.PROJECTS = [
  {
    slug: "diy-repair-qa-pipeline",
    title: "diy-repair-qa-pipeline",
    kind: "AI Engineering",
    featured: true,
    tagline: "Generates repair Q&A, scores it two ways, and fixes the judge before trusting it to fix the generator.",

    summary: `A synthetic Home DIY Repair Q&A pipeline that generates structured answers,
              scores them on 6 quality dimensions with both a human reviewer and an
              independent LLM-as-judge, and uses their disagreement to drive two separate
              correction cycles - first calibrating the judge, then correcting the
              generator. Six prompt versions, two judge versions, every correction logged
              with its trigger, hypothesis and measured result.`,

    metrics: [
      { value: "84%", label: "overall pass rate (v6)" },
      { value: "+20pp", label: "human/LLM safety agreement after judge calibration" },
      { value: "11", label: "logged iteration entries" },
      { value: "50", label: "items per run, dual-labeled" },
    ],

    finding: `Two independent generations made the identical mistake on the same repair
              task - naming a toilet tank lid as the safety hazard while ignoring the
              shutoff valve the steps actually operate. Not noise: the same wrong answer,
              arrived at twice. A one-sentence prompt patch fixed it, but the same fix pass
              over-corrected an unrelated rule and briefly regressed a different category
              before a second patch recovered it - a fix isn't verified until it's
              re-measured, not just shipped.`,

    stack: ["Python", "Claude Sonnet 5", "Pydantic", "Hugging Face", "sentence-transformers"],
    repo: "https://github.com/Bennittah/diy-repair-qa-pipeline",
    demo: "",
  },

  {
    slug: "prompt-architect",
    title: "prompt-architect",
    kind: "AI Engineering",
    featured: true,
    tagline: "Spec out a coding prompt before you spend a token on it.",

    summary: `Most weak prompts are not badly worded, they are underspecified -
              the model is told the goal and left to guess the stack, the
              constraints and what "done" means. This page makes those fields
              explicit and compiles them live into a structured brief, in either
              plain sections or XML tags. One HTML file, no build step.`,

    metrics: [
      { value: "0", label: "network requests" },
      { value: "8", label: "spec fields" },
      { value: "26 KB", label: "single file" },
    ],

    finding: `The first draft claimed no data leaves your browser while loading a
              webfont from a third party - which hands every visitor's IP and
              referring page to that CDN before the first keystroke. A privacy
              claim and a CDN font are not compatible, so the fix cost a
              typeface: system font stacks in exchange for a claim that is
              actually true, and a tool that now works with the network off.`,

    stack: ["JavaScript", "HTML", "CSS", "No dependencies"],
    repo: "https://github.com/Bennittah/prompt-architect",
    demo: "https://bennittah.github.io/prompt-architect/",
  },

  {
    slug: "grounded-rag",
    title: "grounded-rag",
    kind: "AI Engineering",
    featured: true,
    tagline: "A RAG service that refuses to answer when it should.",

    summary: `Two-stage retrieval - BM25 for recall, an LLM reranker for precision -
              with citations validated against the context actually supplied. Ships
              with an evaluation harness that measures retrieval, faithfulness and
              abstention as three separate numbers rather than one blended score.`,

    metrics: [
      { value: "100%", label: "recall@4" },
      { value: "60%", label: "top-1" },
      { value: "0.772", label: "MRR" },
      { value: "41", label: "tests" },
    ],

    finding: `BM25 finds the right passage every single time, and buries it 40% of
              the time. That gap is the entire argument for a reranking stage - and
              exactly what a single "accuracy" number would have hidden. A one-stage
              system feeding its top result to the generator would silently drop
              two answers in five, not because retrieval failed but because the
              ordering did.`,

    stack: ["Python", "FastAPI", "Claude Opus 5", "SQLite", "Docker", "CI"],
    repo: "https://github.com/Bennittah/grounded-rag",
    demo: "",
  },

  {
    slug: "seedling-cnn",
    title: "Plant seedling classification",
    kind: "Machine Learning",
    featured: true,
    tagline: "Identifying 12 plant species from a photograph, and a controlled comparison of four architectures.",

    summary: `Four models trained and evaluated on the same held-out test set,
              changing one thing at a time: a baseline CNN, the same network with
              data augmentation, a wider-filter variant, and VGG16 transfer learning.`,

    metrics: [
      { value: "81%", label: "test accuracy" },
      { value: "+28", label: "points over baseline" },
      { value: "12", label: "species" },
    ],

    finding: `Augmentation was worth more than any architectural change tried, and
              the pretrained VGG16 backbone came last at 60%. The cause is concrete:
              at 64x64 input its convolutional base collapses to 2x2x512, so most of
              the pretrained hierarchy has nothing to contribute. Pretrained is not
              automatically better when the input resolution is wrong for the backbone.`,

    stack: ["TensorFlow", "Keras", "scikit-learn"],
    repo: "https://github.com/Bennittah/Classification",
    demo: "",
  },

  {
    slug: "review-classification",
    title: "Review text classification",
    kind: "Machine Learning",
    featured: true,
    tagline: "Predicting a 1-5 star rating from the raw text of 50,000 Amazon reviews.",

    summary: `Full preprocessing pipeline - HTML stripping, contraction expansion,
              lemmatisation - then Bag-of-Words against TF-IDF, with a Random Forest
              tuned by 5-fold cross-validation.`,

    metrics: [
      { value: "69.0%", label: "accuracy" },
      { value: "61.8%", label: "majority baseline" },
      { value: "50K", label: "reviews" },
    ],

    finding: `The headline accuracy is not the finding - the baseline is. Because
              61.8% of the test set is 5-star, always guessing "5" scores 61.8%, so
              all that modelling bought about seven points. The confusion matrix
              shows the model collapsing toward the majority class. Reporting 69%
              without the baseline beside it would have overstated the result
              considerably.`,

    stack: ["scikit-learn", "NLTK", "pandas"],
    repo: "https://github.com/Bennittah/NLP",
    demo: "",
  },

  {
    slug: "uber-demand",
    title: "NYC ride demand analysis",
    kind: "Analysis",
    featured: false,
    tagline: "29,101 hourly Uber pickups joined with weather data.",
    summary: "",
    metrics: [{ value: "29,101", label: "observations" }],
    finding: `Weather barely affects demand, contrary to what the dataset invites you
              to conclude, and Manhattan is dominant enough that the "city-wide"
              hourly curve is really just Manhattan's.`,
    stack: ["pandas", "seaborn"],
    repo: "https://github.com/Bennittah/Uber",
    demo: "",
  },

  {
    slug: "world-cup",
    title: "World Cup analysis",
    kind: "Analysis",
    featured: false,
    tagline: "84 years of tournament data across three linked datasets.",
    summary: "",
    metrics: [{ value: "20", label: "tournaments" }],
    finding: "Attendance, titles and home advantage across eras, answering a specific scouting brief.",
    stack: ["pandas", "seaborn"],
    repo: "https://github.com/Bennittah/Fifa",
    demo: "",
  },
];

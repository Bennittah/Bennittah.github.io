# bennittah.github.io

Portfolio site. Static, no build step, no dependencies — four files.

| File | What it is |
|---|---|
| `projects.js` | **The only file you edit to add a project.** |
| `index.html` | Page structure and the fixed copy (What I do / How I work / Credentials) |
| `app.js` | Renders the project list from `projects.js`. You should never need to touch it. |
| `style.css` | All styling |

---

## Adding a project

Open `projects.js`, copy the template at the top of the file, and paste it as the
**first** entry in the array. Commit and push — GitHub Pages redeploys in about a minute.

```js
{
  slug: "my-new-project",
  title: "my-new-project",
  kind: "AI Engineering",     // reuse a kind, or invent one — the filter buttons follow
  featured: true,             // true = full card, false = compact row under "Earlier work"
  tagline: "One line. What it does, in plain words.",
  summary: `Two or three sentences: what problem, what approach.`,
  metrics: [
    { value: "94%", label: "precision" },
    { value: "1.2s", label: "p95 latency" },
  ],
  finding: `What the numbers actually said — especially if it surprised you.`,
  stack: ["Python", "FastAPI"],
  repo: "https://github.com/Bennittah/my-new-project",
  demo: "",                   // optional live URL
},
```

Everything else updates itself: the filter buttons are derived from the `kind` values
present, the project count in the section note comes from the array length, and the
"Earlier analysis work" block hides itself if nothing is in it.

### Two rules worth keeping

1. **Only put a number in `metrics` if you measured it.** An unmeasured metric is worse
   than no metric — it is the first thing a technical reader will probe, and the fastest
   way to lose them.
2. **`finding` is the part people remember.** "Accuracy was 81%" is a number. "Data
   augmentation beat a pretrained backbone, and here is why" is a finding. Cards without
   a finding read as a list; cards with one read as someone who thinks about their work.

---

## Running it locally

```bash
python -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly from the filesystem also works — the scripts are plain
`<script>` tags rather than ES modules specifically so that `file://` does not break them.

## Notes

- Dark mode follows the OS setting via `prefers-color-scheme`; both palettes are defined
  explicitly rather than being an automatic inversion.
- Project metrics render as stat tiles, not charts — a handful of headline numbers is a
  stat row, and a one-bar bar chart is never the right answer.
- The page degrades to a `<noscript>` pointer at the GitHub profile if JavaScript is off.

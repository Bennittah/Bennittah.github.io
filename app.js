/* Renders the project list from projects.js.
   No build step, no framework, no dependencies - open index.html and it works.
   To add a project, edit projects.js. You should never need to touch this file. */

(function () {
  "use strict";

  var projects = window.PROJECTS || [];

  // --- helpers -------------------------------------------------------------

  /** Escape anything that reaches innerHTML. Project copy is trusted, but making
      the escaping explicit means a future paste of a stray < or & cannot break
      the page silently. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Collapse the newlines and indentation of a template-literal block into prose. */
  function tidy(s) {
    return esc(s).replace(/\s+/g, " ").trim();
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  // --- rendering -----------------------------------------------------------

  function metricsRow(metrics) {
    if (!metrics || !metrics.length) return "";
    var tiles = metrics
      .map(function (m) {
        return (
          '<div class="stat">' +
          '<div class="stat-value">' + esc(m.value) + "</div>" +
          '<div class="stat-label">' + esc(m.label) + "</div>" +
          "</div>"
        );
      })
      .join("");
    return '<div class="kpi-row">' + tiles + "</div>";
  }

  function tagList(stack) {
    if (!stack || !stack.length) return "";
    return (
      '<ul class="tags">' +
      stack.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
      "</ul>"
    );
  }

  function linkRow(p) {
    var links = ['<a class="repo-link" href="' + esc(p.repo) + '">View the code &rarr;</a>'];
    if (p.demo) links.push('<a class="repo-link" href="' + esc(p.demo) + '">Live demo &rarr;</a>');
    return '<div class="project-links">' + links.join("") + "</div>";
  }

  function featuredCard(p) {
    return el(
      '<article class="project" id="' + esc(p.slug) + '" data-kind="' + esc(p.kind) + '">' +
        '<div class="project-head">' +
          "<h3>" + esc(p.title) + "</h3>" +
          '<span class="flag">' + esc(p.kind) + "</span>" +
        "</div>" +
        '<p class="tagline">' + tidy(p.tagline) + "</p>" +
        (p.summary ? "<p>" + tidy(p.summary) + "</p>" : "") +
        metricsRow(p.metrics) +
        (p.finding ? '<div class="finding">' + tidy(p.finding) + "</div>" : "") +
        tagList(p.stack) +
        linkRow(p) +
      "</article>"
    );
  }

  function compactRow(p) {
    return el(
      '<li class="compact" id="' + esc(p.slug) + '" data-kind="' + esc(p.kind) + '">' +
        '<a href="' + esc(p.repo) + '">' + esc(p.title) + "</a> &mdash; " +
        tidy(p.tagline) +
        (p.finding ? '<span class="meta">' + tidy(p.finding) + "</span>" : "") +
      "</li>"
    );
  }

  // --- filters -------------------------------------------------------------

  function buildFilters(kinds, onChange) {
    var bar = document.getElementById("filters");
    if (!bar) return;

    var all = ["All"].concat(kinds);
    all.forEach(function (kind, i) {
      var b = el(
        '<button type="button" class="filter' + (i === 0 ? " on" : "") + '"' +
        ' aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(kind) + "</button>"
      );
      b.addEventListener("click", function () {
        bar.querySelectorAll(".filter").forEach(function (other) {
          other.classList.remove("on");
          other.setAttribute("aria-pressed", "false");
        });
        b.classList.add("on");
        b.setAttribute("aria-pressed", "true");
        onChange(kind);
      });
      bar.appendChild(b);
    });
  }

  function applyFilter(kind) {
    var shown = 0;
    document.querySelectorAll("[data-kind]").forEach(function (node) {
      var match = kind === "All" || node.dataset.kind === kind;
      node.hidden = !match;
      if (match) shown++;
    });

    // The "earlier work" block is only meaningful when something inside it survives.
    var earlier = document.getElementById("earlier");
    if (earlier) {
      var anyVisible = earlier.querySelectorAll("[data-kind]:not([hidden])").length > 0;
      earlier.hidden = !anyVisible;
    }

    var live = document.getElementById("filter-status");
    if (live) {
      live.textContent =
        shown + (shown === 1 ? " project" : " projects") +
        (kind === "All" ? "" : " in " + kind);
    }
  }

  // --- boot ----------------------------------------------------------------

  function init() {
    var featuredHost = document.getElementById("featured-projects");
    var compactHost = document.getElementById("compact-projects");
    if (!featuredHost || !compactHost) return;

    var featured = projects.filter(function (p) { return p.featured; });
    var compact = projects.filter(function (p) { return !p.featured; });

    featured.forEach(function (p) { featuredHost.appendChild(featuredCard(p)); });
    compact.forEach(function (p) { compactHost.appendChild(compactRow(p)); });

    var earlier = document.getElementById("earlier");
    if (earlier && !compact.length) earlier.hidden = true;

    // Filter buttons come from the data, so a new `kind` in projects.js appears
    // here automatically. Order of first appearance, so the array controls it.
    var kinds = [];
    projects.forEach(function (p) {
      if (p.kind && kinds.indexOf(p.kind) === -1) kinds.push(p.kind);
    });
    buildFilters(kinds, applyFilter);

    var count = document.getElementById("project-count");
    if (count) count.textContent = projects.length;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

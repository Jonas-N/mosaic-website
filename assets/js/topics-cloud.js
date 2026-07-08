/**
 * MOSAIC topics word cloud
 * Builds keyword frequencies from event titles, talk titles, and summaries,
 * then lays them out in a simple non-overlapping spiral cloud.
 * Year toggles re-filter the event set and re-render.
 */
(function () {
  "use strict";

  var dataEl = document.getElementById("mosaic-events-data");
  var cloudEl = document.getElementById("topics-cloud");
  var yearsEl = document.getElementById("topics-years");
  if (!dataEl || !cloudEl || !yearsEl) return;

  var events;
  try {
    events = JSON.parse(dataEl.textContent);
  } catch (e) {
    cloudEl.textContent = "Topics coming soon.";
    return;
  }

  var STOP = {
    a: 1, an: 1, the: 1, and: 1, or: 1, of: 1, to: 1, in: 1, on: 1, for: 1,
    with: 1, as: 1, by: 1, at: 1, from: 1, into: 1, about: 1, over: 1,
    is: 1, are: 1, was: 1, were: 1, be: 1, been: 1, being: 1, have: 1,
    has: 1, had: 1, do: 1, does: 1, did: 1, will: 1, would: 1, can: 1,
    could: 1, should: 1, may: 1, might: 1, must: 1, shall: 1, this: 1,
    that: 1, these: 1, those: 1, it: 1, its: 1, we: 1, our: 1, you: 1,
    your: 1, their: 1, they: 1, them: 1, what: 1, which: 1, who: 1,
    how: 1, when: 1, where: 1, why: 1, than: 1, then: 1, also: 1, not: 1,
    no: 1, yes: 1, but: 1, if: 1, so: 1, such: 1, via: 1, per: 1, each: 1,
    both: 1, all: 1, any: 1, some: 1, more: 1, most: 1, other: 1, own: 1,
    same: 1, very: 1, just: 1, only: 1, new: 1, one: 1, two: 1, three: 1,
    first: 1, second: 1, using: 1, use: 1, used: 1, based: 1, within: 1,
    through: 1, during: 1, after: 1, before: 1, between: 1, across: 1,
    while: 1, among: 1, under: 1, above: 1, against: 1, without: 1,
    grand: 1, challenge: 1, mosaic: 1, meeting: 1, session: 1, discussion: 1,
    paper: 1, review: 1, tutorial: 1, showcase: 1, kick: 1, off: 1,
    general: 1, open: 1, short: 1, long: 1, recent: 1, current: 1,
    future: 1, past: 1, lessons: 1, directions: 1, overview: 1, practical: 1,
    advice: 1, challenges: 1, promises: 1, pitfalls: 1, tools: 1, tool: 1,
    study: 1, studies: 1, studying: 1, research: 1, researchers: 1,
    science: 1, methods: 1, method: 1, theories: 1, theory: 1,
    approaches: 1, approach: 1, understanding: 1, exploring: 1,
    introduction: 1, advance: 1, advances: 1, high: 1, quality: 1,
    core: 1, components: 1, window: 1, windowing: 1, continuous: 1,
    dynamic: 1, dynamics: 1, different: 1, afford: 1, design: 1,
    feature: 1, features: 1, window: 1, build: 1, online: 1,
    collecting: 1, experiments: 1, experiment: 1, lab: 1, perspective: 1,
    window: 1, faculty: 1, age: 1, humans: 1, human: 1, including: 1,
    brief: 1, look: 1, mean: 1, means: 1, reports: 1, associated: 1,
    everyday: 1, might: 1, fuelling: 1, fueling: 1, became: 1, become: 1,
    keeps: 1, keep: 1, species: 1, systems: 1, system: 1, face: 1,
    faces: 1, // "face" alone is weak; face-to-face handled as phrase
    real: 1, time: 1, realtime: 1, blue: 1, sky: 1, technologies: 1,
    technology: 1, electronic: 1, meta: 1, podium: 1, paper: 1,
    foundations: 1, foundation: 1, typology: 1, languages: 1,
    language: 1
  };

  // Allow these short/common research terms even if otherwise filtered
  var KEEP = {
    ai: "AI", vr: "VR", ar: "AR", elan: "ELAN", dnn: "DNN",
    hci: "HCI", toM: "Theory of Mind",
  };

  // Multi-word phrases to detect (lowercase keys → display form)
  var PHRASES = [
    ["theory of mind", "Theory of Mind"],
    ["face-to-face", "Face-to-Face"],
    ["face to face", "Face-to-Face"],
    ["virtual reality", "Virtual Reality"],
    ["social interaction", "Social Interaction"],
    ["social interactions", "Social Interactions"],
    ["natural language", "Natural Language"],
    ["motion capture", "Motion Capture"],
    ["multimodal communication", "Multimodal Communication"],
    ["multimodal interaction", "Multimodal Interaction"],
    ["multimodal interactions", "Multimodal Interactions"],
    ["multimodal language", "Multimodal Language"],
    ["facial expressions", "Facial Expressions"],
    ["facial expression", "Facial Expression"],
    ["social networks", "Social Networks"],
    ["social network", "Social Network"],
    ["eye tracking", "Eye Tracking"],
    ["eye-tracking", "Eye Tracking"],
    ["computer vision", "Computer Vision"],
    ["machine learning", "Machine Learning"],
    ["deep neural", "Deep Neural Networks"],
    ["neural network", "Neural Networks"],
    ["neural networks", "Neural Networks"],
    ["voice transformation", "Voice Transformation"],
    ["face transformation", "Face Transformation"],
    ["real-time", "Real-Time"],
    ["open-source", "Open Source"],
    ["open source", "Open Source"],
    ["wearable sensing", "Wearable Sensing"],
    ["facial wearable", "Facial Wearables"],
    ["visual signals", "Visual Signals"],
    ["visual language", "Visual Language"],
    ["conversational facial", "Conversational Facial Signals"],
    ["facial signals", "Facial Signals"],
    ["experimental semiotics", "Experimental Semiotics"],
    ["communicative efficiency", "Communicative Efficiency"],
    ["group interaction", "Group Interaction"],
    ["dyadic interaction", "Dyadic Interaction"],
    ["dyadic interactions", "Dyadic Interactions"],
    ["high-quality listening", "High-Quality Listening"],
    ["social cognition", "Social Cognition"],
    ["sign language", "Sign Language"],
    ["speech-to-text", "Speech-to-Text"],
    ["partner selection", "Partner Selection"],
    ["vision–language", "Vision–Language Models"],
    ["vision-language", "Vision–Language Models"],
    ["large language", "Large Language Models"],
    ["language models", "Language Models"],
    ["artificial intelligence", "Artificial Intelligence"],
    ["digital agents", "Digital Agents"],
    ["artificial agents", "Artificial Agents"],
    ["social signals", "Social Signals"],
    ["gesture ensembles", "Gesture Ensembles"],
    ["electronic skin", "Electronic Skin"],
    ["meta humans", "Meta Humans"],
    ["honest signals", "Honest Signals"],
    ["costly lies", "Costly Lies"],
    ["evolution of communication", "Evolution of Communication"],
  ];

  function sessionTopic(title) {
    if (!title) return "";
    var parts = title.split(/\s*[—–-]\s+/);
    if (parts.length > 1) return parts.slice(1).join(" — ").trim();
    return title.replace(/^Grand Challenge\s*/i, "").trim();
  }

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .replace(/[“”"']/g, "")
      .replace(/[–—]/g, "-")
      .replace(/[^a-z0-9\s\-\/&]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function displayWord(w) {
    if (KEEP[w]) return KEEP[w];
    // Title-case hyphenated and multi-word
    return w.split(/([\s\-\/])/).map(function (part) {
      if (!part || /^[\s\-\/]$/.test(part)) return part;
      if (part.length <= 2) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join("");
  }

  function addCount(map, key, display, weight) {
    if (!key || key.length < 2) return;
    if (!map[key]) map[key] = { text: display || displayWord(key), weight: 0 };
    map[key].weight += weight;
  }

  function extractFromText(map, text, weight) {
    if (!text) return;
    var raw = text;
    var lower = normalize(text);

    // Phrases first (consume / still count — counting is fine if overlap)
    for (var i = 0; i < PHRASES.length; i++) {
      var p = PHRASES[i];
      if (lower.indexOf(p[0]) !== -1) {
        addCount(map, p[0], p[1], weight * 2.5);
      }
    }

    // Full session/talk topic as soft phrase if short
    var topic = sessionTopic(raw);
    if (topic) {
      var tNorm = normalize(topic);
      var tWords = tNorm.split(" ").filter(Boolean);
      if (tWords.length >= 2 && tWords.length <= 5) {
        // only if not pure stopwords
        var meaningful = tWords.filter(function (w) { return !STOP[w] || KEEP[w]; });
        if (meaningful.length >= 2) {
          addCount(map, tNorm, topic.replace(/\s+/g, " ").trim(), weight * 1.5);
        }
      }
    }

    var tokens = lower.split(/[\s\/]+/).filter(Boolean);
    for (var j = 0; j < tokens.length; j++) {
      var tok = tokens[j].replace(/^-+|-+$/g, "");
      if (!tok || tok.length < 3) continue;
      if (STOP[tok] && !KEEP[tok]) continue;
      if (/^\d+$/.test(tok)) continue;
      addCount(map, tok, displayWord(tok), weight);
    }

    // Bigrams of non-stop tokens
    var content = tokens.filter(function (t) {
      t = t.replace(/^-+|-+$/g, "");
      return t.length >= 3 && (!STOP[t] || KEEP[t]);
    });
    for (var k = 0; k < content.length - 1; k++) {
      var bi = content[k] + " " + content[k + 1];
      addCount(map, bi, displayWord(content[k]) + " " + displayWord(content[k + 1]), weight * 1.2);
    }
  }

  function frequenciesFor(yearFilter) {
    var map = {};
    for (var i = 0; i < events.length; i++) {
      var e = events[i];
      if (yearFilter && String(e.year) !== String(yearFilter)) continue;

      extractFromText(map, sessionTopic(e.title), 4);
      extractFromText(map, e.summary, 2);
      if (e.talks && e.talks.length) {
        for (var t = 0; t < e.talks.length; t++) {
          if (e.talks[t]) extractFromText(map, e.talks[t], 3);
        }
      }
    }

    var list = Object.keys(map).map(function (k) { return map[k]; });

    // Drop ultra-generic singles that dominate
    var generic = {
      social: 1, interaction: 1, interactions: 1, multimodal: 1,
      communication: 1, signals: 1, signal: 1, models: 1, model: 1,
      data: 1, analysis: 1, behaviour: 1, behavior: 1, brain: 1,
    };
    list = list.filter(function (w) {
      var key = normalize(w.text);
      if (generic[key] && w.weight < 8) return false;
      // Prefer multi-word if single is substring of stronger multi
      return true;
    });

    // Suppress unigrams that are fully covered by a stronger multi-word phrase
    list.sort(function (a, b) { return b.weight - a.weight; });

    var max = yearFilter ? 22 : 36;
    var minW = yearFilter ? 1.5 : 3;
    list = list.filter(function (w) { return w.weight >= minW; }).slice(0, max);

    // If year has few events, relax threshold
    if (list.length < 8) {
      list = Object.keys(map).map(function (k) { return map[k]; })
        .sort(function (a, b) { return b.weight - a.weight; })
        .slice(0, 18);
    }

    return list;
  }

  var MOSAIC_COLORS = [
    "#ff8c1f", "#ff3c42", "#c4244f", "#830374",
    "#1f5fa8", "#0bd78f", "#1ad9c9", "#d9822b",
  ];

  function overlaps(x, y, w, h, placed, pad) {
    for (var p = 0; p < placed.length; p++) {
      var o = placed[p];
      if (!(x + w + pad < o.x || o.x + o.w + pad < x ||
            y + h + pad < o.y || o.y + o.h + pad < y)) {
        return true;
      }
    }
    return false;
  }

  function inBounds(x, y, w, h, width, height, margin) {
    return x >= margin && y >= margin &&
      x + w <= width - margin && y + h <= height - margin;
  }

  function layoutCloud(words, width, baseHeight) {
    cloudEl.innerHTML = "";

    if (!words.length) {
      cloudEl.style.height = baseHeight + "px";
      cloudEl.innerHTML = '<p class="topics-empty">No topics for this year yet.</p>';
      return;
    }

    // Grow canvas with word count so sparse year clouds still breathe,
    // and dense "all years" clouds have room (avoids corner pile-ups).
    var height = Math.max(
      baseHeight,
      Math.min(520, 180 + words.length * 12)
    );
    cloudEl.style.height = height + "px";

    var maxW = words[0].weight;
    var minW = words[words.length - 1].weight;
    var range = Math.max(maxW - minW, 0.01);

    // Slightly smaller type when the cloud is crowded
    var sizeScale = words.length > 28 ? 0.78 : words.length > 18 ? 0.88 : 1;

    var placed = [];
    var cx = width / 2;
    var cy = height / 2;
    // Elliptical spiral matches the wide container aspect ratio
    var aspect = width / Math.max(height, 1);
    var pad = 6;
    var margin = 6;

    words.forEach(function (word, idx) {
      var span = document.createElement("span");
      span.className = "topics-word";
      span.textContent = word.text;
      var t = (word.weight - minW) / range;
      var size = (0.8 + t * 1.35) * sizeScale; // rem
      span.style.fontSize = size + "rem";
      span.style.color = MOSAIC_COLORS[idx % MOSAIC_COLORS.length];
      span.style.fontWeight = t > 0.55 ? "700" : t > 0.25 ? "600" : "500";
      span.style.opacity = String(0.72 + t * 0.28);
      // Hide until placed so failed items can be dropped cleanly
      span.style.visibility = "hidden";
      cloudEl.appendChild(span);

      var w = span.offsetWidth;
      var h = span.offsetHeight;
      // If a single word is wider than the canvas, shrink until it fits
      var shrinkGuard = 0;
      while (w > width - margin * 2 && shrinkGuard < 6) {
        size *= 0.85;
        span.style.fontSize = size + "rem";
        w = span.offsetWidth;
        h = span.offsetHeight;
        shrinkGuard++;
      }

      var x = cx - w / 2;
      var y = cy - h / 2;
      var found = false;

      // 1) Archimedean spiral — reject out-of-bounds (never clamp to corners)
      var theta = Math.random() * Math.PI * 2; // slight variety per render
      var maxR = Math.sqrt(width * width + height * height) / 2;
      var steps = 0;
      var maxSteps = 2500;
      while (steps < maxSteps) {
        var r = 2 + 0.55 * theta;
        if (r > maxR + 40) break;
        x = cx + Math.cos(theta) * r * aspect * 0.72 - w / 2;
        y = cy + Math.sin(theta) * r * 0.72 - h / 2;
        theta += 0.18;
        steps++;

        if (!inBounds(x, y, w, h, width, height, margin)) continue;
        if (overlaps(x, y, w, h, placed, pad)) continue;
        found = true;
        break;
      }

      // 2) Random free spots inside the box
      if (!found) {
        for (var attempt = 0; attempt < 300; attempt++) {
          x = margin + Math.random() * Math.max(1, width - w - margin * 2);
          y = margin + Math.random() * Math.max(1, height - h - margin * 2);
          if (!overlaps(x, y, w, h, placed, pad)) {
            found = true;
            break;
          }
        }
      }

      // 3) Shrink word and retry spiral once more
      if (!found) {
        size *= 0.75;
        span.style.fontSize = size + "rem";
        w = span.offsetWidth;
        h = span.offsetHeight;
        theta = 0;
        steps = 0;
        while (steps < maxSteps) {
          var r2 = 2 + 0.5 * theta;
          if (r2 > maxR + 40) break;
          x = cx + Math.cos(theta) * r2 * aspect * 0.72 - w / 2;
          y = cy + Math.sin(theta) * r2 * 0.72 - h / 2;
          theta += 0.16;
          steps++;
          if (!inBounds(x, y, w, h, width, height, margin)) continue;
          if (overlaps(x, y, w, h, placed, pad)) continue;
          found = true;
          break;
        }
      }

      if (!found) {
        // Drop rather than stack in a corner
        span.remove();
        return;
      }

      span.style.left = Math.round(x) + "px";
      span.style.top = Math.round(y) + "px";
      span.style.visibility = "visible";
      placed.push({ x: x, y: y, w: w, h: h });
    });
  }

  function cloudSize() {
    var w = cloudEl.clientWidth || 600;
    var h = Math.max(260, Math.min(380, Math.round(w * 0.48)));
    return { w: w, h: h };
  }

  var activeYear = null; // null = all years

  function render() {
    var size = cloudSize();
    var words = frequenciesFor(activeYear);
    layoutCloud(words, size.w, size.h);
  }

  function setActive(year) {
    activeYear = year;
    var buttons = yearsEl.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var y = btn.getAttribute("data-year");
      var isActive = (year === null && y === "all") || (year !== null && y === String(year));
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
    render();
  }

  // Build year buttons: All + years present in data (prefer 2022–2026 order)
  var yearSet = {};
  events.forEach(function (e) { yearSet[e.year] = true; });
  var preferred = [2022, 2023, 2024, 2025, 2026];
  var years = preferred.filter(function (y) { return yearSet[y]; });
  // include any other years (e.g. 2021) at the start when filtering "all" only — still list if present
  Object.keys(yearSet).map(Number).sort().forEach(function (y) {
    if (years.indexOf(y) === -1) years.unshift(y);
  });

  yearsEl.innerHTML = "";
  var allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "topics-year-btn is-active";
  allBtn.setAttribute("data-year", "all");
  allBtn.setAttribute("aria-pressed", "true");
  allBtn.textContent = "All years";
  allBtn.addEventListener("click", function () { setActive(null); });
  yearsEl.appendChild(allBtn);

  years.forEach(function (y) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "topics-year-btn";
    btn.setAttribute("data-year", String(y));
    btn.setAttribute("aria-pressed", "false");
    btn.textContent = String(y);
    btn.addEventListener("click", function () {
      // toggle: click same year again → all
      if (activeYear === y) setActive(null);
      else setActive(y);
    });
    yearsEl.appendChild(btn);
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });

  // Initial render after layout
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(render);
  } else {
    render();
  }
})();

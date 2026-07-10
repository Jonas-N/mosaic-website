---
layout: default
title: Archive
permalink: /archive/
noindex: true
---

# Session archive

Internal index of past MOSAIC sessions — recordings and slides where available.
This page is not linked from the main navigation.

{% assign now = site.time | date: "%s" | plus: 0 %}
{% assign past = "" | split: "" %}
{% assign by_date = site.events | sort: "date" %}
{% for e in by_date %}
  {% assign ed = e.date | date: "%s" | plus: 0 %}
  {% if ed < now %}
    {% assign past = past | push: e %}
  {% endif %}
{% endfor %}
{% assign past = past | reverse %}

{% assign years = "" | split: "" %}
{% for e in past %}
  {% assign y = e.date | date: "%Y" %}
  {% unless years contains y %}
    {% assign years = years | push: y %}
  {% endunless %}
{% endfor %}

{% for y in years %}
## {{ y }}

<ul class="archive-list">
{% for e in past %}
  {% assign ey = e.date | date: "%Y" %}
  {% if ey == y %}
  {% assign key = e.date | date: "%Y-%m-%d" %}
  {% assign rec = site.data.recordings[key] %}
  <li class="archive-item">
    <div class="archive-item-main">
      <time class="archive-date" datetime="{{ e.date | date: "%Y-%m-%d" }}">{{ e.date | date: "%-d %b %Y" }}</time>
      <a class="archive-title" href="{{ e.url | relative_url }}">{{ e.title }}</a>
    </div>
    <div class="archive-recording">
      {% if rec.youtube %}
        <a class="archive-rec-link" href="{{ rec.youtube }}" rel="noopener" target="_blank">Watch recording</a>
      {% elsif rec.status == "zoom_expired" %}
        <span class="archive-rec-muted">Zoom recording expired</span>
      {% elsif rec.status == "none" %}
        <span class="archive-rec-muted">No recording</span>
      {% else %}
        <span class="archive-rec-muted">No recording</span>
      {% endif %}
      {% if rec.slides %}
        <a class="archive-slides-link" href="{{ rec.slides | relative_url }}"{% if rec.slides contains '.pdf' %} target="_blank" rel="noopener"{% endif %}>
          {% if rec.slides_label %}{{ rec.slides_label }}{% else %}Slides{% endif %}
        </a>
      {% endif %}
      {% if rec.note %}
        <span class="archive-rec-note">{{ rec.note }}</span>
      {% endif %}
    </div>
  </li>
  {% endif %}
{% endfor %}
</ul>
{% endfor %}

{% if past.size == 0 %}
<p>No past sessions yet.</p>
{% endif %}

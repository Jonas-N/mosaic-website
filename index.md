---
layout: default
title: Home
---

<section class="hero">
  <h1>MOSAIC</h1>
  <p class="tagline">The Multimodal Social Interactions Group — an international research community, open to everyone.</p>
  <p class="lede">
    We study multimodal social interaction and communication with an interdisciplinary
    lens, drawing on cognitive science, neuroscience, affective computing, AI,
    psycholinguistics, and related fields.
  </p>
  <p class="lede">
    Each month we meet online for a <strong>Grand Challenge</strong> — talks, demos,
    tutorials, and open discussion on a pressing topic. Sessions usually fall on the
    last Thursday of the month during the academic year (UK afternoon, 90 minutes).
    Join via the calendar and mailing list; if you’d like to host a session, get in touch.
  </p>
  <div class="cta-row">
    <a class="btn btn-primary" href="{{ '/calendar/' | relative_url }}">Subscribe to the calendar</a>
    <a class="btn" href="{{ '/events/' | relative_url }}">Browse events</a>
    {% include mailing-list-join-link.html class="btn" label="Subscribe to mailing list" %}
  </div>
</section>

{% comment %}
  Find the next upcoming event: sort ascending by date, keep the first one whose
  date is still in the future relative to the build time.
{% endcomment %}
{% assign now = site.time | date: "%s" | plus: 0 %}
{% assign upcoming = "" | split: "" %}
{% assign by_date = site.events | sort: "date" %}
{% for e in by_date %}
  {% assign ed = e.date | date: "%s" | plus: 0 %}
  {% if ed >= now %}{% assign upcoming = upcoming | push: e %}{% endif %}
{% endfor %}

{% if upcoming.size > 0 %}
{% assign next = upcoming | first %}
<div class="next-event">
  <p class="eyebrow">Next Grand Challenge</p>
  <h2><a href="{{ next.url | relative_url }}">{{ next.title }}</a></h2>
  <p class="when">{{ next.date | date: "%A %-d %B %Y" }}, {{ next.date | date: "%H:%M" }}{% if next.end_time %}–{{ next.end_time }}{% endif %}{% if next.timezone %} · {{ next.timezone }}{% endif %}</p>
  {% if next.summary %}<p>{{ next.summary }}</p>{% endif %}
  <p><a class="btn btn-primary" href="{{ next.url | relative_url }}">Event details</a></p>
</div>
{% else %}
<div class="next-event">
  <p class="eyebrow">Next Grand Challenge</p>
  <h2>Dates coming soon</h2>
  <p>The next session hasn’t been announced yet. Subscribe to the calendar or join
     the mailing list and you’ll be the first to know.</p>
  <p><a class="btn btn-primary" href="{{ '/calendar/' | relative_url }}">Subscribe to the calendar</a></p>
</div>
{% endif %}

{% include topics-cloud.html %}

## How it works

- **When:** usually on the last Thursday of the month, early–mid afternoon UK time (90 minutes).
- **Where:** on Zoom. Dates are on the [calendar]({{ '/calendar/' | relative_url }}); the joining link is emailed to the [mailing list]({{ '/about/#mailing-list' | relative_url }}) only (not on the public calendar).
- **Who:** everyone is welcome — researchers, students, and the simply curious. Please share widely.

<p style="margin-top:24px">
  <a href="{{ '/about/' | relative_url }}">More about MOSAIC →</a>
</p>

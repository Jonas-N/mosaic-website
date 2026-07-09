---
layout: default
title: Home
---

<section class="hero">
  <h1>MOSAIC</h1>
  <p class="tagline">The Multimodal Social Interactions Group — a monthly seminar series open to everyone.</p>
  <p class="lede">
    Every month we host a <strong>Grand Challenge</strong>: an online session where
    an international community of 200+ scholars digs into a pressing topic in
    social interaction research. Talks, demos, tutorials, and open discussion — all on Zoom.
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

- **When:** monthly, usually early–mid afternoon UK time (90 minutes).
- **Where:** on Zoom. The joining link lives inside each calendar event — [subscribe once]({{ '/calendar/' | relative_url }}) and it’s always to hand.
- **Who:** everyone is welcome — researchers, students, and the simply curious. Please share widely.

<p style="margin-top:24px">
  <a href="{{ '/about/' | relative_url }}">More about MOSAIC →</a>
</p>

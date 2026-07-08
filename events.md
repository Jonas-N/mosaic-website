---
layout: default
title: Events
---

# Events

Our monthly Grand Challenge sessions. The Zoom link for each session is included
in the calendar event — [subscribe to the calendar]({{ '/calendar/' | relative_url }})
to join and get reminders.

{%- assign now = site.time | date: "%s" | plus: 0 -%}
{%- assign by_date = site.events | sort: "date" -%}

{%- assign upcoming = "" | split: "" -%}
{%- assign past = "" | split: "" -%}
{%- for e in by_date -%}
  {%- assign ed = e.date | date: "%s" | plus: 0 -%}
  {%- if ed >= now -%}
    {%- assign upcoming = upcoming | push: e -%}
  {%- else -%}
    {%- assign past = past | push: e -%}
  {%- endif -%}
{%- endfor -%}

<h2 class="section-label">Upcoming</h2>
{% if upcoming.size > 0 %}
<ul class="event-list">
  {% for e in upcoming %}{% include event-card.html event=e %}{% endfor %}
</ul>
{% else %}
<p>No upcoming sessions are scheduled yet. Subscribe to the
   <a href="{{ '/calendar/' | relative_url }}">calendar</a> to be notified when the
   next one is announced.</p>
{% endif %}

<h2 class="section-label">Past events</h2>
{% if past.size > 0 %}
{%- assign past_desc = past | reverse -%}
<ul class="event-list">
  {% for e in past_desc %}{% include event-card.html event=e %}{% endfor %}
</ul>
{% else %}
<p>The archive will fill up here after our first sessions.</p>
{% endif %}

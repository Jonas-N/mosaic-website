---
layout: default
title: Events
permalink: /events/
---

# Events

Our monthly Grand Challenge sessions. [Subscribe to the calendar]({{ '/calendar/' | relative_url }})
for dates and reminders. The Zoom joining link is sent by email to the
[mailing list]({{ '/about/#mailing-list' | relative_url }}) only (not on the public
calendar).

{% assign now = site.time | date: "%s" | plus: 0 %}
{% assign by_date = site.events | sort: "date" %}
{% assign upcoming = "" | split: "" %}
{% assign past = "" | split: "" %}
{% for e in by_date %}
  {% assign ed = e.date | date: "%s" | plus: 0 %}
  {% if ed >= now %}
    {% assign upcoming = upcoming | push: e %}
  {% else %}
    {% assign past = past | push: e %}
  {% endif %}
{% endfor %}

## Upcoming
{: .section-label}

{% if upcoming.size > 0 %}
<ul class="event-list">
  {% for e in upcoming %}{% include event-card.html event=e %}{% endfor %}
</ul>
{% else %}
<p>No upcoming sessions are scheduled yet. Subscribe to the
   <a href="{{ '/calendar/' | relative_url }}">calendar</a> to be notified when the
   next one is announced.</p>
{% endif %}

## Past events
{: .section-label}

{% if past.size > 0 %}
{% assign past_desc = past | reverse %}
<ul class="event-list">
  {% for e in past_desc %}{% include event-card.html event=e %}{% endfor %}
</ul>
{% else %}
<p>The archive will fill up here after our first sessions.</p>
{% endif %}

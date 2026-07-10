---
layout: default
title: Calendar
permalink: /calendar/
---

# Calendar

Add the MOSAIC calendar to your own calendar app once, and every Grand Challenge
date and time shows up automatically (with reminders if your app supports them).

**Zoom joining links are not on the public calendar.** They are sent only by
email to the [mailing list]({{ '/about/#mailing-list' | relative_url }}), which
requires a short approval step — so the session stays limited to known members.

{% include subscribe-buttons.html %}

<div class="help-note" style="margin-top:16px">
  <strong>Which button?</strong>
  <ul style="margin:8px 0 0">
    <li><strong>Google Calendar</strong> (incl. Google Workspace / Gmail app): <em>Add to Google Calendar</em>.</li>
    <li><strong>Apple Calendar</strong> (iPhone, iPad, Mac): <em>Subscribe in Apple Calendar</em>. On iPhone, calendar links of this type always open Apple Calendar — that is normal.</li>
    <li><strong>Outlook on iPhone:</strong> the Outlook app does <em>not</em> reliably subscribe to external calendar feeds the way Apple Calendar does. Easiest options:
      <ol style="margin:6px 0 0">
        <li><strong>Recommended on iPhone:</strong> use <em>Subscribe in Apple Calendar</em> — you get every MOSAIC date and reminder in the system Calendar app. The Zoom link still comes by mailing-list email.</li>
        <li>Or open this page in <strong>Safari</strong>, tap <em>Subscribe in Outlook</em>, and complete the flow in <strong>Outlook on the web</strong> (signed into your work/personal Microsoft account). The feed then appears in the Outlook app if that account is already added there.</li>
      </ol>
    </li>
    <li><strong>Outlook on the web / Windows desktop:</strong> <em>Subscribe in Outlook</em>, or paste this feed URL under <em>Add calendar</em> → <em>From internet</em> / <em>Subscribe from web</em>:<br>
      <code style="font-size:0.85em;word-break:break-all">{{ site.google_calendar_ical_url }}</code>
    </li>
    <li><strong>Download .ics</strong>: one-off import only (it will <em>not</em> auto-update when we add new sessions). Prefer a subscribe option when you can.</li>
  </ul>
</div>

## Browse the calendar

<div class="calendar-embed">
  <iframe
    src="{{ site.google_calendar_embed_src }}"
    title="MOSAIC events calendar"
    frameborder="0"
    scrolling="no"
    loading="lazy"></iframe>
</div>

<p style="margin-top:16px">
  Prefer a list view? See <a href="{{ '/events/' | relative_url }}">all events</a>.
</p>

---
layout: default
title: Calendar
permalink: /calendar/
---

# Calendar

Add the MOSAIC calendar to your own calendar app once, and every Grand Challenge
— including the Zoom joining link and a reminder — shows up automatically.

{% include subscribe-buttons.html %}

<div class="help-note" style="margin-top:16px">
  <strong>Which button?</strong>
  <ul style="margin:8px 0 0">
    <li><strong>Google Calendar</strong> (incl. Google Workspace): <em>Add to Google Calendar</em>.</li>
    <li><strong>Apple Calendar</strong> (Mac / iPhone / iPad): <em>Subscribe in Apple Calendar</em> — opens a live subscription.</li>
    <li><strong>Outlook on the web</strong> (browser, work or personal): <em>Subscribe in Outlook</em> — opens Outlook’s “add calendar from web” flow.</li>
    <li><strong>Outlook desktop</strong> (Windows app): the button above may not hand off cleanly. Instead:
      <ol style="margin:6px 0 0">
        <li>Copy this feed URL:<br>
          <code style="font-size:0.85em;word-break:break-all">{{ site.google_calendar_ical_url }}</code>
        </li>
        <li>In Outlook: <em>Add calendar</em> → <em>From internet</em> (or <em>Subscribe from web</em>) → paste the URL → name it “MOSAIC”.</li>
      </ol>
      Older Outlook: <em>File</em> → <em>Account Settings</em> → <em>Internet Calendars</em> → <em>New</em> → paste the same URL.
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

---
# =============================================================================
#  MOSAIC EVENT TEMPLATE  —  copy this file to add a new Grand Challenge.
# =============================================================================
#  HOW TO USE (see CONTRIBUTING.md for the full walkthrough):
#   1. Make a copy of this file in the `_events/` folder.
#   2. Name the copy  YYYY-MM-DD-short-title.md  (the date is the event date),
#      e.g.  2026-06-18-june-grand-challenge.md
#   3. Fill in the fields below and write the abstracts/bios underneath.
#   4. Commit. The site rebuilds automatically — the event appears under
#      "Upcoming" until its date passes, then moves to "Past events".
#
#  This file itself starts with an underscore, so Jekyll ignores it and it
#  never shows up on the live site. Your copy must NOT start with an underscore.
#
#  Do NOT put the Zoom link here — it stays in the Google Calendar event only.
# =============================================================================

title: "Grand Challenge — <SESSION TITLE>"

# Start date & time. Use 24-hour time and the correct UTC offset:
#   +00:00 during UK winter (GMT), +01:00 during UK summer (BST).
date: 2026-06-18 14:00:00 +01:00
end_time: "15:30"          # display only, e.g. "15:30"
timezone: "BST (UK)"       # short label shown next to the time

# One or two sentences shown in listings and on the home page.
summary: >-
  A short teaser describing what this session is about.

# Host(s) who run the session. Add or remove list items as needed.
hosts:
  - name: "Host Name"
    affiliation: "Institution"

# Invited speaker(s). `talk` is optional.
speakers:
  - name: "Speaker One"
    affiliation: "Institution"
    talk: "Title of their talk"
  - name: "Speaker Two"
    affiliation: "Institution"
    talk: "Title of their talk"

# Timed running order. Each line is one entry, shown in order.
agenda:
  - "14:00–14:03  MOSAIC opening (Rachael Jack)"
  - "14:03–14:10  Introduction (Host)"
  - "14:10–14:30  Talk 1 — Speaker One"
  - "14:30–14:50  Talk 2 — Speaker Two"
  - "14:50–15:30  General discussion"
---

## Talk 1 — <Talk title> (<Speaker One>)

Paste the talk abstract here.

## Talk 2 — <Talk title> (<Speaker Two>)

Paste the talk abstract here.

## Speakers

**Speaker One** — short biography.

**Speaker Two** — short biography.

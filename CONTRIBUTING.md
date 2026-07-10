# Adding an event to the MOSAIC website

You **don’t need any web-development experience** or any software installed. Adding
a Grand Challenge is a matter of copying one file and filling in the blanks,
entirely from your browser on github.com. The site rebuilds itself within a
minute or two of you saving.

## The quick version

1. Go to the **`_events/`** folder in this repository on GitHub.
2. Open **`_TEMPLATE.md`** and click the **Copy raw file** button (or select all
   and copy the contents).
3. Click **Add file → Create new file**, and name it using the event date and a
   short title, in this exact style:

   ```
   _events/2026-06-18-june-grand-challenge.md
   ```

   (Type `_events/` at the start of the filename to put it in the right folder.)
4. Paste the template contents, then edit the fields (see below).
5. Scroll down, add a short commit message like “Add June Grand Challenge”, and
   click **Commit new file**.
6. Wait ~1–2 minutes, then check the live site. Your event appears under
   **Upcoming** until its date passes, after which it moves to **Past events**
   automatically.

That’s it. If something looks off, edit the file again — you can’t break anything
permanently.

## Filling in the fields

The part between the two `---` lines at the top is the structured information.
Keep the field names exactly as they are; only change the values.

| Field | What to put | Notes |
|-------|-------------|-------|
| `title` | Session title | Keep the `Grand Challenge — ` prefix for consistency. |
| `date` | Start date & time | Format: `YYYY-MM-DD HH:MM:00 +01:00`. |
| `end_time` | Finish time | Display only, e.g. `"15:30"`. |
| `timezone` | Short label | e.g. `"BST (UK)"` in summer, `"GMT (UK)"` in winter. |
| `summary` | One or two sentences | Shown in listings and on the home page. |
| `hosts` | People running the session | Name and (optional) affiliation. |
| `speakers` | Invited speakers | Name, affiliation, and (optional) `talk` title. |
| `agenda` | Timed running order | One line per entry. Optional. |

Below the second `---`, write the abstracts and speaker bios as normal text. You
can use `## Headings`, **bold**, and bullet lists.

### About the time zone offset

The UK switches between GMT and BST:

- **Late March to late October** → British Summer Time, offset **`+01:00`**, label `"BST (UK)"`.
- **Late October to late March** → Greenwich Mean Time, offset **`+00:00`**, label `"GMT (UK)"`.

Getting the offset exactly right mainly matters so the event sorts correctly; if
in doubt, `+01:00` for summer and `+00:00` for winter is correct.

## Important: the Zoom link

**Do not put the Zoom link in the event file or in the public Google Calendar
event.** The joining link is sent only by **mailing-list email** before each
session (the list requires organiser approval). The calendar is for dates, times,
and titles only.

When you host: keep Zoom off the website markdown and off the public calendar
description/location fields; share it via the mailing list announcement instead.

## Editing or removing an event

- **Edit:** open the event’s `.md` file in `_events/`, click the pencil icon, make
  changes, and commit.
- **Remove:** open the file and use **Delete file** from the `⋯` menu.

## Where things live

- `_events/` — one file per event (this is all most people ever touch).
- `_events/_TEMPLATE.md` — the copy-me template (ignored by the site).
- `calendar.md`, `about.md`, `index.md`, `events.md` — the site’s pages.
- `_config.yml` — site-wide settings, including the calendar links.

See `README.md` for the technical setup.

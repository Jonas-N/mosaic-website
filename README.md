# MOSAIC website

The website for **MOSAIC** — the Multimodal Social Interaction Group, an
international community of 200+ scholars hosted at the University of Glasgow that
meets monthly for an online **Grand Challenge** seminar.

The site lets members:

- **Subscribe to the Google Calendar** (Google, Apple Calendar, Outlook) so they
  always have the next session to hand (Zoom links go by mailing list only).
- **Browse event details** for upcoming and past Grand Challenges.

Organizers add a new event by copying one Markdown file — see
[`CONTRIBUTING.md`](CONTRIBUTING.md). No build tools or coding required.

Built with [Jekyll](https://jekyllrb.com/) and hosted on **GitHub Pages**, which
builds the site automatically on every push. Contributors don’t need Ruby or any
local setup.

---

## One-time setup (repository owner)

1. **Create the repository** on GitHub. The recommended name is `mosaic-website`
   (this matches the `baseurl` in `_config.yml`; see below to change it).
2. **Push these files** to the `main` branch.
3. **Enable GitHub Pages:** in the repo, go to **Settings → Pages**. Under
   *Build and deployment*, set **Source: Deploy from a branch**, then choose
   **Branch: `main`**, **Folder: `/ (root)`**, and click **Save**.
4. Wait a minute, then visit the URL GitHub shows on that page — typically
   `https://<your-username>.github.io/mosaic-website/`.

### Matching `baseurl` to your repo name

`_config.yml` contains:

```yaml
baseurl: "/mosaic-website"
```

- If your repository is named **`mosaic-website`**, leave this as-is.
- If you use a **different repository name**, set `baseurl` to `"/<repo-name>"`.
- If you host at the **root** (a repo named `<owner>.github.io`) or use a
  **custom domain**, set `baseurl: ""`.

### Custom domain (optional)

To use your own domain, add a file named `CNAME` at the repository root containing
just the domain (e.g. `mosaic.example.org`), configure DNS with your provider,
and set `baseurl: ""` in `_config.yml`. See
[GitHub’s custom domain guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Updating the calendar or social links

All external links live in `_config.yml` under clearly labelled keys
(`google_calendar_*`, `social`, `mailing_list_*`). Edit them there — they are used
across every page, so you only change them once.

The **Zoom link is intentionally not stored in this repository.** It lives only in
the Google Calendar events, keeping it off the public web. The site directs people
to subscribe to the calendar or the mailing list to obtain it.

## Local preview (optional)

You do **not** need this to contribute — GitHub Pages builds the site for you.
But if you want to preview locally and have Ruby installed:

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000/mosaic-website/>.

No Ruby? You can also preview with Docker:

```sh
docker run --rm -it -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4 \
  jekyll serve --baseurl /mosaic-website
```

## Repository layout

```
_config.yml            Site-wide settings (calendar links, social, baseurl)
index.md               Home page (intro + next event)
events.md              Upcoming + past event listing
calendar.md            Calendar embed + subscribe buttons
about.md               About MOSAIC
_events/               One Markdown file per event  ← organizers work here
  _TEMPLATE.md         Copy-me event template (ignored by the site)
_layouts/              Page shell (default) and event page layout
_includes/             Reusable snippets (event card, subscribe buttons)
assets/css/style.css   Styles
CONTRIBUTING.md        How to add an event (for organizers)
```

## License / credit

Content © MOSAIC. Past event descriptions are adapted from the group’s
announcement emails.

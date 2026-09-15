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

Live site: **[mosaicseminar.uk](https://mosaicseminar.uk)**.

Built with [Jekyll](https://jekyllrb.com/) and hosted on **GitHub Pages**, which
builds the site automatically on every push. Contributors don’t need Ruby or any
local setup.

---

## One-time setup (repository owner)

The site is already published from this repository (`main` branch, `/` folder)
to GitHub Pages, with the custom domain **mosaicseminar.uk**.

### Custom domain and DNS

`_config.yml` is set for the domain root:

```yaml
baseurl: ""
url: "https://mosaicseminar.uk"
```

The `CNAME` file at the repository root tells GitHub Pages the canonical host.
DNS for `mosaicseminar.uk` is served by Cloudflare. Records (DNS only / grey
cloud, not proxied) should be:

| Type | Name | Content |
|------|------|---------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `jonas-n.github.io` |

Leave the Cloudflare proxy **off** (grey cloud) so GitHub can issue the HTTPS
certificate. After DNS is correct, turn on **Enforce HTTPS** in
**Settings → Pages**.

See [GitHub’s custom domain guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Updating the calendar or social links

All external links live in `_config.yml` under clearly labelled keys
(`google_calendar_*`, `social`, `mailing_list_*`). Edit them there — they are used
across every page, so you only change them once.

The **Zoom link is intentionally not stored in this repository or on the public
calendar.** It is emailed to the approved mailing list only. The calendar is for
dates and titles; see the site copy and `CONTRIBUTING.md`.

## Local preview (optional)

You do **not** need this to contribute — GitHub Pages builds the site for you.
But if you want to preview locally and have Ruby installed:

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000/>.

No Ruby? You can also preview with Docker:

```sh
docker run --rm -it -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4 \
  jekyll serve
```

## Repository layout

```
_config.yml            Site-wide settings (calendar links, social, url)
CNAME                  Custom domain for GitHub Pages (mosaicseminar.uk)
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

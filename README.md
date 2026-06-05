# I Am That — Blog

A minimal, writing-first blog built with Astro and deployed to Azure Static Web Apps. Markdown in, static site out.

## Quick start (local)

```bash
npm install
npm run dev
```

Open http://localhost:4321 — the site is live with hot reload.

## Project structure

```
iamthat-blog/
├── src/
│   ├── content/blog/      ← your posts go here as .md files
│   ├── content.config.ts  ← schema for post frontmatter
│   ├── layouts/           ← BaseLayout wraps every page
│   ├── pages/             ← URL routes
│   │   ├── index.astro    ← homepage (post list)
│   │   ├── about.astro    ← about page
│   │   ├── rss.xml.js     ← auto-generated RSS feed
│   │   └── blog/[...slug].astro  ← individual post page
│   └── styles/global.css  ← all visual design lives here
├── public/                ← static files (favicon, images)
├── astro.config.mjs       ← site URL, integrations
└── staticwebapp.config.json ← Azure routing config
```

## Writing a post

Drop a markdown file into `src/content/blog/`. Frontmatter format:

```yaml
---
title: "Your post title"
subtitle: "A one-line subtitle, italicized in the header"
date: 2026-06-04
category: "Ashtavakra"        # optional
readTime: "4 min read"        # optional
draft: false                  # set to true to hide
---

Your post content here in markdown.

## Headings work normally

> Blockquotes are styled with an amber accent bar.

Three dashes `---` become a centered ornament between sections.
```

The filename becomes the URL slug. `my-first-post.md` → `/blog/my-first-post/`.

## Deploying to Azure Static Web Apps

### One-time setup

1. **Push this code to a GitHub repo** (create a new private repo, push everything except `node_modules` and `dist`).
2. Go to [Azure Portal](https://portal.azure.com) → **Create a resource** → search **Static Web Apps**.
3. Configure:
   - **Subscription**: yours
   - **Resource Group**: create new, name it `iamthat-blog`
   - **Name**: `iamthat-blog` (or anything)
   - **Plan**: **Free**
   - **Region**: choose closest (e.g., East Asia)
   - **Source**: GitHub
   - **Repository**: select your repo
   - **Branch**: `main`
   - **Build Presets**: **Astro**
   - **App location**: `/`
   - **Output location**: `dist`
4. Click **Review + create**. Azure auto-generates a GitHub Actions workflow in `.github/workflows/` and pushes it to your repo. First deploy runs immediately.
5. After ~2 minutes, your site is live at `https://<random-name>.azurestaticapps.net`.

### Adding a custom domain (iamthat.in)

1. Buy `iamthat.in` from any registrar (Namecheap, GoDaddy, Hover — typically ₹800–1,500/year).
2. In Azure portal → your Static Web App → **Custom domains** → **Add**.
3. Enter `iamthat.in`, choose CNAME or TXT validation.
4. Add the DNS record Azure shows you at your registrar.
5. Wait 5–30 minutes for validation. Free SSL is provisioned automatically.

### Publishing flow afterward

Every `git push` to `main` triggers a rebuild + deploy in ~60–90 seconds. Workflow:

1. Add a new `.md` file to `src/content/blog/`
2. `git add . && git commit -m "new post: ..."`
3. `git push`
4. Live in ~90 seconds.

## Updating the site URL

Once your custom domain is live, edit `astro.config.mjs` and change `site: 'https://iamthat.in'` to your actual domain so RSS and sitemap have correct absolute URLs.

## Cost

Azure Static Web Apps free tier covers:
- 100 GB bandwidth/month (a blog uses well under 1 GB unless it goes viral)
- Custom domain + SSL
- Unlimited deploys

**Total monthly cost: ₹0** (just the domain registration at ~₹100/month equivalent).

## Customizing the design

- **Colors, fonts, spacing**: all in `src/styles/global.css` under the `:root` block.
- **Nav and footer**: `src/layouts/BaseLayout.astro`.
- **Homepage hero text**: `src/pages/index.astro`.

## License

Your writing is yours. The code scaffold here is yours to modify freely.

# Deploying Savoy Therapy to Railway

Do these in order. Don't skip ahead: step 5 depends on step 4, and step 8 is the
only irreversible one.

Total time: roughly 45 minutes, plus DNS propagation.

---

## Step 1 — Push the code to GitHub

1. Go to github.com and create a new repository named `savoy-therapy-website`.
2. Set it to **Private**. This code contains your business content.
3. Do not add a README, .gitignore, or license (this project already has them).
4. On the next screen GitHub shows you commands. Use the ones under
   "…or push an existing repository from the command line."

From inside this project folder on your computer:

```
git init
git add .
git commit -m "Recovered Savoy Therapy website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/savoy-therapy-website.git
git push -u origin main
```

**Check before continuing:** refresh the GitHub page. You should see folders
named `client`, `server`, `shared`, and `drizzle`. If you only see a few loose
files, stop and fix this before moving on.

---

## Step 2 — Create the Railway project

1. Go to railway.app and sign in with your GitHub account.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Authorize Railway to access your repositories.
4. Select `savoy-therapy-website`.

Railway will immediately try to build and **the first build will fail.** That is
expected. It has no database and no environment variables yet.

---

## Step 3 — Add the MySQL database

1. In your Railway project, click **New** → **Database** → **Add MySQL**.
2. Wait for it to finish provisioning (about 30 seconds).

Railway creates a `DATABASE_URL` automatically. You do not need to copy it by
hand, but you do need to connect it in the next step.

---

## Step 4 — Set the environment variables

Click your **web service** (not the database), then the **Variables** tab.

Add each of these:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Click **Add Reference** and pick the MySQL service. Do not type it. |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | A long random string |
| `ADMIN_ACCESS_TOKEN` | A different long random string |
| `HIGHLEVEL_API_TOKEN` | From your HighLevel account |
| `HIGHLEVEL_LOCATION_ID` | From your HighLevel account |

To generate a random string, run `openssl rand -hex 32` in your terminal, or use
any password generator set to 40+ characters.

**Do not set `PORT`.** Railway sets it automatically, and overriding it will
prevent the site from starting.

### Finding your HighLevel values

`HIGHLEVEL_LOCATION_ID` is the Location (sub-account) ID, found in HighLevel
under Settings → Business Profile. `HIGHLEVEL_API_TOKEN` is a Private
Integration token created under Settings → Private Integrations, and it needs
contact write permission.

If you can't find these on deploy day, deploy anyway. The site will work
normally; form submissions just won't forward to HighLevel until you add them.
They are safe to add later, and adding them triggers an automatic redeploy.

---

## Step 5 — Create the database tables

The database exists but is empty. From your computer, with the Railway CLI:

```
npm i -g @railway/cli
railway login
railway link
railway run pnpm db:push
```

**Check before continuing:** the command should report tables created. This
creates `users`, `stimPodLeads`, `resourceGuideLeads`, `contactLeads`, and
`mobileShortcutEvents`.

---

## Step 6 — Redeploy and test the Railway URL

In Railway, click **Deploy** (or push any commit). The build should now succeed.

Railway gives you a temporary address like
`savoy-therapy-website-production.up.railway.app`. Open it and check:

- [ ] Homepage loads and the quiz is clickable
- [ ] `/services`, `/about`, `/therapy-rockstars`, `/communities` all load
- [ ] `/resources` loads and a guide download form appears
- [ ] Submit a test contact form using your own email
- [ ] Confirm that test lead appears in HighLevel

**Do not change DNS until the contact form test passes.** This is the whole
point of testing on the temporary URL first.

---

## Step 7 — Add your custom domain in Railway

1. In the web service, go to **Settings** → **Networking** → **Custom Domain**.
2. Enter `www.savoytherapy.com`.
3. Railway shows you a CNAME target. Copy it.

---

## Step 8 — Repoint DNS at Turbify

This is the irreversible step, and the moment the public site changes hands.

Log into Turbify and open the DNS settings for savoytherapy.com.

**Remove these (they point at Manus):**

- A record → `104.18.26.246`
- A record → `104.18.27.246`
- CNAME `www` → `cname.manus.space`

**Add this:**

- CNAME `www` → the target Railway gave you in step 7

For the apex domain (savoytherapy.com with no www), use Turbify's forwarding or
ALIAS option to send it to `www.savoytherapy.com`. The app already redirects
apex to www, but DNS has to get the traffic there first.

DNS changes take anywhere from 15 minutes to 48 hours to propagate. During that
window some visitors will see the old site and some the new one. This is normal.

---

## Step 9 — After the site is live

- [ ] Confirm HTTPS is working (Railway issues the certificate automatically)
- [ ] Submit one more real contact form and verify it reaches HighLevel
- [ ] In Google Search Console, submit `https://www.savoytherapy.com/sitemap.xml`
- [ ] Confirm GA4 is recording traffic (measurement ID `G-RVWSGNVL2B`)
- [ ] Visit `/contact-report` and confirm it is **blocked**. It should be. It's
      guarded by `ADMIN_ACCESS_TOKEN` and there is no login screen yet, which is
      intentional for launch.

---

## If something goes wrong

**Build fails.** Open the Railway build log and read the first error, not the
last. The first one is usually the real cause.

**Site loads but forms don't work.** Check that `DATABASE_URL` is set as a
reference to the MySQL service rather than typed as text, and that step 5 ran.

**Site loads but leads don't reach HighLevel.** The two HighLevel variables are
missing or wrong. Leads are still safely stored in the database, so nothing is
lost while you fix it.

**Everything breaks after the DNS change.** You can point DNS back to the old
records at any time. Nothing about step 8 destroys data.

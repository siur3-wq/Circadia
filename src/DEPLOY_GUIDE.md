# Deploying Circadia to GitHub Pages

## Step 1 — Export the code from Base44

Go to **Code** in the top bar → click the **Export project as ZIP** icon (top right).  
Unzip it into a local folder, then open it in VS Code.

## Step 2 — Install dependencies

```bash
npm install
```

## Step 3 — Set up your environment variables

Copy `.env.example` to `.env.local` and fill in your Base44 App ID:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_BASE44_APP_ID=your_app_id_here
VITE_BASE44_APP_BASE_URL=https://api.base44.com
```

> Find your App ID in Base44 → Dashboard → Settings.

## Step 4 — Run locally to test

```bash
npm run dev
```

## Step 5 — Push to GitHub

Create a new GitHub repo and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 6 — Configure GitHub Pages

1. Go to your GitHub repo → **Settings** → **Pages**
2. Set **Source** to **GitHub Actions**

## Step 7 — Add secrets to GitHub

Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these two secrets:
- `VITE_BASE44_APP_ID` → your Base44 app ID
- `VITE_BASE44_APP_BASE_URL` → `https://api.base44.com`

## Step 8 — Deploy

Push any commit to `main` and GitHub Actions will automatically build and deploy.  
Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Notes

- The app database (PlayerProfile, ChallengeCompletion, etc.) still lives on Base44's servers.
- All game data is shared — anyone visiting the site uses the same Base44 backend.
- If you want a completely offline/self-hosted database, that would require replacing Base44 entities with a different backend (e.g. Firebase, Supabase).
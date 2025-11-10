# Quick Start Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Before Deploying

1. **Add your profile picture:**
   - Place your profile picture in `public/pfp.png`
   - Recommended size: 800x800px or larger (square format)

2. **Update project links:**
   - Edit `src/components/Projects.jsx`
   - Replace placeholder GitHub and demo links with your actual project URLs

3. **Update Discord link (optional):**
   - Edit `src/components/Hero.jsx` and `src/components/Contact.jsx`
   - Replace the Discord link with your Discord server invite or profile URL

4. **Configure deployment:**
   - For GitHub Pages: Update `base` in `vite.config.js` to match your repository name
   - For custom domain: Set `base: '/'` in `vite.config.js` and add `CNAME` file in `public/`

## Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Custom Domain Setup

1. Update `vite.config.js`:
   ```javascript
   base: '/',
   ```

2. Create `public/CNAME`:
   ```
   tntaddict.net
   ```

3. In GitHub repository settings:
   - Go to Pages settings
   - Set custom domain to `tntaddict.net`
   - Enable "Enforce HTTPS"

4. Deploy:
   ```bash
   npm run deploy
   ```

## Troubleshooting

- **Port already in use**: Change the port in `vite.config.js` or kill the process using the port
- **Build errors**: Make sure all dependencies are installed with `npm install`
- **Theme not persisting**: Check browser localStorage permissions
- **Images not loading**: Ensure images are in the `public` folder and referenced with `/image-name.png`


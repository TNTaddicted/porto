# TNT_addict Portfolio

A modern, animated personal portfolio website built with React, Vite, TailwindCSS, and Framer Motion.

## Features

- 🎨 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 🚀 **Smooth Animations** - Powered by Framer Motion
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Performance** - Built with Vite
- 🎯 **Modern UI** - Clean, elegant design with neon green accents

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- Lucide React (Icons)
- React Scroll

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd porto
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
porto/
├── public/
│   └── pfp.png          # Profile picture (add your image here)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── postcss.config.cjs
```

## Deployment to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Install gh-pages (if not already installed):
```bash
npm install --save-dev gh-pages
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Custom Domain Setup

If you're using a custom domain (e.g., tntaddict.net):

1. Update `vite.config.js` and set the base to `/`:
```javascript
base: '/',
```

2. Create a `CNAME` file in the `public` folder with your domain:
```
tntaddict.net
```

3. In your GitHub repository settings, go to Pages and set the custom domain to `tntaddict.net`

4. Rebuild and deploy:
```bash
npm run build
npm run deploy
```

**Note:** The `base` path in `vite.config.js` must match your deployment setup:
- For GitHub Pages with repository name `porto`: use `base: '/porto/'`
- For custom domain: use `base: '/'`

## Customization

### Adding Your Profile Picture

1. Add your profile picture to the `public` folder as `pfp.png`
2. The About section will automatically display it

### Updating Skills

Edit `src/components/Skills.jsx` and modify the `skills` array.

### Adding Projects

Edit `src/components/Projects.jsx` and add your projects to the `projects` array.

### Changing Colors

Edit `tailwind.config.cjs` to customize the color scheme, particularly the `neon-green` colors.

## Theme Customization

The theme system uses Tailwind's dark mode with a custom context. Theme preferences are saved in localStorage.

## License

MIT

## Contact

- Website: [tntaddict.net](https://tntaddict.net)
- GitHub: [TNT_addict](https://github.com/TNT_addict)
- Discord: Bonked_TNT (update the Discord link in `src/components/Contact.jsx` and `src/components/Hero.jsx` if you have a Discord server invite or profile link)
- Email: contact@tntaddict.net

## Notes

- **Profile Picture**: Add your profile picture as `pfp.png` in the `public` folder for it to appear in the About section
- **Discord Links**: Discord usernames cannot be directly linked. Update the Discord links in the components if you have a server invite link or Discord profile URL
- **Project Links**: Update the project GitHub and demo links in `src/components/Projects.jsx` with your actual project URLs


# Setup Instructions for The Bonk Fire Website

## Quick Start

### 1. Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages including React, GSAP, and Vite.

### 2. Add Your Images

Place your images in the `public` folder:

- **Card Images**: `1.png`, `2.png`, `3.png`, ... up to `21.png`
- **Background Image**: `bg.png`

Your folder structure should look like:
```
bonk fire/
├── public/
│   ├── 1.png
│   ├── 2.png
│   ├── ...
│   ├── 21.png
│   └── bg.png
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── CardSwap.jsx
│   ├── CardSwap.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

### 3. Run the Development Server

```powershell
npm run dev
```

The terminal will show you a local URL (usually `http://localhost:5173`). 
Open this URL in your browser to see your website.

### 4. Build for Production

When you're ready to deploy:

```powershell
npm run build
```

This creates a `dist` folder with optimized files ready to upload to your web host.

## Features Implemented

✅ **Infinite Scrolling Cards**: Cards cycle through infinitely with smooth animations  
✅ **21 Image Placards**: Displays images 1.png through 21.png  
✅ **Project Title**: "The Bonk Fire" displayed on the left side  
✅ **Semi-Transparent Background**: bg.png at 50% opacity with white undertone  
✅ **Responsive Design**: Works on desktop, tablet, and mobile  
✅ **Pause on Hover**: Animation pauses when you hover over the cards  
✅ **Elastic Animation**: Smooth, bouncy card transitions using GSAP  

## Customization Options

### Change Animation Speed

In `src/App.jsx`, modify the `delay` prop (in milliseconds):

```jsx
<CardSwap
  delay={3000}  // Change this value (currently 3 seconds)
  ...
```

### Adjust Card Size

In `src/App.jsx`, modify `width` and `height`:

```jsx
<CardSwap
  width={400}   // Card width in pixels
  height={500}  // Card height in pixels
  ...
```

### Change Background Opacity

In `src/App.css`, find `.app::before` and adjust the `opacity`:

```css
.app::before {
  opacity: 0.5;  /* Change from 0.0 (transparent) to 1.0 (opaque) */
  ...
}
```

### Modify Title Style

Edit the `.project-title` class in `src/App.css` to change font size, color, etc.

## Troubleshooting

**Images not showing?**
- Make sure all images are in the `public` folder
- Image names must be exactly: `1.png`, `2.png`, etc. (case-sensitive)
- Try clearing cache: Ctrl+Shift+R in browser

**Animation not working?**
- Check browser console (F12) for errors
- Ensure GSAP installed: run `npm install` again

**Port already in use?**
- Vite will automatically try the next available port
- Or specify a port: `npm run dev -- --port 3000`

## Browser Support

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Next Steps

After verifying everything works locally, you can:
1. Deploy to Netlify, Vercel, or any static hosting service
2. Upload the `dist` folder contents to your web server
3. Connect a custom domain

Enjoy your website! 🔥


# The Bonk Fire

A React-based website featuring an animated card carousel with GSAP animations.

## Setup

1. Make sure you have Node.js installed (v16 or higher)

2. Install dependencies:
```bash
npm install
```

3. Place your images in the `public` folder:
   - Add images named `1.png` through `21.png`
   - Add your background image as `bg.png`

4. Run the development server:
```bash
npm run dev
```

5. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy.

## Project Structure

- `src/CardSwap.jsx` - The animated card swap component
- `src/CardSwap.css` - Styles for the card animation
- `src/App.jsx` - Main application component
- `src/App.css` - Main application styles
- `public/` - Place all images here (1.png - 21.png and bg.png)

## Features

- Infinite looping card animation with GSAP
- 21 image placards cycling through
- Semi-transparent background with white glow effect
- Responsive design for mobile and tablet
- Pause animation on hover


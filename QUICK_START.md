# 🔥 Quick Start - AI PFP Generator

## TL;DR - What You Need to Do

### Step 1: Get OpenAI API Key (5 minutes)
1. Go to https://platform.openai.com/api-keys
2. Create account & get API key (starts with `sk-...`)
3. Add $5-10 credits to your OpenAI account

### Step 2: Add API Key to Netlify (2 minutes)
1. Open your Netlify dashboard
2. Go to **Site settings** → **Environment variables**
3. Add variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your API key
4. Save & redeploy

### Step 3: Deploy (1 minute)
```bash
git add .
git commit -m "Add AI PFP generator"
git push origin main
```

That's it! ✅

## What I Built For You

### 🎨 Two Modes in One Generator

**Mode 1: Stickers** (Your Original Request)
- Upload profile picture
- Browse 32 stickers (images 33-64)
- Drag & drop stickers onto image
- Apply with ✓ or remove with ✕
- Copy to clipboard

**Mode 2: AI Transform** (The New Feature!)
- Upload profile picture
- Choose from 6 preset fire-themed prompts:
  - "Make this a pixel art style bonk fire warrior"
  - "Transform this into a cyberpunk style with neon orange flames"
  - "Add epic fire effects and glowing eyes"
  - "Make this look like a retro 8-bit video game character"
  - "Turn this into a legendary fire mage with magical flames"
  - "Create a cosmic space theme with fire nebulas"
- OR write custom prompts
- Click Generate
- Wait 5-15 seconds
- Get AI-transformed image!

### 🔒 Security Features
- API key stays on server (never exposed to users)
- Uses Netlify Functions (serverless)
- No backend server needed
- Runs entirely on Netlify

### 💰 Costs
- **Netlify:** FREE (125k function calls/month)
- **OpenAI:** ~$0.02 per AI generation
  - Example: 100 AI generations = ~$2

## File Structure

```
bonk fire/
├── src/
│   ├── PfpGenerator.jsx     ← Updated with AI mode
│   └── PfpGenerator.css     ← Styled both modes
├── netlify/
│   └── functions/
│       └── generate-ai-pfp.js  ← Serverless function (secure!)
├── package.json             ← Added form-data dependency
├── AI_SETUP_GUIDE.md       ← Detailed setup instructions
└── QUICK_START.md          ← This file
```

## How It Works

```
User uploads image
     ↓
Mode 1: Stickers          Mode 2: AI Transform
     ↓                         ↓
Drag stickers             Choose/write prompt
     ↓                         ↓
Apply & lock              Click Generate
     ↓                         ↓
Copy to clipboard         Frontend sends to Netlify Function
                               ↓
                          Netlify Function calls OpenAI API
                               ↓
                          Returns AI-generated image
                               ↓
                          Display & copy to clipboard
```

## Testing Locally

```bash
# Install Netlify CLI (one time)
npm install -g netlify-cli

# Run with Netlify Functions
netlify dev
```

## Need Help?

Check `AI_SETUP_GUIDE.md` for detailed instructions and troubleshooting!

---

**Ready to go!** Just add your OpenAI API key to Netlify and deploy! 🚀


# AI Profile Picture Generator - Setup Guide

## How It Works 🔥

The AI PFP Generator uses **Netlify Functions** (serverless) with a two-step AI process:

1. **GPT-4 Vision** analyzes the uploaded image and describes it
2. **DALL-E 3** generates a new flamified version based on that description + your prompt

Your API key stays safe on the server and is never exposed to users!

## Setup Instructions

### 1️⃣ Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click **"Create new secret key"**
4. Copy the API key (it starts with `sk-...`)
5. **Important:** You need to add credits to your OpenAI account to use the API

### 2️⃣ Configure Netlify

#### Option A: Using Netlify Dashboard (Recommended)
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click **"Add a variable"**
4. Add:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key (the one starting with `sk-...`)
5. Click **"Save"**
6. Redeploy your site for changes to take effect

#### Option B: Using Netlify CLI
```bash
netlify env:set OPENAI_API_KEY "your-api-key-here"
```

### 3️⃣ Install Dependencies

Run this in your project folder:
```bash
npm install
```

This will install the `form-data` package needed for the serverless function.

### 4️⃣ Test Locally (Optional)

To test locally with Netlify Functions:

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Run the dev server:
```bash
netlify dev
```

This will start your site with Netlify Functions enabled locally.

### 5️⃣ Deploy to Netlify

Just push your code to GitHub and Netlify will automatically deploy!

```bash
git add .
git commit -m "Add AI PFP generator"
git push origin main
```

## How Users Will Use It

1. **Upload Profile Picture** - Click to upload their image
2. **Switch to AI Transform Tab** - Click the "AI Transform" button
3. **Choose a Preset** or write a custom prompt:
   - "Make this a pixel art style bonk fire warrior"
   - "Transform this into a cyberpunk style with neon orange flames"
   - "Add epic fire effects and glowing eyes"
   - And more!
4. **Click Generate** - Wait 5-15 seconds for the AI magic ✨
5. **Copy to Clipboard** - Download their new AI-generated PFP!

## Features

✅ **Secure** - API key is never exposed to users  
✅ **Serverless** - No server needed, just Netlify Functions  
✅ **Fast** - Runs on Netlify's edge network  
✅ **Free Tier** - Netlify Functions have a generous free tier  
✅ **Preset Prompts** - 6 fire-themed presets ready to use  
✅ **Custom Prompts** - Users can write their own prompts  

## Costs

- **Netlify Functions:** Free for first 125k requests/month
- **OpenAI API per flamification:**
  - GPT-4o Vision: ~$0.005-0.01 per image analysis
  - DALL-E 3: ~$0.04 per 1024x1024 generation
  - **Total: ~$0.05 per flamification**
  - You'll need to add credits to your OpenAI account
  - Monitor usage in your OpenAI dashboard

## Troubleshooting

### "OpenAI API key not configured"
- Make sure you added `OPENAI_API_KEY` to Netlify environment variables
- Redeploy your site after adding the variable

### "Failed to generate AI image"
- Check if your OpenAI account has credits
- Verify the API key is correct in Netlify dashboard
- Check Netlify Function logs for detailed errors

### Testing Locally Not Working
- Make sure you're using `netlify dev` instead of `npm run dev`
- The function URL is `/.netlify/functions/generate-ai-pfp`

## Need Help?

Check the Netlify Function logs in your Netlify dashboard under **Functions** tab.

---

🔥 **Enjoy creating epic AI-powered profile pictures for the Bonk Fire community!** 🔥


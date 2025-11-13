import fetch from 'node-fetch';
import FormData from 'form-data';

export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { image, prompt } = JSON.parse(event.body);

    if (!image || !prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing image or prompt' })
      };
    }

    // Get API key from environment variable (set in Netlify dashboard)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your Netlify environment variables.' 
        })
      };
    }

    // Convert base64 image to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Create form data for OpenAI API
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'image.png',
      contentType: 'image/png'
    });
    formData.append('prompt', prompt);
    formData.append('n', '1');
    formData.append('size', '512x512');

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('AI Generation Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message || 'Failed to generate AI image' 
      })
    };
  }
}


import fetch from 'node-fetch';

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

    // Step 1: Use GPT-4 Vision to describe the image
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe this image in detail, focusing on the main subject, their appearance, pose, and background. Be concise but descriptive.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    // Get response text first for better error handling
    const visionResponseText = await visionResponse.text();
    console.log('Vision API Response Status:', visionResponse.status);
    console.log('Vision API Response:', visionResponseText.substring(0, 500));

    if (!visionResponse.ok) {
      let errorMessage = `Vision API Error (${visionResponse.status}): ${visionResponse.statusText}`;
      try {
        const errorData = JSON.parse(visionResponseText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        errorMessage = `${errorMessage} - Response: ${visionResponseText}`;
      }
      throw new Error(errorMessage);
    }

    let visionData;
    try {
      visionData = JSON.parse(visionResponseText);
    } catch (e) {
      throw new Error(`Failed to parse Vision API response: ${visionResponseText.substring(0, 200)}`);
    }

    if (!visionData.choices || !visionData.choices[0] || !visionData.choices[0].message) {
      throw new Error(`Invalid Vision API response structure: ${JSON.stringify(visionData)}`);
    }

    const imageDescription = visionData.choices[0].message.content;

    // Step 2: Generate flamified version using DALL-E 3
    const dallePrompt = `${imageDescription}. ${prompt}`;

    console.log('DALL-E Prompt:', dallePrompt);

    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: dallePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    // Get response text first for better error handling
    const dalleResponseText = await dalleResponse.text();
    console.log('DALL-E API Response Status:', dalleResponse.status);
    console.log('DALL-E API Response:', dalleResponseText.substring(0, 500));

    if (!dalleResponse.ok) {
      let errorMessage = `DALL-E API Error (${dalleResponse.status}): ${dalleResponse.statusText}`;
      try {
        const errorData = JSON.parse(dalleResponseText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        errorMessage = `${errorMessage} - Response: ${dalleResponseText}`;
      }
      throw new Error(errorMessage);
    }

    let dalleData;
    try {
      dalleData = JSON.parse(dalleResponseText);
    } catch (e) {
      throw new Error(`Failed to parse DALL-E response: ${dalleResponseText.substring(0, 200)}`);
    }
    
    // Fetch the generated image and convert to base64 (bypass CORS)
    if (dalleData.data && dalleData.data[0] && dalleData.data[0].url) {
      const imageUrl = dalleData.data[0].url;
      
      // Download the image from OpenAI
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.buffer();
      
      // Convert to base64
      const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          imageUrl: base64Image,
          description: imageDescription
        })
      };
    }

    throw new Error('No image generated');

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


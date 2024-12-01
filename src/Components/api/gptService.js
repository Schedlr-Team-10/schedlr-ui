export async function generateDescription(keywords) {
  try {
    console.log("Calling backend with keywords:", keywords);

    const description = Array.isArray(keywords) ? encodeURIComponent(keywords.join(' ')) : encodeURIComponent(keywords);

    const response = await fetch(`${process.env.REACT_APP_CHATGPT_API_URL}/schedlrai/generate?description=${description}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching description:', error);
    throw new Error('Failed to generate description.');
  }
}

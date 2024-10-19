export async function generateDescription(keywords) {
    try {
      const response = await fetch('http://localhost:5000/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords }),
      });
  
      const data = await response.json();
      return data.description;
    } catch (error) {
      console.error('Error fetching description:', error);
      throw new Error('Failed to generate description.');
    }
  }
  
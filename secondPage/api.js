const API_KEY = ''; // Replace with your actual API key

async function generateQuestions(category, count, difficulty) {
    const prompt = `Generate ${count} ${difficulty} difficulty multiple-choice quiz questions about ${category}. 
    Format each question as a JSON object with:
    - question (string)
    - options (array of 4 strings)
    - answer (string, the correct option)
    - explanation (string, brief explanation)
    
    Return only a JSON array of these objects, no additional text or formatting.`;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Try to parse the JSON response
        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse JSON response:", content);
            throw new Error("Invalid response format from AI");
        }
    } catch (error) {
        console.error("Error generating questions:", error);
        throw error;
    }
}

export { generateQuestions };
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY; // Get API key from environment variable

const generateTicketTitle = async (text) => {
    try {
        console.log("Received text:", text); // Log the received text

        const prompt = `Generate only one and short ticket title (in Hebrew) based on the following text: ${text}`;
        
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("API Response:", response.data); // Log the full API response

        // Check if the response has candidates and get the first candidate's content
        if (response.data.candidates && response.data.candidates.length > 0) {
            const candidate = response.data.candidates[0];
            console.log("Candidate:", candidate); // Log the candidate object to verify the structure
        
            if (candidate.content) {
                const content = candidate.content;
                console.log("Content:", content); // Log the content object to verify the structure
        
                if (content.parts && content.parts.length > 0) {
                    const text = content.parts[0].text;
                    console.log("Generated Title:", text);
                    return text.trim(); // Return the generated title
                } else {
                    console.error("Error: 'parts' array is empty or undefined");
                }
            } else {
                console.error("Error: 'content' array is empty or undefined");
            }
        } else {
            console.error("Error: 'candidates' array is empty or undefined");
        }
        
    } catch (error) {
        console.error("Error generating ticket title:", error);
        throw new Error("Failed to generate ticket title.");
    }
};

module.exports = { generateTicketTitle };

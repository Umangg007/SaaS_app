// Simple server without mongoose for immediate deployment
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'Sassinator Backend is running! 🚀',
        status: 'success',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API is working!',
        status: 'success'
    });
});

// Simple idea validation endpoint (without database)
app.post('/api/validate', async (req, res) => {
    try {
        const { idea, tone } = req.body;
        
        if (!idea || !tone) {
            return res.status(400).json({ 
                error: 'Missing required fields: idea and tone' 
            });
        }

        // Simple validation
        if (idea.trim().length < 10) {
            return res.status(400).json({
                error: 'Please provide a more detailed idea (at least 10 characters)'
            });
        }

        // Create prompt based on tone
        const prompt = tone === 'fun'
            ? `In 10-15 lines, give a fun, emoji-filled, and honest review of this SaaS idea: "${idea}".
- Start with a catchy one-line summary and a rating out of 10 (with emoji).
- List one key strength and one key weakness.
- Give 2-3 actionable next steps for the user.
- Suggest a creative way to validate the idea.
- Mention one thing to avoid or watch out for.
- End with a witty, encouraging line.
- Use emojis throughout, but keep it concise and impactful. No unnecessary fluff!`
            : `In 10-15 lines, give a concise, professional, and honest review of this SaaS idea: "${idea}".
- Start with a one-line summary and a rating out of 10.
- List one key strength and one key weakness.
- Give 2-3 actionable next steps for the user.
- Suggest a practical way to validate the idea.
- Mention one risk or challenge to consider.
- End with a clear, motivating line.
- Be clear, actionable, and to the point. No unnecessary fluff!`;

        // Call Cohere API
        const COHERE_API_KEY = process.env.COHERE_API_KEY || 'dggRhTkg6pXWoIpQuU5wnGtDXG3bw2KqHd4rsExn';
        const cohereResponse = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command',
                prompt: prompt,
                max_tokens: 800,
                temperature: 0.7,
                k: 0,
                stop_sequences: [],
                return_likelihoods: 'NONE'
            })
        });

        if (!cohereResponse.ok) {
            const errorData = await cohereResponse.json();
            console.error('Cohere API Error:', errorData);
            return res.status(500).json({ 
                error: 'Failed to get AI response',
                details: errorData
            });
        }

        const cohereData = await cohereResponse.json();
        const aiResponse = cohereData.generations[0].text;

        // Determine result type
        const lowerAnalysis = aiResponse.toLowerCase();
        let resultType = 'error';
        if (lowerAnalysis.includes('promising') || lowerAnalysis.includes('strong') || lowerAnalysis.includes('excellent')) {
            resultType = 'success';
        } else if (lowerAnalysis.includes('needs work') || lowerAnalysis.includes('potential') || lowerAnalysis.includes('improve')) {
            resultType = 'warning';
        }

        res.json({
            success: true,
            result: aiResponse,
            resultType: resultType,
            tone: tone,
            idea: idea,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Validation error:', error);
        res.status(500).json({ 
            error: 'Failed to validate idea',
            message: error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting simple Sassinator Backend...');
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔧 Port: ${PORT}`);

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`🎯 Ready to validate SaaS ideas!`);
}); 
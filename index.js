const express = require('express');
const axios = require('axios'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/hastebin', async (req, res) => { 
    const { url } = req.query;

    if (!url || !url.startsWith('https://hastebin.skyra.pw/')) { 
        return res.json({ "error": "You need a valid URL parameter" });
    }

    const hastebinUrl = url.replace('https://hastebin.skyra.pw/', 'https://hastebin.skyra.pw/raw/');

    try {
        const response = await axios.get(hastebinUrl);
        res.json({ "result": response.data });
    } catch (error) {
        res.status(500).json({ "error": "Failed to fetch content" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

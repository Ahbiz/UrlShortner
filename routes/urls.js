import express from "express";
import { generateShortCode, validateUrl } from "../utils/utils.js";
import Url from "../models/Url.js";


const router = express.Router();
router.post('/shorten', async (req, res) => {
    const { long_url } = req.body;

    if (!long_url) {
        return res.status(400).json({ error: 'Long URL is required' });
    }

    if (!validateUrl(long_url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        let url = await Url.findOne({ long_url })
        if (url) {
            return res.status(200).json({ short_url: url.short_url })
        }

        const short_code = await generateShortCode();
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        const shortUrl = `${baseUrl}/${short_code}`;

        url = new Url({
            long_url,
            short_url: shortUrl,
            short_code
        })
        await url.save()
        return res.status(200).json({ short_url: shortUrl })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;


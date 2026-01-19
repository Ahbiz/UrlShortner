import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

router.get('/:code', async (req, res) => {
   try {
    const url = await Url.findOne({ short_code: req.params.code })
    if (!url) {
        return res.status(404).json({ error: 'URL not found' })
    }
    return res.redirect(url.long_url)
   } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
   }
})

export default router

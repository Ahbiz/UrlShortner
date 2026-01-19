import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    long_url: {
        type: String,
        required: true
    },
    short_code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Url", urlSchema);



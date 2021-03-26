import mongoose from 'mongoose';
const VideosSchema = mongoose.Schema({
    url: String,
    channel: String,
    description: String,
    song: String,
    likes: Number,
    messages: Number,
    shares: Number,
});
const Videos = mongoose.model('Videos', VideosSchema);
export default Videos;

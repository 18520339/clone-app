import mongoose from 'mongoose';
const PostsSchema = mongoose.Schema({
    username: String,
    caption: String,
    imgUrl: String,
    timestamp: String,
    comments: [],
});
const Posts = mongoose.model('Posts', PostsSchema);
export default Posts;

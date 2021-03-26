import mongoose from 'mongoose';
const MessagesSchema = mongoose.Schema({
    name: String,
    text: String,
    timestamp: String,
});
const Messages = mongoose.model('Messages', MessagesSchema);
export default Messages;

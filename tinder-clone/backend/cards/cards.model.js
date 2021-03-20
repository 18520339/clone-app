import mongoose from 'mongoose';
const CardsSchema = mongoose.Schema({ name: String, imgUrl: String });
const Cards = mongoose.model('Cards', CardsSchema);
export default Cards;

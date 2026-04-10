import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    category: {
        type: String,
        enum: ['Snacks', 'Main Course', 'Pizza', 'Desserts', 'Beverages', 'Burgers', 'Fries', 'Sandwiches', 'North Indian', 'South Indian', 'Chinese', 'Fast Food', 'Rolls', 'Salads', 'Ice Creams', 'Noodles', 'Momos','Others'],
        required: true
    },
    price: {
        type: Number,
        min:0,
        required: true
    },
    description: {
        type: String,
        required: true  
    },
    foodType: {
        type: String,
        enum: ['Veg', 'Non Veg', 'Vegan'],
        required: true
    },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
const mongoose = require("mongoose")
const {Schema,model} = mongoose

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Review = model('Review', reviewSchema);
module.exports = Review;

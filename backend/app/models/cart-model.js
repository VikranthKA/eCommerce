const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        isLogo:{
            type:Boolean
        },

        version: {
            type: String,
        },
        licenseKey: {
            type: String,
        },
        systemRequirements: {
            type: String,
        },
        isRealModelIncluded: {
            type: Boolean,
            default: false,
        },
    }],
}, { timestamps: true });

const Cart = model('Cart', cartSchema);
module.exports = Cart;

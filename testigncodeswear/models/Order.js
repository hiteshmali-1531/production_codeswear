const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    orderid : {
        type: String,
        required : true
    },
    paymentinfo: {
        type:String,
        default: ''
    },
    products : {
        type: Object,
        required: true
    }
        ,
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status : {
        type: String,
        dafault: 'Pending',
         
    },
    deliveryStatus : {
        type:String,
        default: 'Unshipped', required: true
    }

}, {timestamps : true});

// mongoose.models = {};

// export default mongoose.model('Order', OrderSchema);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
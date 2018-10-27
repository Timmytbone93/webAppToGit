var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    orderNumber: {
        type: Number, required: true,
        unique: true, Integer: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bar: {
        type: Schema.Types.ObjectId,
        ref: 'Bar'
    },
    deal: {
        DealItems: {
            itemName: {
                type: String, required: true
            },
            price: {
                type: Number, required: true
            },
            quantity: {
                type: Number, Integer: true,
                required: true
            }
        }
    }

});

OrderSchema.set('toJSON', {getters: true, virtuals: true});


module.exports = mongoose.model('Order', OrderSchema);
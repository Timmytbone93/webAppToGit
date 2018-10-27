var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DealSchema = new Schema({
    dealName: {
        type: String, required: true,
        unique: true
    },
    dealItems: {
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


});

DealSchema.set('toJSON', {getters: true, virtuals: true});


module.exports = mongoose.model('Deal', DealSchema);
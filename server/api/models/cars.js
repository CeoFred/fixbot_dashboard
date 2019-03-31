const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true},
    model : {type:String},
    modelYear: {type:Number}
});

let Car = mongoose.model('Car',carSchema);
module.exports = Car;
const mongoose = require('mongoose');


const vehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    Car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }
});

let Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
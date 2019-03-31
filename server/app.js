const express = require('express');
var cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userVehicleRoutes = require('./api/routes/userVehicle');
// const orderRoutes = require('./api/routes/carsAPI');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost/fixbot',{
    useNewUrlParser:true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection noticed an error:'));
db.once('open',() =>{
console.log('Connected to fixbot with collections like '+ db.collections);
});

mongoose.Promise = global.Promise;

app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use('/products',productRoutes);
app.use('/user/vehicle', userVehicleRoutes);
app.use('/user',userRoutes);
app.use('/',(req,res,next) => {
res.status(404).json({"Message":"Nothing for you here"})
    });
// middleware for errors
app.use((req,res,next) => {

        const error = new Error('Not found');
        error.status = 400;
        next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require ('./routes/sauces')
const userRoutes = require('./routes/user')
const dotenv = require('dotenv').config()


//mongoDBatlas

mongoose.connect( process.env.Database_url ,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


//cors 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
});

// body parser
app.use(express.json()); 


//routes a suivre
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


app.listen(3000, () => console.log('App listening on port 3000') )





const express = require('express');

const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

const app = express();


mongoose.connect('mongodb+srv://Piiquante:jaimelasaucepiquante@clusterpiiquante.lmsyt8e.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use(express.json()); 



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//login

app.post('/api/auth/login', (req, res ) => {
    console.log('requete Post login reçue')
    const authorizedUser = { userId:'oualalal',token: 'yoloooo' }

    res.status(200).json(authorizedUser);  
});


// Post signup
    


// get sauce
app.get('/api/sauces', (req, res ) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
    
});

  
app.post('/api/sauces', (req, res ) => {  
    console.log('abc')  
    console.log(req.body)  
    const sauce = new Sauce({
      ...req.body       
    });
    sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
    
});


module.exports = app




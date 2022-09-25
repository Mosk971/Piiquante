const express = require('express');

const app = express();

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/auth/signup', (req, res ) => {
    console.log('requete Post signup envoyée')
    const authorizedUser = 'Signup'
    res.status(200).json(authorizedUser); 

});

app.post('/api/auth/login', (req, res ) => {
    console.log('requete Post login envoyée')
    const authorizedUser = 'Login'
    res.status(200).json(authorizedUser); 
  
});


app.get('/api/sauces', (req, res ) => {
    console.log('requete Get all sauces envoyée')
    const authorizedUser = 'Get all sauces'
    res.status(200).json(authorizedUser); 
  
});





module.exports = app;
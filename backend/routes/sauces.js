const express = require('express');
const router = express.Router();

const sauceController = require('../controllers/sauce');

router.get('/', sauceController.getSauce);


  
// router.post('/', (req, res ) => {  
//     console.log('abc')  
//     console.log(req.body)  
//     const sauce = new Sauce({
//       ...req.body       
//     });
//     sauce.save()
//     .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
//     .catch(error => res.status(400).json({ error }));
    
// });

module.exports = router;

const Sauce = require('../models/Sauce')

exports.getSauce = (req, res ) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
    
};


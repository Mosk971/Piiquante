const Sauce = require('../models/Sauce')
const fs = require('fs');




//create sauce

exports.createSauce = ( req, res, next) => {     
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(req.file)
    
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
};


//Get one sauce

exports.getOneSauce = ( req, res, next) => { 
    Sauce.findOne({ _id: req.params.id })  
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


//Get all sauce

exports.getAllSauces = (req, res, next ) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
    
};


//Modifiy sauce 

exports.modifySauce = ( req, res, next) => { 
    const sauceObject =req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    
    //appercu du body
    console.log(req.body)   
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
               res.status(403).json({ message : 'Not authorized'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));

                // delete previous image
                let filename = (sauce.imageUrl.split('/images/'))[1]
                fs.unlink(`images/${filename}`, () => {});
            }
        })
        .catch((error) => {
            console.error(error)
            res.status(400).json({ error });
        });                
    };
    

    //delete sauce    
    exports.deleteSauce = ( req, res, next) => { 
        Sauce.findOne({ _id: req.params.id})
           .then(sauce => {
               if (sauce.userId != req.auth.userId) {
                   res.status(403).json({message: 'Not authorized'});
               } else {
                   const filename = sauce.imageUrl.split('/images/')[1];
                   fs.unlink(`images/${filename}`, () => {
                       Sauce.deleteOne({_id: req.params.id})
                           .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                           .catch(error => res.status(401).json({ error }));
                   });
               }
           })
           .catch( error => {
               res.status(500).json({ error });
           });
    };

    // like et dislike
    exports.likeOrDislike = (req, res, next) => {
        try
        {
            console.log("req.body") 
            console.log(req.body) 
    
            const action = req.body.like
            const sauceId = req.params.id
            const userId = req.auth.userId
            
    
            console.log({ _id: req.params.id})   
            Sauce.findOne({ _id: req.params.id}) 
            .then((sauce) => {

                try
                {
                    console.log("sauce")
                    console.log(sauce)
        // like = 1 ajouter 1 a like et userId a usersLiked
                    if(action == 1)
                    {
                        Sauce.updateOne({_id: sauceId}, 
                        {
                            $inc : {likes : 1},
                            $push : {usersLiked : userId}
                        })
                        .then(() => {
                            res.status(200).json({message : 'Objet modifié!'})
                        })
                        .catch(error => {
                            res.status(401).json({ error })
                        });

                    } // like = -1 ajouter 1 a dislike et remove userId a usersDisliked
                    else if(action == -1)
                    {
                        Sauce.updateOne(
                    
                        {_id: sauceId}, 
                        {
                            $inc : {dislikes : 1},
                            $push : {usersDisliked : userId}
                        })
                        .then(() => {
                            res.status(200).json({message : 'Objet modifié!'})
                        })
                        .catch(error => {
                            res.status(401).json({ error })
                        });
                    } // like = 0 ajouter 1 a like et userId a usersLiked
                    else if(action == 0)
                    {
                        
                        if(sauce.usersLiked.includes(userId))
                        {
                            Sauce.updateOne(
                    
                            {_id: sauceId}, 
                            {
                                $inc : {likes : -1},
                                $pull : {usersLiked : userId}
                            },
                            {new: true}
                            )
                            .then((err, doc) => {

                                console.log("doc")
                                console.log(doc)
                                
                                res.status(200).json({message : 'Objet modifié!'})
                            })
                            .catch(error => {
                                res.status(401).json({ error })
                            });
        
                        } // verification de la liste des userId
                        else if(sauce.usersDisliked.includes(userId))
                        {
                            Sauce.updateOne(
                    
                            {_id: sauceId}, 
                            {
                                $inc : {dislikes : -1},
                                $pull : {usersDisliked : userId}
                            })
                            .then(() => {
                                
                                res.status(200).json({message : 'Objet modifié!'})
                            })
                            .catch(error => {
                                res.status(401).json({ error })
                            });
                        } 
                    }
                }
                catch(e)
                {
                    console.error("e2")
                    console.error(e)
                }
            
            })
            .catch((error) => {
                res.status(404).json({ error })
            });  
        }
        catch(e)
        {
            console.error("e")
            console.error(e)
        }
         
        
    }
    
    
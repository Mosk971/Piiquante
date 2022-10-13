const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors');

//model sauce
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },   
    name: { type: String , required: true },
    manufacturer: { type: String , required: true },
    description: { type: String , required: true },
    mainPepper: { type: String , required: true },
    imageUrl: { type: String , required: false },
    heat: { type: Number , required: true },
    likes: { type: Number , required: false },
    dislikes: { type: Number , required: false },
    usersLiked: { type: [String] , required: false },
    usersDisliked: { type: [String]  , required: false },
    
});

sauceSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Sauce', sauceSchema);
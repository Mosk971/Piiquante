const multer = require('multer');


const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
};


 //enregistrement de l'imageet gestion des extension dans le dossier images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        name = (name.split('.' + extension))[0];
        callback(null, name + Date.now() + '.' + extension);
    }
});


module.exports = multer({ storage }).single('image');
const multer = require("multer");
const path = require("path");

const storageProductImages = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/images/Products");
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_Product${path.extname(file.originalname)}`);
    },
});

const configUploadProductImages = multer({
    storage: storageProductImages,
    limits: {
        files: 4,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null, false, req.fileValidationError);
        }

        cb(null, true);
    },
});

const uploadProductImages = (req, res, next) => {
    const upload = configUploadProductImages.fields([{name: 'image'},{name: 'images'}]);

    upload(req, res, function (error) {
        if (error) {
            req.fileValidationError = "No más de 3 imágenes";
        }
        next();
    });
};

const storageUserImage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/images/users");
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_Users${path.extname(file.originalname)}`);
    },
});

const uploadUserImage = multer({
    storage: storageUserImage,
    
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null, false, req.fileValidationError);
        }

        cb(null, true);
    },
});


module.exports = {
    uploadProductImages,
    uploadUserImage
};

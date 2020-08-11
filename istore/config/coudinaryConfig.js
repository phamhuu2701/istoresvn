var cloudinary = require("cloudinary").v2;

// set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
    cloud_name: "dkt8fzhrr",
    api_key: "997565866414374",
    api_secret: "r5Duk8gcv-npilu4AWyrLtc8k-M"
});

// save image into cloudinary
var uploadFile = (fileType, file) => {
    let uploadFolderPath;
    if (fileType.localeCompare("image") == 0) {
        uploadFolderPath = "istore/upload/images/";
    } else if (fileType.localeCompare("video") == 0) {
        uploadFolderPath = "istore/upload/videos/";
    } else {
        return null;
    }
    return cloudinary.uploader
        .upload(file.path, {
            resource_type: fileType,
            public_id: uploadFolderPath + file.fieldName + "-" + Date.now(),
            overwrite: true
        })
        .then(
            result => result,
            err => null
        );
};

// delete image from cloudinary
var deleteFile = publicId => {
    return cloudinary.uploader.destroy(publicId).then(
        result => true,
        err => false
    );
};

// delete video from cloudinary
var deleteFileApi = publicId => {
    return cloudinary.api
        .delete_resources(publicId, { resource_type: "video" })
        .then(
            result => true,
            err => false
        );
};

module.exports = cloudinary;
module.exports.uploadFile = uploadFile;
module.exports.deleteFile = deleteFile;
module.exports.deleteFileApi = deleteFileApi;

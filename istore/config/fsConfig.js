var fs = require("fs");

var deleteFileInServer = filePath => {
    return new Promise((resolve, reject) => {
        // delete file in server
        fs.unlink(filePath, err => {
            if (err) {
                return reject(false);
            } else {
                return resolve(true);
            }
        });
    });
};

module.exports = {
    deleteFileInServer: deleteFileInServer
};

var multiparty = require("multiparty");

var formParse = req => {
    let form = new multiparty.Form();
    return new Promise((resolve, reject) => {
        form.parse(req, function(err, fields, files) {
            let result = {
                fields: fields,
                files: files
            };
            return resolve(result);
        });
    });
};

module.exports = {
    formParse: formParse
};

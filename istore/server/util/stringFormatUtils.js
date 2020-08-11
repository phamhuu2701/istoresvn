module.exports = function (str) {
    if (!str) {
        return "";
    } else {
        return str.replace(/\.\*/g, " ").toLowerCase();
    }
}



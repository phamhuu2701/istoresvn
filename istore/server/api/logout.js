const express = require('express');
const app = express.Router();

app.route('/').get((req, res) => {
    // req.session.user = null;
    // req.session.isLogged = false;
    req.session.destroy(err => {
        if (err) console.log(err);
        return res.status(200).json({
            isLogged: false,
            user: null
        });
    });
});

module.exports = app;

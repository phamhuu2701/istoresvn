const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	service: 'gmail',
	auth: {
		user: config.get('mail.user'),
		pass: config.get('mail.pass')
	}
})

module.exports = transporter;
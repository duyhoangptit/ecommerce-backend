const nodemailer = require('nodemailer')
const pug = require('pug')
const htmlToText = require('html-to-text')

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = process.env.EMAIL_FROM
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // sendgrid
            return 1;
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    async send(template, subject) {
        // 1 Render html base on a bug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })

        // 2. Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            text: htmlToText.fromString(html),
            html: html
        }

        // 3. Create a transport and send mail
        const transport = this.newTransport()
        await transport.sendMail(mailOptions)
    }

    async sendWelcome() {
        const template = ""
        await this.send(template, "welcome to the natours family")
    }

    async sendEmailLinkVerify({
        html,
        toEmail,
        subject
                              }) {
        const mailOptions = {
            from: this.from,
            to: toEmail,
            subject: subject,
            text: htmlToText.fromString(html),
            html: html
        }

        // 3. Create a transport and send mail
        const transport = this.newTransport()
        await transport.sendMail(mailOptions)
    }
}

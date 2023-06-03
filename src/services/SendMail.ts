
import "dotenv/config"
import nodemailer from "nodemailer"

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'programadorwebti@gmail.com',
        pass: process.env.EMAIL_KEY
    },
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    }
});


class CLASSSendEmail {
    #to
    #title
    #body
    constructor({ to, title, body }) {
        this.#to = to
        this.#title = title
        this.#body = body
    }

    async send() {

        let mailDetails = {
            from: this.#to,
            to: this.#to,
            bcc: "heuder.sicoob@gmail.com",
            subject: this.#title,
            html: this.#body

        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                return err
            } else {
                return data
            }
        });


    }

}

export { CLASSSendEmail }
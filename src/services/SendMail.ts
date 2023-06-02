
import "dotenv/config"
import nodemailer from "nodemailer"
import { v4 } from "uuid"

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
    #code = v4()
    constructor({ to, title, body }) {
        this.#to = to
        this.#title = title
        this.#body = body
    }

    async send() {

        let mailDetails = {
            from: this.#to,
            to: this.#to,
            bcc: "heuderrodriguesdesena@gmail.com,heuder.sicoob@gmail.com",
            subject: this.#title,
            html: this.#body

        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log(err);

                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
                console.log(data);

            }
        });


    }

}

const uuid = v4()

const _HTML = `
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gamer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet" />
</head>

<body>
<main class="w-full h-full flex flex-row gap-4 justify-center bg-blue-500 p-4">
<center>http://192.168.0.111:4008/v1/recover-password/${uuid}</center>
</main>

</body>

</html>
`

new CLASSSendEmail({ to: "heuderdev@gmail.com", title: `Recuperação de senha ${uuid}`, body: _HTML }).send()
const nodemailer = require('nodemailer');

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MailService {

    // Транспортер
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    //Отправка сообщения с кодом на почту 
    async sendCode(to) {
        let randomNumbersString = '';
        for (let i = 0; i < 5; i++) {
            const randomNumber = getRandomNumber(0, 9);
            randomNumbersString += randomNumber.toString();
        }

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Восставновление доступа на ' + process.env.API_URL,// Тема письма
            text: '',
            html:
                `
                    <div>
                        <h1>Для восстановления доступа к аккаунту введите код ниже:</h1>
                        <h3>${randomNumbersString}</h3>
                    </div>
                `
        })
        return randomNumbersString;
    }
}

module.exports = new MailService();
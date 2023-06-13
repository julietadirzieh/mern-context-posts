import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config.js";

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {

        const transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com', {
            service: 'Gmail',
            auth: {
                user: EMAIL_CONFIG.user,
                pass: EMAIL_CONFIG.password,
            },
        });

        const mailOptions = {
            from: EMAIL_CONFIG.user,
            to: email,
            subject: "Restablecimiento de contraseña",
            text: "Plaintext version of the message",
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}</p>`
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error);
    }
};


import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config.js";

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_CONFIG.user,
                pass: EMAIL_CONFIG.password,
            },
        });

        const mailOptions = {
            from: EMAIL_CONFIG.user,
            to: email,
            subject: "Password Reset",
            text: "Plaintext version of the message",
            html: `<p>Click on the following link to reset your password: ${resetLink}</p><p>* The link will be valid for one (1) hour.</p>`
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error);
    }
};


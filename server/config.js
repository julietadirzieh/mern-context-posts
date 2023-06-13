import dotenv from "dotenv";

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI
export const PORT = process.env.PORT || 3000

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export const JWT_SECRET = process.env.JWT_SECRET

export const EMAIL_JS_CONFIG = {
    serviceId: process.env.EMAIL_SERVICE_ID,
    templateId: process.env.EMAIL_TEMPLATE_ID,
    userId: process.env.EMAIL_USER_ID,
};

export const EMAIL_CONFIG = {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD
}
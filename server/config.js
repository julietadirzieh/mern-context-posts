import dotenv from "dotenv";

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI
export const PORT = process.env.PORT || 3000

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export const JWT_SECRET = process.env.JWT_SECRET
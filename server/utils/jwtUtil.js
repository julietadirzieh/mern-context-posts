import jwt from 'jsonwebtoken';

import {
    JWT_SECRET
} from "../config.js";

export const signJwt = (user) => {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    });
    return token;
};

const jwtUtil = {
    signJwt,
};

export default jwtUtil;

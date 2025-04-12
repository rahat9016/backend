import jwt from 'jsonwebtoken';
import config from '../../config';


export const generateAccessToken = (
  userId: string,
  email: string,
  role: string
) => {
  return jwt.sign({ userId, email, role }, config.jwt.secret, {
    expiresIn: config.jwt.expires,
  });
};

// Generate Refresh Token
export const generateRefreshToken = (
  userId: string,
  email: string,
  role: string
) => {
  return jwt.sign({ userId, email, role }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpires,
  });
};

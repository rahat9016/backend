/* eslint-disable no-unused-vars */

import bcrypt from 'bcrypt';
import { IAuth, PaginationUser } from './auth.interface';
import { Auth } from './auth.model';
import { generateAccessToken, generateRefreshToken } from '../../util/jwt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from '../../../config';
const createUser = async (payload: IAuth): Promise<IAuth | null> => {
  const result = await Auth.create(payload);
  return result;
};

const signingUser = async (email: string, pass: string) => {
  const user = await Auth.findOne({ email: email });
  if (!user) throw new Error('Email not found or invalid email.');
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken(
    user._id.toString(),
    user.email,
    user.role
  );
  const refreshToken = generateRefreshToken(
    user._id.toString(),
    user.email,
    user.role
  );
  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: userWithoutPassword,
  };
};

const refreshTokens = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret) as any;

    const user = await Auth.findById(decoded.userId);
    if (!user) throw new Error('User not found');

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.email,
      user.role
    );
    return {
      accessToken: accessToken,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
      throw new Error('Refresh token has expired. Please sign in again.');
    } else {
      throw new Error('Invalid refresh token.');
    }
  }
};
const getAllUser = async (
  skip: number,
  limit: number
): Promise<PaginationUser | null> => {
  const result = await Auth.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 })
    .select(
      '_id fullName email profile description contact address role active'
    );
  const total = await Auth.countDocuments();
  return { data: result, total };
};

const getUserById = async (id: string) => {
  const result = await Auth.findById(id).select(
    '_id fullName email profile description contact address role active'
  );
  return result;
};

export const AuthService = {
  createUser,
  signingUser,
  refreshTokens,
  getAllUser,
  getUserById,
};

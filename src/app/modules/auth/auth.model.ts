import { Schema, model } from 'mongoose';
import { IAuth, IAuthModel } from './auth.interface';
import bcrypt from 'bcrypt';

const AuthSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    description: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

AuthSchema.pre('save', async function (this: IAuth, next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Method for comparing password
  AuthSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  };

export const Auth = model<IAuth, IAuthModel>('Auth', AuthSchema);

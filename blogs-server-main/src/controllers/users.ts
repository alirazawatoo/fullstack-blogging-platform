import { Request, Response } from 'express';
import { userAuthSchema, userRegistrationSchema } from '../validationSchemas/userSchema';
import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper';
import { compareData, encryptData } from '../helpers/encryptionHelpers';
import jwt from 'jsonwebtoken';
import RESPONSE_CODES from '../constants/responseCodes';

// Initializing Prisma client
const prisma = new PrismaClient();

// Function to handle user signup
export const handleSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validating user registration schema
  await userRegistrationSchema.validate(req.body);

  // Checking if user already exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return sendResponse(res, null, 'User already exists', RESPONSE_CODES.conflictError);
  }

  // Encrypting password and creating new user
  const encryptedPassword = encryptData(password);
  await prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword,
    },
  });
  return sendResponse(res);
};

// Function to handle user login
export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validating user authentication schema
  await userAuthSchema.validate(req.body);

  // Finding user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    // Comparing passwords
    const isAuth = compareData(password, user.password);
    const jwtKey = process.env.JWT_KEY || 'jwtsecret';
    if (isAuth) {
      // Generating JWT token
      const token = jwt.sign({ user: user.id }, jwtKey);
      return sendResponse(res, { authtoken: token });
    }
  }
  return sendResponse(res, null, 'Invalid email/password', RESPONSE_CODES.authorizationError);
};

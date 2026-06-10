import { PrismaClient } from '@prisma/client';
import { compareData } from './encryptionHelpers';
import jwt from 'jsonwebtoken';

// Initializing Prisma client
const prisma = new PrismaClient();

// Function to generate authentication token
export const generateAuthToken = async (email: string, password: string) => {
  let token = '';
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
      token = jwt.sign({ user: user.id }, jwtKey);
    }
  }
  return token;
};

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

// === REST middleware (keep this if you're still using Express routes) ===
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401);
  }
};

// === GraphQL context middleware (this is what Apollo Server expects) ===
export const authMiddleware = ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return { req };
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return { req, user: decoded };
  } catch (err) {
    console.log('Invalid token:', err);
    return { req };
  }
};

// === JWT signer (used for login/signup mutations) ===
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

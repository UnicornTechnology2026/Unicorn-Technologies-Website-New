import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db, Admin } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'unicorn-technologies-secret-key-2026';

export interface AuthenticatedRequest extends Request {
  admin?: Admin;
}

export function generateToken(admin: Admin): string {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const admin = db.getAdminById(decoded.id);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

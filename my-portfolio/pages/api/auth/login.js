import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import dbConnect from '../../../lib/dbConnect';
import Admin from '../../../models/Admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  await dbConnect();
  
  const { username, password } = req.body;

  try {
    // 1. Find the user in the database
    const adminUser = await Admin.findOne({ username });
    if (!adminUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Compare the provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // --- If credentials are valid, create tokens and cookies (same as before) ---
    
    const accessToken = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: adminUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    
    const accessTokenCookie = serialize('accessToken', accessToken, {
      httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge: 60 * 15, path: '/',
    });
    const refreshTokenCookie = serialize('refreshToken', refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, path: '/',
    });
    const statusCookie = serialize('isLoggedIn', 'true', {
      secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, path: '/',
    });
    
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie, statusCookie]);
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred' });
  }
}
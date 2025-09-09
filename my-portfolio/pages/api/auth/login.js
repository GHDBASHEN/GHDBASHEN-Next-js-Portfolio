import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const isCredentialsValid = username === adminUsername && (await bcrypt.compare(password, adminPasswordHash));

  if (!isCredentialsValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ username: adminUsername }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ username: adminUsername }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  const accessTokenCookie = serialize('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 15,
    path: '/',
  });

  const refreshTokenCookie = serialize('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  // --- NEW: Public cookie for UI purposes ---
  const statusCookie = serialize('isLoggedIn', 'true', {
    // httpOnly is false, so the browser can read it
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // Match refresh token duration
    path: '/',
  });

  // Add the new cookie to the headers array
  res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie, statusCookie]);
  res.status(200).json({ message: 'Login successful' });
}
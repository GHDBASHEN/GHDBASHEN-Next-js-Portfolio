import { serialize } from 'cookie';

export default function handler(req, res) {
  // Expire the secure cookies
  const accessTokenCookie = serialize('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  const refreshTokenCookie = serialize('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });
  
  // --- NEW: Expire the public UI cookie ---
  const statusCookie = serialize('isLoggedIn', '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie, statusCookie]);
  res.status(200).json({ message: 'Logout successful' });
}
import cookie from 'cookie';
import { NextApiResponse } from 'next';

const setCookieToken = (token: string, res: NextApiResponse) => {
  const MAX_AGE = 7 * 24 * 60 * 60;

  const setCookie = cookie.serialize('token', token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  });

  res.setHeader('Set-Cookie', setCookie);
};

const cookieHandler = { setCookieToken };

export default cookieHandler;

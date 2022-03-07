import { isEmail } from './../../helpers/validation';
import type { NextApiRequest, NextApiResponse } from 'next';
import magicServer from '../../lib/magic-api-server';
import jwt from 'jsonwebtoken';
import hasuraApi from '../../lib/db/hasura';
import cookieHandler from '../../lib/cookie-handle';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('handle--------------------');
  console.log('--------------------');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Invalid method type' });
  }

  try {
    const { authorization } = req.headers;

    let token: string | undefined;

    const email = req.body.email;

    if (authorization) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      throw new Error('No token provided');
    }

    if (!email) {
      throw new Error('No email provided');
    }

    const { issuer, publicAddress } = await magicServer.getUserDataBytoken(
      token,
    );

    const isuedate = Date.now() / 1000;

    if (!process.env.JWT_SECRET) {
      throw new Error('no secret');
    }

    // create token
    const hasuratoken = jwt.sign(
      {
        iat: isuedate,
        exp: isuedate + 604800,
        issuer,
        publicAddress,
        email,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user', 'admin'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': `${issuer}`,
        },
      },
      process.env.JWT_SECRET,
    );

    const queryOperation = `
  query MyQuery {
    users(where: {issuer: {_eq: "${issuer}"}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;

    const mutationOperation = `
  mutation MyMutation {
    insert_users_one(object: {email: "${email}", issuer: "${issuer}", publicAddress: "${publicAddress}"}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;

    const { data, errors } = await hasuraApi.foo(
      queryOperation,
      'MyQuery',
      {},
      hasuratoken,
    );

    if (errors && errors.length > 0) {
      console.error(errors);
      throw new Error('hasura failure');
    }

    if (data && data.users.length === 0) {
      const result = await hasuraApi.foo(
        mutationOperation,
        'MyMutation',
        {},
        hasuratoken,
      );
      console.log('result---', result);
      cookieHandler.setCookieToken(hasuratoken, res);
    } else {
      cookieHandler.setCookieToken(hasuratoken, res);
      console.log('user exists');
    }

    res.status(200).json({ message: 'done' });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
        ? `Failed to login -- ${error.message}`
        : 'Failed to login',
    });
  }
};

export default handle;

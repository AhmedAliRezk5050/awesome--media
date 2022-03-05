import type { NextApiRequest, NextApiResponse } from 'next';

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Invalid method type' });
  }

  try {
    res.status(200).json({ message: 'done' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to login' });
  }
};

export default handle;

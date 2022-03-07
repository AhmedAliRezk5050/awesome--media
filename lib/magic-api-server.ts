import { Magic } from '@magic-sdk/admin';

const getUserDataBytoken = async (DIDToken: string) => {
  const mAdmin = new Magic(process.env.MAGIC_LINK_SECRET_API_KEY);
  const issuer = mAdmin.token.getIssuer(DIDToken);
  const publicAddress = mAdmin.token.getPublicAddress(DIDToken);
  return { issuer, publicAddress };
};

const magicServer = { getUserDataBytoken };

export default magicServer;

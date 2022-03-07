import { Magic } from 'magic-sdk';

const initMagic = async () => {
  const magic = new Magic(
    process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLISHABLE_API_KEY as string,
  );

  await magic.preload();

  return magic;
};

export const login = async (email: string) => {
  const magic = await initMagic();
  return magic.auth.loginWithMagicLink({ email });
};

export const isLoggedIn = async () => {
  const magic = await initMagic();
  return await magic.user.isLoggedIn();
};

export const logout = async () => {
  const magic = await initMagic();
  return await magic.user.logout();
};

export const getUserData = async () => {
  const magic = await initMagic();
  const { email } = await magic.user.getMetadata();
  return email;
};

import { FC } from 'react';
import NavBar from '../NavBar/NavBar';

interface RouteGuardProps {
  children?: React.ReactNode;
}

const Layout: FC<RouteGuardProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;

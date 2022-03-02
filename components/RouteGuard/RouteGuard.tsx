import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';

interface RouteGuardProps {
  children?: React.ReactNode;
}

const RouteGuard: FC<RouteGuardProps> = ({ children }) => {
  const { loading, userEmail } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(loading, userEmail);

    if (!loading && !userEmail) {
      router.push('/login');
    }
  }, [loading, userEmail, router]);

  if (loading) {
    return <Spinner />;
  }
  return <>{children}</>;
};

export default RouteGuard;

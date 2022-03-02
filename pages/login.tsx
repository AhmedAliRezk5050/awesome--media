import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { isEmail } from '../helpers/validation';
import { login } from '../lib/magic-api';
import cls from 'classnames';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState({ error: false, message: '' });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router.events]);

  const handleSignIn = async () => {
    setLoading(true);

    const email = emailRef.current?.value;

    if (email && isEmail(email)) {
      try {
        setEmailError({ error: false, message: '' });

        const result = await login(email);

        // setLoading(false);

        console.log(result);

        if (!result) {
          throw new Error('Failed to login');
        }

        router.push('/', undefined, { shallow: true });
      } catch (error: any) {
        setLoading(false);

        setEmailError({
          error: false,
          message: error?.message || 'Failed to login',
        });
      }
    } else {
      setEmailError({ error: true, message: 'Invalid email address' });
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Media - Sign In</title>
        <meta name='description' content='Awesome Media sign in page' />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href='/'>
            <a className={styles.logoLink} href=''>
              <div className={styles.logoWrapper}>
                <Image
                  src='/icons/netflix.svg'
                  alt='Netflix logo'
                  width={120}
                  height={40}
                />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type='email'
            placeholder='Email Address'
            className={styles.emailInput}
            ref={emailRef}
          />
          {emailError.error && (
            <p className={styles.userMsg}>{emailError.message}</p>
          )}
          <button
            className={cls(
              styles.loginBtn,
              loading && styles['loginBtn--disabled'],
            )}
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? 'Signing in ....' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

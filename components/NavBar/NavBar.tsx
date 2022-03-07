import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useReducer, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { getUserData, logout } from '../../lib/magic-api-client';
import Spinner from '../Spinner/Spinner';
import styles from './NavBar.module.css';

// interface NavBarProps {
//   userEmail
// }

const NavBar = () => {
  const router = useRouter();

  const { loading, userEmail } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignout = async () => {
    try {
      const logoutSuccess = await logout();
      if (logoutSuccess) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderNavAuth = () => {
    return (
      <nav className={styles.navContainer}>
        <div>
          <button
            className={styles.usernameBtn}
            onClick={() => setShowDropdown((prevState) => !prevState)}
          >
            {userEmail ? (
              <p className={styles.username}>{userEmail}</p>
            ) : (
              <Link href='/login'>
                <a>login</a>
              </Link>
            )}
            <Image
              src={'/icons/expand_more.svg'}
              alt='Expand dropdown'
              width={24}
              height={24}
            />
          </button>

          {userEmail && showDropdown && (
            <button className={styles.navDropdown} onClick={handleSignout}>
              Sign out
            </button>
          )}
        </div>
      </nav>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem2}>
            <Link href='/'>
              <a>Option</a>
            </Link>
          </li>
        </ul>
        {renderNavAuth()}
      </div>
    </div>
  );
};

export default NavBar;

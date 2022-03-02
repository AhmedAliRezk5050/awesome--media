import { motion } from 'framer-motion';
import cls from 'classnames';
import Image from 'next/image';
import { FC, useState } from 'react';
import styles from './Card.module.css';
import { ImgSize } from '../types';
import Link from 'next/link';

interface CardProps {
  imgSize: ImgSize;
  imgUrl: string;
  elemNum?: number;
  id: string;
}

type ImgWrapperStyles = {
  small: string;
  medium: string;
  large: string;
};

const Card: FC<CardProps> = ({ imgSize, imgUrl, elemNum, id }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const imgWrapperStyles: ImgWrapperStyles = {
    small: styles.smItem,
    medium: styles.mdItem,
    large: styles.lgItem,
  };
  const scale = elemNum === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  const handleImgError = () =>
    setImgSrc(
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    );

  return (
    <Link href={`/video/${id}`}>
      <a className={styles.container}>
        <motion.div
          className={cls(imgWrapperStyles[imgSize], styles.imgMotionWrapper)}
          whileHover={{ ...scale }}
        >
          <Image
            src={imgSrc}
            alt=''
            layout='fill'
            className={styles.cardImg}
            onError={handleImgError}
          />
        </motion.div>
      </a>
    </Link>
  );
};

export default Card;

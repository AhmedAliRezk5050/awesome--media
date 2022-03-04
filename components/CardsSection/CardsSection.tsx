import { FC, useEffect, useRef, WheelEvent } from 'react';
import cls from 'classnames';
import styles from './CardsSection.module.css';
import Card from '../Card/Card';
import Image from 'next/image';
import { ImgSize, VideoMinimized } from '../types';

interface CardsSectionProps {
  title: string;
  videos: VideoMinimized[];
  imgSize: ImgSize;
}

type HorizontalScollDirection = 'right' | 'left';

const CardsSection: FC<CardsSectionProps> = ({ title, videos, imgSize }) => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // const id = setInterval(() => {
    //   horizontalScrollHandler(undefined, 'left');
    // }, 2000);
    // return () => {
    //   clearInterval(id);
    // };
  }, []);
  const horizontalScrollHandler = (
    e?: WheelEvent<HTMLDivElement>,
    direction?: HorizontalScollDirection,
  ) => {
    if (!cardsContainerRef.current) {
      return;
    }

    let scollAmount = 100;

    if (e) {
      scollAmount = e.deltaY;
    } else if (direction && direction == 'right') {
      scollAmount = -100;
    }

    const containerScrollPosition = cardsContainerRef.current.scrollLeft;

    cardsContainerRef.current.scrollTo({
      top: 0,
      left: containerScrollPosition + scollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.container}>
      <div
        className={cls(
          styles.containerArrow__arrow,
          styles['containerArrow__arrow--right'],
        )}
        onClick={() => horizontalScrollHandler(undefined, 'left')}
      >
        <Image
          src='/icons/arrow_forward.svg'
          alt='arrow forward'
          width={20}
          height={20}
        />
      </div>
      <div
        className={cls(
          styles.containerArrow__arrow,
          styles['containerArrow__arrow--left'],
        )}
        onClick={() => horizontalScrollHandler(undefined, 'right')}
      >
        <Image
          src='/icons/arrow_back.svg'
          alt='arrow forward'
          width={20}
          height={20}
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={styles.cardWrapper}
        onWheel={(e) => horizontalScrollHandler(e)}
        ref={cardsContainerRef}
        onMouseEnter={() => console.log('onMouseEnter')}
        onMouseLeave={() => console.log('onMouseLeave')}
      >
        {videos.map(({ id, imgUrl, title }, index) => (
          <Card
            imgSize={imgSize}
            imgUrl={imgUrl}
            elemNum={index}
            key={id}
            id={id}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsSection;

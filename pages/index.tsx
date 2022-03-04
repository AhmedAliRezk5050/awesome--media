import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner/Banner';
import Card from '../components/Card/Card';
import CardsSection from '../components/CardsSection/CardsSection';
import NavBar from '../components/NavBar/NavBar';
import { VideoMinimized } from '../components/types';
import styles from '../styles/Home.module.css';
import { getVideos } from '../lib/youtube-api';
import Spinner from '../components/Spinner/Spinner';

interface HomeProps {
  disneyVideos: VideoMinimized[];
  travelVideos: VideoMinimized[];
  productivityVideos: VideoMinimized[];
}

const Home: NextPage<HomeProps> = ({
  disneyVideos,
  travelVideos,
  productivityVideos,
}) => {
  return (
    <div>
      <Head>
        <title>Awesome Media</title>
        <meta name='description' content='Awesome Media Home Page' />
      </Head>
      <div className={styles.main}>
        <Banner
          videoId='4zH5iYM4wJo'
          title='title'
          subTitle='subTitle'
          imgUrl='/images/clifford.webp'
        />

        <div className={styles.sectionWrapper}>
          <CardsSection title='Disney' videos={disneyVideos} imgSize='large' />
          {/* <CardsSection title='Travel' videos={travelVideos} imgSize='medium' />
          <CardsSection
            title='Travel'
            videos={productivityVideos}
            imgSize='medium'
          /> */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const disneyVideos: VideoMinimized[] = [];
  const travelVideos: VideoMinimized[] = [];
  const productivityVideos: VideoMinimized[] = [];

  try {
    const fetchedDisneyVideos = await getVideos('disney trailer');
    // const fetchedTravelVideos = await getVideos('travel');
    // const fetchedTravelVideos = await getVideos('travel');

    disneyVideos.push(...fetchedDisneyVideos);
    // travelVideos.push(...fetchedTravelVideos);
    // productivityVideos.push(...fetchedProductivityVideos);
  } catch (error) {
    console.log(error);
  }

  return {
    props: { disneyVideos, travelVideos, productivityVideos },
  };
};

export default Home;

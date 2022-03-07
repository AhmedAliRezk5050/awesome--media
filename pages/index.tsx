import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import CardsSection from '../components/CardsSection/CardsSection';
import { VideoMinimized } from '../components/types';
import styles from '../styles/Home.module.css';
import { getVideos } from '../lib/youtube-api';
import { useEffect } from 'react';
import hasuraApi from '../lib/db/hasura';

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

  const operation = `
  query MyQuery {
    users(where: {issuer: {_eq: "gdgfdg"}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;

  try {
    const { data, errors } = await hasuraApi.foo(
      operation,
      'MyQuery',
      {},
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY1NDg1MzEuNDIyLCJleHAiOjE2NDcxNTMzMzEuNDIyLCJpc3N1ZXIiOiJkaWQ6ZXRocjoweDU1YTA0YUI1MEU3YTlhZTEzMjE2ZjAyODQ2ZUQ2Y0IyMDkwN0IxOWMiLCJwdWJsaWNBZGRyZXNzIjoiMHg1NWEwNGFCNTBFN2E5YWUxMzIxNmYwMjg0NmVENmNCMjA5MDdCMTljIiwiZW1haWwiOiJhaG1lZGFsaXJlems1MDUwQGdtYWlsLmNvbSIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiInZGlkOmV0aHI6MHg1NWEwNGFCNTBFN2E5YWUxMzIxNmYwMjg0NmVENmNCMjA5MDdCMTljIn19.X2AeOn2xAU7Hwg6pRHE8Oxb2VQnBnE2myuprnXLaYI0',
    );
    if (errors) {
      console.error(errors);
    }
    console.log(data);
  } catch (error) {
    console.error(error);
  }

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

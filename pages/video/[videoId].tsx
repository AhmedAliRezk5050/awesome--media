import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import cls from 'classnames';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';
import { Video } from '../../components/types';
import { getVideo } from '../../lib/youtube-api';
import { ParsedUrlQuery } from 'querystring';

Modal.setAppElement('#__next');

interface VideoPageProps {
  video: Video;
}

const VideoPage: NextPage<VideoPageProps> = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;
  console.log(videoId);

  const { title, publishTime, description, channelTitle, viewCount } = video;
  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id='ytplayer'
          // type=''
          width='640'
          height='360'
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameBorder='0'
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.discription}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const videoId = context.params?.videoId as string;

  let video;

  try {
    video = await getVideo(videoId);
    console.log('video', video);

    if (!video) {
      return {
        notFound: true,
      };
    }

    return {
      props: { video },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  const videosIds = ['4zH5iYM4wJo', 'S-1QgOMQ-ls', 'yE-f1alkq9I'];

  return {
    paths: videosIds.map((videoId) => ({ params: { videoId } })),
    fallback: 'blocking',
  };
};

// 4zH5iYM4wJo

export default VideoPage;

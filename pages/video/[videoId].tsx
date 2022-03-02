import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

Modal.setAppElement('#__next');

const VideoPage: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  console.log(videoId);

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
      </Modal>
    </div>
  );
};

export default VideoPage;

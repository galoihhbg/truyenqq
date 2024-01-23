import styles from './Chapter.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faHouseChimney, faList } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../components/Button'
import { Wrapper as ChapterList } from '../../components/Popper';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VolumeItem from './VolumeItem';

const cx = classNames.bind(styles);
function Chapter() {
    const [showModal, setShowModal] = useState(false);
    const [chapterImages, setChapterImages] = useState([])
    const [loadingImage, setLoadingImage] = useState(true)
    const [chapterData, setChapterData] = useState({})
    const [mangaData, setMangaData] = useState({})
    const [loadingChapter, setLoadingChapter] = useState(true);
    const [feeds, setFeeds] = useState({})
    const {id} = useParams()
    const handleModal = () => {
        setShowModal(!showModal);
      };

    const imageUrl = 'https://uploads.mangadex.org/data'
    const baseUrl = 'https://api.mangadex.org'

    useEffect(() => {
        setLoadingImage(Object.keys(chapterImages).length===0)
    },[chapterImages])

    useEffect(() => {
        setLoadingChapter(Object.keys(chapterData).length===0)
    },[chapterData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contentData = await axios.get(`https://api.mangadex.org/at-home/server/${id}`, {
                    params: {
                        forcePort443 : false
                    },
                });

                setChapterImages(contentData.data.chapter)

                const chapterData = await axios.get(`${baseUrl}/chapter/${id}`, {
                    params: {
                        'includes[]' : 'manga'
                    }
                })
                const manga = chapterData.data.data.relationships.find((relationship) => {
                    return relationship.type === "manga";
                  });
                setMangaData(manga)
                setChapterData(chapterData.data.data)

                const feedsData = await axios.get(`${baseUrl}/manga/${manga.id}/aggregate?`, {
                    params: {
                        'translatedLanguage[]': 'en'
                    }
                })
                setFeeds(feedsData.data.volumes)
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
        // eslint-disable-next-line
    }, [id]);  

    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h2 className={cx("header-item")}>{loadingChapter ? 'loading' : `${mangaData.attributes.title.en} - Chương ${chapterData.attributes.chapter}`}</h2>
                {/* <h4 className={cx("header-item")}>Chương 1</h4> */}
                {/* <h4 className={cx("header-item")}>Số trang: 1 - Lần cuối: 10 tháng</h4> */}
            </header>
            <div className={cx('content')}>
                {
                    loadingImage ? 'loading':
                    chapterImages.data.map(image => {
                        return <img key={image} className={cx('image')} src={`${imageUrl}/${chapterImages.hash}/${image}`} alt='A manga page' />
                    })
                }
            </div>

            <section className={cx('side-nav')}>
                <Button noMargin classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faBackward}/></Button>
                <Button noMargin onClick={handleModal} classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faList}/></Button>
                <Button to={loadingChapter ? false : `/manga/${mangaData.id}`} noMargin classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faHouseChimney}/></Button>
                <Button noMargin classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faForward}/></Button>
            </section>

            <div className={cx('comment')}>
                <span className={cx('title')}>Bình luận</span>
            </div>

            <Modal size='xl' show={showModal} onHide={handleModal}>
                <Modal.Body>
                    <div className={cx('modal-chapter-list')}>
                        <span className={cx('modal-title')}>Mục Lục</span>
                        <div className={cx('modal-container')}>
                            <ChapterList>
                                {Object.keys(feeds).length!==0 && Object.values(feeds).map((volume, index) => {
                                        return <VolumeItem key={index} data={volume} />
                                    })
                                }
                            </ChapterList>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
     );
}

export default Chapter;
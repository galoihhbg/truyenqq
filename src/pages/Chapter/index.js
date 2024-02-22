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
import Loading from '../../components/Loading'

const cx = classNames.bind(styles);
function Chapter() {
    const [tableOfConentVisibility, setTableOfConentVisibility] = useState(false);
    const [chapterImages, setChapterImages] = useState([])
    const [loadingImage, setLoadingImage] = useState(true)
    const [chapterData, setChapterData] = useState({})
    const [mangaData, setMangaData] = useState({})
    const [loadingChapter, setLoadingChapter] = useState(true);
    const [feeds, setFeeds] = useState([])
    const [prev, setPrev] = useState()
    const [next, setNext] = useState()
    const [sideNav, setSideNav] = useState(true)
    const {id} = useParams()
    const showTableOfContent = () => {
        setTableOfConentVisibility(true)
      };
    const hideTableOfContent = () => {
        setTableOfConentVisibility(false)
    }

      const handleSideNav = (e) => {
        e.preventDefault();
        if (window.innerWidth < 992) {
            setSideNav(!sideNav);
        }
    }

    const imageUrl = 'https://uploads.mangadex.org/data'
    const baseUrl = 'https://api.mangadex.org'

    useEffect(() => {
        setLoadingImage(Object.keys(chapterImages).length===0)
    },[chapterImages])

    useEffect(() => {
        setLoadingChapter(Object.keys(chapterData).length===0)
    },[chapterData])

    const updateContentHeight = () => {
        setSideNav(!(window.innerWidth < 992))
    }

    useEffect(() => {
        updateContentHeight();
    
        window.addEventListener('resize', updateContentHeight);
    
        return () => {
            window.removeEventListener('resize', updateContentHeight);
        }
    }, []);

    useEffect(() => {
        const findNextAndPrev = (chapterList) => {
                //Find the previous and the next chapter
                const index = chapterList.findIndex((chapter) => {return chapter.id === id})

                if (chapterList.length === 1) {
                    setPrev(false)
                    setNext(false)
                }

                if (index === 0 ) {
                    setPrev(false)
                    setNext(chapterList[index+1])
                    return null
                }

                if (index === chapterList.length - 1) {
                    setNext(false)
                    setPrev(chapterList[index-1])
                    return null
                }

                setPrev(chapterList[index-1])
                setNext(chapterList[index+1])
        }
        const fetchData = async () => {
            try {
                const contentData = await axios.get(`https://api.mangadex.org/at-home/server/${id}`, {
                    params: {
                        forcePort443 : false
                    },
                });

                setChapterImages(contentData.data.chapter)

                //console.log(`${imageUrl}/${contentData.data.chapter.hash}/${contentData.data.chapter.data[0]}`)

                // The map function returns an array that contains promises(not data), so Promise.all is used to wait for all images to be fetched.
                // const imgSrcs = await Promise.all(contentData.data.chapter.data.map(async (img) => {
                //     try {
                //         const response = await axios.get(`${imageUrl}/${contentData.data.chapter.hash}/${img}`, { responseType: 'arraybuffer' });
                //         const blob = new Blob([response.data], { type: response.headers['Image'] });
                //         const image = URL.createObjectURL(blob);
                //         return image;
                //     } catch (error) {
                //         console.error('Error fetching image:', error);
                //         return null; // or handle the error as needed
                //     }
                // }));


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
                let chapterList = []
                for (var volume in feedsData.data.volumes) {
                    for (var chapter in feedsData.data.volumes[volume].chapters) {
                        chapterList.push(feedsData.data.volumes[volume].chapters[chapter])
                    }
                }
                chapterList = chapterList.sort((a,b) => {return parseFloat(a.chapter) - parseFloat(b.chapter)})
                findNextAndPrev(chapterList)
                setFeeds(chapterList)
            } catch (error) {
                console.log(error);
            }
        };
        //hideTableOfContent()
        fetchData();
        // eslint-disable-next-line
    }, [id]);  

    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                {
                    loadingChapter ? <Loading /> : 
                        <>
                            <span className={cx("title")}>{`${mangaData.attributes.title.en}`}</span>
                            <span className={cx("chapter")}>{`Chương ${chapterData.attributes.chapter}`}</span>
                            <span className={cx("status")}>Số trang: 1 - Lần cuối: 10 tháng</span>
                        </>
                }
            </header>
            <div  onClick={(e) => handleSideNav(e)} className={cx('content')}>
                {
                    loadingImage ? <Loading fullHeight />:
                    chapterImages.data.map(image => {
                        return <img key={image} className={cx('image')} src={`${imageUrl}/${chapterImages.hash}/${image}`} alt='A manga page' />
                    })
                }
            </div>

            <section className={sideNav ? cx('side-nav') : cx('side-nav', 'none')}>
                <Button disabled={!prev} to={prev ? `/chapter/${prev.id}`: undefined} noMargin classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faBackward}/></Button>
                <Button noMargin onClick={showTableOfContent} classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faList}/></Button>
                <Button to={loadingChapter ? false : `/manga/${mangaData.id}`} noMargin classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faHouseChimney}/></Button>
                <Button disabled={!next} to={next ? `/chapter/${next.id}`: undefined} noMargin classnames={'chapter-side-nav-item'}><FontAwesomeIcon icon={faForward}/></Button>
            </section>

            <section className={cx('comment')}>
                <div className={cx('container')}>
                    <header>Bình luận</header>
                    <main>
                        
                    </main>
                </div>
            </section>

            <Modal size='xl' show={tableOfConentVisibility} onHide={setTableOfConentVisibility}>
                <Modal.Body>
                    <div className={cx('modal-chapter-list')}>
                        <span className={cx('modal-title')}>Mục Lục</span>
                        <div className={cx('modal-container')}>
                            <ChapterList>
                                {feeds.length !==0 ? feeds.map((chapter, index) => {
                                        return <VolumeItem key={index} chapter={chapter} handleClick={hideTableOfContent} />
                                    }) : 'loading'
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
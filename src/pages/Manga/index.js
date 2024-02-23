import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './Manga.module.scss';
import ComicDetail from "./components/ComicDetail";
import ToggleWrapper from "../../components/ToggleWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import {Wrapper as ChapterList} from '../../components/Popper';
import Loading from "../../components/Loading";
import ChapterItem from "../../components/ChapterItem";
import axios from "axios";

import config from "../../config";

import { useEffect, useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const token = cookies.get('TOKEN')
const userData = cookies.get('USER-DATA')

const cx = classNames.bind(styles)

function Manga() {
    // eslint-disable-next-line
    let { id } = useParams();
    let baseUrl = 'https://api.mangadex.org';

    const [manga, setManga] = useState({})

    const [feeds, setFeeds] = useState([])

    const [loading, setLoading] = useState(true);

    const [bm_id, setBmID] = useState(false);

    const [checked, setChecked] = useState(false);
    const order = {
        chapter: 'desc',
        readableAt: 'desc'
    };

    const finalOrderQuery = {};

    // { "order[rating]": "desc", "order[followedCount]": "desc" }
    for (const [key, value] of Object.entries(order)) {
        finalOrderQuery[`order[${key}]`] = value;
    }

    const language = ['en'];
    useEffect(() => {
        setLoading(Object.keys(manga).length===0 || feeds.length ===0 || !checked)
    }, [manga, feeds, checked])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mangaResponse = await axios.get(`${baseUrl}/manga`, {
                    params: {
                        'ids[]' : id,
                        'includes[]': ['cover_art', 'author', 'artist'],
                        limit: 1
                    },
                    headers: {
                        ...config.headers
                    }
                });
    
                const mangaData = mangaResponse.data.data[0];
                setManga(mangaData);
                const mangaFeed = await axios.get(`${baseUrl}/manga/${id}/feed`, {
                    params: {
                        limit: 100,
                        translatedLanguage : language,
                        ...finalOrderQuery
                    }, 
                    headers: {
                        ...config.headers
                    }
                });

                let filteredChapters = [];
                let chapterNumbers = [];

                mangaFeed.data.data.forEach(chapter => {
                let chapterNumber = chapter.attributes.chapter;
                if (!chapterNumbers.includes(chapterNumber)) {
                    chapterNumbers.push(chapterNumber);
                    filteredChapters.push(chapter);
                }
                });

                setFeeds(filteredChapters)
            } catch (error) {
                console.log(error);
            }
        };

        //Check the manga was bookmarked yet
        const check = async () => {
            if (token) {
                const res = await axios.post('https://api-truyenqq-ciciii.onrender.com/action/bookmark/check', {
                    user_id: userData.userID,
                    manga_id: id,
                }, {
                    headers: {"Authorization" : `Bearer ${token}`},
                })
                setChecked(true)
                if (res.data.bm_id) {
                    setBmID(res.data.bm_id)
                } else {
                    setBmID(false)
                }
            }
        }
    
        fetchData();
        check()
        // eslint-disable-next-line
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}> 
                {loading ? <Loading /> :<ComicDetail bm_id={bm_id} firstChapter={feeds[feeds.length-1]} data={manga} />}
            </div>
            
            <div className={cx('description')}>
                <p className={cx('title')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faInfoCircle} />
                    <span>Giới thiệu</span>
                </p>
                {
                    loading ? <Loading /> :
                    <ToggleWrapper>
                        <p>
                            {manga.attributes.description.en}
                        </p>
                    </ToggleWrapper>
                }
            </div>
            
            <div className={cx('chapter-list')}>
                <p className={cx('title')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faDatabase} />
                    <span>Danh sách chương</span>
                </p>
                <div className={cx('container')}>
                    {
                        loading ? <Loading /> :
                        <ChapterList>
                            {
                                 feeds.map(chapter => {
                                    return <ChapterItem key={chapter.id} data={chapter}></ChapterItem>
                                 })
                                 
                            }
                        </ChapterList>
                    }
                </div>
            </div>
            <div className={cx('comments')}>

            </div>
        </div>
    )
  }
  

export default Manga;
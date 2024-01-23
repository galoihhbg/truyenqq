import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './Manga.module.scss';
import ComicDetail from "./components/ComicDetail";
import ToggleWrapper from "../../components/ToggleWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import {Wrapper as ChapterList} from '../../components/Popper';
import ChapterItem from "../../components/ChapterItem";
import axios from "axios";

import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Manga() {
    // eslint-disable-next-line
    let { id } = useParams();
    let baseUrl = 'https://api.mangadex.org';

    const [manga, setManga] = useState({})

    const [feeds, setFeeds] = useState([])

    const [loading, setLoading] = useState(true);
    const order = {
        chapter: 'desc',
        readableAt: 'desc'
    };

    const finalOrderQuery = {};

    // { "order[rating]": "desc", "order[followedCount]": "desc" }
    for (const [key, value] of Object.entries(order)) {
        finalOrderQuery[`order[${key}]`] = value;
    }
    ;

    const language = ['en'];
    useEffect(() => {
        setLoading(Object.keys(manga).length===0)
    }, [manga])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mangaResponse = await axios.get(`${baseUrl}/manga`, {
                    params: {
                        'ids[]' : id,
                        'includes[]': ['cover_art', 'author', 'artist'],
                        limit: 1
                    },
                });
    
                const mangaData = mangaResponse.data.data[0];
                setManga(mangaData);
                const mangaFeed = await axios.get(`${baseUrl}/manga/${id}/feed`, {
                    params: {
                        limit: 100,
                        translatedLanguage : language,
                        ...finalOrderQuery
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
    
        fetchData();
        // eslint-disable-next-line
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}> 
                {loading ? 'Loading' :<ComicDetail data={manga} />}
            </div>
            
            <div className={cx('description')}>
                <p className={cx('title')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faInfoCircle} />
                    <span>Giới thiệu</span>
                </p>
                {
                    loading ? 'Loading' :
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
                        <ChapterList>
                            {
                                 feeds.map(chapter => {
                                    return <ChapterItem key={chapter.id} data={chapter}></ChapterItem>
                                 })
                                 
                            }
                        </ChapterList>
                </div>
            </div>
            <div className={cx('comments')}>

            </div>
        </div>
    )
  }
  

export default Manga;
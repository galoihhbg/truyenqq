import styles from './ComicList.module.scss';
import classNames from 'classnames/bind';

import Button from '../Button'
import config from '../../config';
import ComicItem from './ComicItem';

import { faCloudDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function ComicList({listName='', params}) {

    const baseUrl = 'https://api.mangadex.org';

    const order = {
        latestUploadedChapter: 'desc'
    };

    const finalOrderQuery = {};

    // { "order[rating]": "desc", "order[followedCount]": "desc" }
    for (const [key, value] of Object.entries(order)) {
        finalOrderQuery[`order[${key}]`] = value;
    };

    const [mangaList, setMangaList] = useState([]);
    // eslint-disable-next-line
    const [chapterList, setChapterList] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
    try {
      const chapterResponse = await axios.get(`${baseUrl}/chapter`, {
        params: {
          limit: 100,
          'originalLanguage[]': 'ja',
          'translatedLanguage[]': 'en',
          'order[readableAt]': 'desc'
        },
        headers: {
          ...config.headers
        }
      });
      const chapters = chapterResponse.data.data.map(data => {
        return { manga: data.relationships.find(rel => rel.type === 'manga').id, chapter: data };
      });
      const uniqueChapters = chapters.reduce((unique, chapter) => {
        const found = unique.find(item => item.manga === chapter.manga);
        if (!found) {
          unique.push(chapter);
        }
        return unique;
      }, []);
      setChapterList(uniqueChapters);

      const mangaIds = uniqueChapters.map(item => item.manga);
      const mangaResponse = await axios.get(`${baseUrl}/manga`, {
        params: {
          ids: mangaIds,
          'includes[]': 'cover_art',
          limit: 100,
        }
      });

      const correctOrderData = mangaIds.map(id => mangaResponse.data.data.find(data => data.id === id));
      const mangaData = correctOrderData.map((item, index) => {
        return { manga: item, chapter: uniqueChapters[index].chapter };
      });
      setMangaList(mangaData);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  
  fetchData();

  // eslint-disable-next-line
}, []);

    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Button noMargin to={config.routes.genre} xLarge cyan leftIcon={<FontAwesomeIcon icon={faCloudDownload}/>}>{listName}</Button>
                <Button noMargin to={config.routes.manga} outline circle>
                    <FontAwesomeIcon icon={faFilter} />
                </Button>
            </header>

            <div className={cx('container-fluid p-0')}>
                <div className='row'>
                    {loading ?
                      Array.from({ length: 18 }).map((_, index) => (
                        <div key={index} className='col-6 col-sm-4 col-md-3 col-lg-2 mb-5'>
                          <Loading coverRatio />
                        </div>
                      )) :                     
                        mangaList.slice(0,18).map((manga) => {
                            return (
                                <div key={manga.manga.id} className='col-6 col-sm-4 col-md-3 col-lg-2 mb-5'>
                                    <ComicItem data={manga} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
     );
}

export default ComicList;
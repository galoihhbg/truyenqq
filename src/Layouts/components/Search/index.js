import { Wrapper as ComicList } from '../../../components/Popper';
import ComicItem from '../../../components/ComicItem';
import styles from './Search.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDebounce } from '../../../hooks';

const cx = classNames.bind(styles);

function Search({show = false}) {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(show);
    const [apiRes, setApiRes] = useState(false);
    const [resultSize, setResultSize] = useState({width: window.innerWidth <992 ? window.innerWidth-20 : 420})

    //500ms after the user stops typing, debounced will get the value of searchValue
    const debounced = useDebounce(searchValue, 500)

    useEffect(() => {
        if (!debounced) {
            setSearchResult([]);
            setApiRes(false)
            return;
        }
        fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(debounced)}&originalLanguage[]=ja&includes[]=cover_art&limit=20`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data)
                setApiRes(true)
            })
    }, [debounced])

    const handleHideResult = () => {
        setShowResult(false);
    }
    const searchRef = useRef()

    useEffect(() => {

      const handleResize = () => {
        if (searchRef.current) {
            setResultSize({width : searchRef.current.clientWidth})
          }
      }

      if (searchRef.current) {
        window.addEventListener('resize', handleResize)
      }

      return () => {
            window.removeEventListener('resize', handleResize)
      }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Tippy
                visible={show && showResult && apiRes}
                interactive
                offset={false}
                render={attrs => (
                <div style={resultSize} className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <ComicList>
                        {
                            searchResult.length > 0 ? searchResult.map((comic) => {
                                return <ComicItem key={comic.id} data={comic} />
                            }) : <span className={cx('no-results')} >No Results Found!</span>
                        }
                    </ComicList>
                </div>
                )}

                onClickOutside={handleHideResult}
            >
                <div ref={searchRef} className={cx('search')}>
                    <input className={cx('search-input')}
                    placeholder='Bạn muốn tìm truyện gì'
                    spellCheck={false}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={e => setShowResult(true)}
                    />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </div>
            </Tippy>                   
        </div>
     );
}

export default Search;
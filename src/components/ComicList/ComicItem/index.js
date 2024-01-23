import styles from './ComicItem.module.scss'
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

const cx=classNames.bind(styles);

function ComicItem({data}) {
    var filename = '';
    data.manga.relationships.forEach(function(relationship) {
        if (relationship.type === "cover_art") {
          filename = relationship.attributes.fileName;
        }
    })
    return ( 
        <div className={cx('wrapper')}>
            <Link to={`/manga/${data.manga.id}`} className={cx('to-manga')}>
            <img className={cx('cover')} src={`https://uploads.mangadex.org/covers/${data.manga.id}/${filename}.512.jpg`} alt='cover'/>
                <span className={cx('title')}>
                    {data.manga.attributes.title.en}
                </span>
            </Link>

            <Link className={cx('to-chapter')}>
                <span className={cx('newest-chapter')}>
                    {
                        'Chương ' + data.chapter.attributes.chapter
                    }
                </span>
            </Link>
        </div>
     );
}

export default ComicItem;
import styles from './ComicCard.module.scss'
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function ComicCard({data}) {
    return ( 
        <div className={cx('wrapper')}>
            <Link to={`/manga/${data.manga_id}`} className={cx('to-manga')}>
            <img className={cx('cover')} src={data.data.cover} alt='cover'/>
                <span className={cx('title')}>
                    {data.data.title}
                </span>
            </Link>

            <Link className={cx('to-chapter')}>
                <span className={cx('newest-chapter')}>
                    {
                        'Chương mới'
                    }
                </span>
            </Link>
        </div>
     );
}

export default ComicCard;
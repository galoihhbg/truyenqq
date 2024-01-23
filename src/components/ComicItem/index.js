import styles from './ComicItem.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FormatTimeDiff as TimeDiff } from '../../functions';

const cx = classNames.bind(styles)

function ComicItem({data}) {
    var filename = '';
    data.relationships.forEach(function(relationship) {
        if (relationship.type === "cover_art") {
          filename = relationship.attributes.fileName;
        }
    })
    return <Link to={`/manga/${data.id}`} className={cx('wrapper')}>
        <img className={cx('cover')} src={`https://uploads.mangadex.org/covers/${data.id}/${filename}`} alt='Cover'/>
        <div className={cx('info')}>
            <p className={cx('title')}>
                <span>{data.attributes.title.en}</span>
            </p>
            <p className={cx('alternative')}>
                {data.attributes.altTitles.map((altName, index) => {
                    return <span key={index}>{Object.values(altName)+'; '}</span>
                })}
            </p>
            <div className={cx('status-wrapper')}>
                <span className={cx('status-item', 'status')}>{data.attributes.status}</span>
                <span className={cx('status-item', 'latest-update')}>{TimeDiff(data.attributes.updatedAt)}</span>
            </div>
        </div>
    </Link>;
}

export default ComicItem;
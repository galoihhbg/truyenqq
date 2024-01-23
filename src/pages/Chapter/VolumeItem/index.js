import styles from './VolumeItem.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function VolumeItem({data}) {
    console.log(data)
    return ( 
        <div className={cx('wrapper')}>
            <span className={cx('title')}>{data.volume !== 'none' ? `Volume ${data.volume}` : `No Volume`}</span>
            {
                Object.values(data.chapters).map(chapter => {
                    return <Link className={cx('list-item')} key={chapter.id} to={`/chapter/${chapter.id}`}>{`Chương ${chapter.chapter}`}</Link>
                })
            }
        </div>
     );
}

export default VolumeItem;
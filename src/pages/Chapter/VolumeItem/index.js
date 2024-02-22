import styles from './VolumeItem.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function VolumeItem({chapter, handleClick}) {
    return ( 
        <div className={cx('wrapper')}>
            { 
                chapter ? <Link onClick={handleClick} className={cx('list-item')} to={`/chapter/${chapter.id}`}>{`Chương ${chapter.chapter}`}</Link> : 'loading'
            }
        </div>
     );
}

export default VolumeItem;
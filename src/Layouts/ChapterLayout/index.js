import styles from './ChapterLayout.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ChapterLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
     );
}

export default ChapterLayout;
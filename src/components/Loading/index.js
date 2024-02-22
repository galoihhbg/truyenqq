import styles from './Loading.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function Loading({coverRatio = false, fullHeight = false}) {
    const classes = cx('wrapper', {
        coverRatio,
        fullHeight
    })
    return ( 
        <div className={classes}>
            <div className={cx('spinner')}>
            </div>
        </div>
     );
}

export default Loading;
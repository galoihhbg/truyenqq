import { Link } from 'react-router-dom';
import styles from './HotListItem.module.scss'
import classNames from 'classnames/bind';
import config from '../../../../config'

const cx = classNames.bind(styles);

function HotListItem({center = false, description = ''}) {

    const classes = ['wrapper', {
        center
    }]
    return ( 
        <Link to={config.routes.manga} className={cx(classes)}>
            <img className={cx('cover')} src='https://i.truyenvua.com/slider/583x386/slider_1559213484.jpg?gt=hdfgdfg&mobile=2' alt='Cover' />
            <span className={cx('chapter')}>
                Chapter 139
            </span>
            <div className={cx('bottom-shadow')}>
            </div>
            <span className={cx('title')}>
                    Attack On Titan
                </span>
                {description && <div className={cx('description')}>{description}</div> }
        </Link>
     );
}

export default HotListItem;
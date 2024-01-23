import styles from './Footer.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function Footer({children}) {
    return <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <span>Sừng Xanh - Cicii - Galoihhbg</span>

            <div className={cx('right')}>
                <span>Contact: 21021535@vnu.edu.vn</span>
            </div>
        </div>
    </div>;
}

export default Footer;
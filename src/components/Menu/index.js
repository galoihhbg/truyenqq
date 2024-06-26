import styles from './Menu.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Menu({children}) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    );
}

export default Menu;
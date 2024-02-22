import styles from './Popper.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function Wrapper({children, vertical = false, classnames}) {
    const classes = cx('wrapper', {
        vertical,
        [classnames]:classnames
    })
    return <div className={classes}>
        {children}
    </div>;
}

export default Wrapper;
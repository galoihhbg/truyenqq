import styles from './AuthenLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function AuthenLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {children}
            </div>
        </div> );
}

export default AuthenLayout;
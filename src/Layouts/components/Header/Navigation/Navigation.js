import PropTypes from "prop-types";

import styles from '../Header.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Navigation({children}) {
    return (  
        <nav className={cx('nav')}>
            {children}
        </nav>
    );
}

Navigation.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Navigation;
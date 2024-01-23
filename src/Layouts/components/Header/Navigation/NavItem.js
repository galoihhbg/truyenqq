import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from '../Header.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function NavItem({title, to = false, href = false, rightIcon, subProps}) {
    let Comp = 'div';
    const props = {
        ...subProps
    }
    if (to) {
        Comp = NavLink;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    return (  
        <Comp {...props} className={cx('nav-item')}>
            <span className={cx('nav-title')}>{title}</span>
            <span>{rightIcon}</span>
        </Comp>
    );
}

NavItem.propTypes = {
    title: PropTypes.string.isRequired,
}

export default NavItem;
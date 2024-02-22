import { Link } from 'react-router-dom';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Button({ to = false, 
    href = false, 
    onClick, 
    children, 
    circle = false, 
    text = true, 
    primary=false, 
    cyan=false,
    bgPinkRed=false,
    bgModGreen=false,
    bgPinkViolet=false,
    noMargin=false,
    outline = false, 
    medium = false, 
    large= false, 
    xLarge = false, 
    hover = false, 
    classnames, 
    leftIcon,
    rightIcon,
    disabled = false,
    ...subProps}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...subProps
    }

    if (to) {
        Comp = Link
        props.to = to
    } else if (href) {
        Comp = 'a'
        props.href = href
    }

    const classes = cx('wrapper', {
        //types
        text,
        primary,
        outline,
        hover,
        cyan,
        noMargin,
        bgModGreen,
        bgPinkRed,
        bgPinkViolet,

        //size
        medium,
        large,
        xLarge,

        //shapes
        circle,

        //status
        disabled,
        [classnames]:classnames
    })

    return <Comp className= {classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('title')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>;
}

export default Button;
import classNames from "classnames/bind";
import styles from './ToggleWrapper.module.scss'

import Button from "../Button";
import { useState, useEffect, useRef } from "react";

const cx = classNames.bind(styles)
function ToggleWrapper({children}) {

    const contentRef = useRef();
    const [hide, setHide] = useState(true);
    const [contentHeight, setContentHeight] = useState(0)

    const updateContentHeight = () => {
        setHide(contentRef.current.scrollHeight > 175);
        setContentHeight(contentRef.current.scrollHeight);
    }
    
    useEffect(() => {
        updateContentHeight();
    
        window.addEventListener('resize', updateContentHeight);
    
        return () => {
            window.removeEventListener('resize', updateContentHeight);
        }
    }, [children]);

    const handleSeeMore = () => {
        setHide(!hide);
    }

    const contentClass = cx('content', {
        expanded: !hide
    });
    return ( 
        <div className={cx('wrapper')}>
            <div className={contentClass} style={{maxHeight: hide ? '17.5rem' : contentHeight}}>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
            { contentHeight > 175 && (
                <div className={cx('toggle')}>
                    <Button primary noMargin classnames={'toggle-see-more'} onClick={handleSeeMore}>{hide ? 'Xem thêm' : 'Rút gọn'}</Button>
                </div>
            )}
        </div>
     );
}

export default ToggleWrapper;

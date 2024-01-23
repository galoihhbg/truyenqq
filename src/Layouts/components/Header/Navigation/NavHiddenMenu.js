import styles from '../Header.module.scss';
import classNames from 'classnames/bind';
import Button from '../../../../components/Button';
import Menu from '../../../../components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)

function NavHiddenMenu({ items = [], title }) {
    const [visible, setVisible] = useState(false);
    const [isClickDropdown, setIsClickDropdown] = useState(false);
  
    const handleClickNav = () => {
      if (isClickDropdown) {
        setVisible(!visible);
      }
    };
  
    const handleMouseEnter = () => {
      if (!isClickDropdown) {
        setVisible(true);
      }
    };
  
    const handleMouseLeave = () => {
      if (!isClickDropdown) {
        setVisible(false);
      }
    };
  
    const handleClick = () => {
        setVisible(false);
    };
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 992) {
          setIsClickDropdown(false);
          setVisible(false)
        } else {
          setIsClickDropdown(true);
        }
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const dropdownProps = {};
    const hoverProps = {}
    const linkProps = isClickDropdown ? { onClick: handleClick } : {};

    if (isClickDropdown || window.innerWidth < 992) {
      dropdownProps.onClick = handleClickNav 
    } else {
      hoverProps.onMouseEnter = handleMouseEnter;
      hoverProps.onMouseLeave = handleMouseLeave;
    }
  
    const renderItems = () => {
      return items.map((item, index) => {
        return (
          <Button onClick={handleClick} key={index} medium classnames={'navItem'} to={'/the-loai/' + item.title.toLowerCase().replace(' ', '-')}>
            {item.title}
          </Button>
        );
      });
    };
  
    return (
      <div {...hoverProps} className={cx('nav-item')}>
        <span {...dropdownProps} className={cx('nav-title')}>
          {title} <FontAwesomeIcon className={cx('nav-icon')} icon={faCaretDown} />
        </span>
        <div className={cx('hidden-menu', visible ? '' : 'none')}>
          <div className={cx('inner')}>
            <Menu>
              {renderItems()}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
  

export default NavHiddenMenu;
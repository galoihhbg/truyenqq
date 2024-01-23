import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';

import images from '../../../assets/images';
import styles from './Header.module.scss';
import Button from '../../../components/Button';
import Navigation, {NavHiddenMenu, NavItem} from './Navigation';
import config from '../../../config'
import Search from '../Search';
import { faBars, faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

const GENRE_ITEMS = [
    {
        title: 'Action',
    },
    {
        title: 'Adventure',
    },
    {
        title: 'Anime',
    },
    {
        title: 'Chuyển Sinh',
    },
    {
        title: 'Cổ Đại',
    },
    {
        title: 'Comedy',
    },
    {
        title: 'Comic',
    },
    {
        title: 'Demons',
    },
    {
        title: 'Detective',
    },
    {
        title: 'Doujinshi',
    },
    {
        title: 'Drama',
    },
    {
        title: 'Fantasy',
    },
    {
        title: 'Gender Bender',
    },
    {
        title: 'Harem',
    },
    {
        title: 'Historical',
    },
    {
        title: 'Horror',
    },
    {
        title: 'Huyền Huyễn',
    },
    {
        title: 'Isekai',
    },
    {
        title: 'Josei',
    },
    {
        title: 'Mafia',
    },
    {
        title: 'Magic',
    },
    {
        title: 'Manhua',
    },
    {
        title: 'Manhwa',
    },
    {
        title: 'Martial Arts',
    },
    {
        title: 'Military',
    },
    {
        title: 'Mystery',
    },
    {
        title: 'Ngôn Tình',
    },
    {
        title: 'Oneshot',
    },
    {
        title: 'Psychological',
    },
    {
        title: 'Romance',
    },
    {
        title: 'School Life',
    },
    {
        title: 'Sci-fi',
    },
    {
        title: 'Seinen',
    },
    {
        title: 'Shoujo',
    },
    {
        title: 'Shoujo Ai',
    },
    {
        title: 'Shounen',
    },
    {
        title: 'Shounen Ai',
    },
    {
        title: 'Slice of life',
    },
    {
        title: 'Sports',
    },
    {
        title: 'Supernatural',
    },
    {
        title: 'Tragedy',
    },
    {
        title: 'Trọng Sinh',
    },
    {
        title: 'Truyện Màu',
    },
    {
        title: 'Webtoon',
    },
    {
        title: 'Xuyên Không',
    }
]

const RANK_ITEMS = [
    {
        title: 'Top Ngày',
    },
    {
        title: 'Top Tuần',
    },
    {
        title: 'Top Tháng',
    },
    {
        title: 'Yêu Thích',
    },
    {
        title: 'Mới Cập Nhật',
    },
    {
        title: 'Truyện Mới',
    },
    {
        title: 'Truyện Full',
    },
    {
        title: 'Truyện Ngẫu Nhiên',
    }
]

function Header({children}) {

    const [hideToggleMenu, setHideToggleMenu] = useState(true);
    const [isBigSize, setIsBigSize] = useState(true);
    const [hideSearch, setHideSearch] = useState(false);

    const handleToggleSearch = () => {
        setHideSearch(!hideSearch);
    }

    const handleToggleMenu = () => {
        setHideToggleMenu(!hideToggleMenu);
    }

    let expand = {
        fullSize: !hideToggleMenu
    }

    let showSearch = {
        show: hideSearch || window.innerWidth >=992
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
              setIsBigSize(true);
            } else {
              setIsBigSize(false);
            }
          };
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    })

    const logo = isBigSize && window.innerWidth >=992 ? images.logoBigSize : images.logoMobile;
    
    return (
        <header className={cx('wrapper')}>
            <div className={cx('top')}>
                    <div className={cx('inner')}>
                        <div className={cx('left')}>
                            <div className={cx('logo')}>
                                    <img src={logo} alt='Truyen con cặc' />
                                </div>
                                <div className={cx('theme-toggle')}>
                                    <Button circle outline>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </Button>
                                </div>
                            </div>    

                            <div className={cx('right')}>
                                <div className={cx('toggle-search')}>
                                    <Button onClick={handleToggleSearch} circle primary>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </div>
                            <Button classnames={cx('right-button')} medium hover text={false}>Đăng ký</Button>
                            <Button classnames={cx('right-button')} medium hover text={false}>Đăng nhập</Button>
                        </div>

                            <div className={cx('search', {...showSearch})}>
                                <Search show={showSearch.show} />
                            </div>

                    </div>
                </div>

                <div className={cx('bottom')}>
                    <div className={cx('inner', {...expand})}>
                        <Navigation>
                            <NavItem title="Trang Chủ" to={config.routes.home}></NavItem>
                            <NavHiddenMenu items={GENRE_ITEMS} title="Thể Loại" />
                            <NavHiddenMenu items={RANK_ITEMS} title="Xếp Hạng" />
                            <NavItem title="Con Gái" to={config.routes.home}></NavItem>
                            <NavItem title="Con Trai" to={config.routes.home}></NavItem>
                            <NavItem title="Tìm Truyện" to={config.routes.home}></NavItem>
                            <NavItem title="Lịch Sử" to={config.routes.home}></NavItem>
                            <NavItem title="Theo dõi" to={config.routes.following}></NavItem>
                            <NavItem title="Group" href='https://www.facebook.com/TheGreenhornTavern' subProps={{target: '_blank'}}></NavItem>
                            <NavItem title="Fanpage" href='https://www.facebook.com/TheGreenhornTavern' subProps={{target: '_blank'}}></NavItem>
                            <NavItem title="Discord" href='https://www.facebook.com/TheGreenhornTavern' subProps={{target: '_blank'}}></NavItem>
                            <FontAwesomeIcon onClick={handleToggleMenu} className={cx('toggle')} icon={hideToggleMenu ? faBars : faWindowClose} />
                        </Navigation>
                    </div>
                </div>
        </header>
    );
}

export default Header;
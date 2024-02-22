import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as ItemList } from '../../../components/Popper';

import images from '../../../assets/images';
import styles from './Header.module.scss';
import Button from '../../../components/Button';
import Navigation, {NavHiddenMenu, NavItem} from './Navigation';
import config from '../../../config'
import Search from '../Search';
import { faBars, faBell, faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom';

const cookies = new Cookies()

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
    const [hideToggleNav, setHideToggleNav] = useState(true)

    const location = useLocation()

    const handleToggleSearch = () => {
        setHideSearch(!hideSearch);
    }

    const handleToggleMenu = () => {
        setHideToggleMenu(!hideToggleMenu);
    }

    const hide = () => {
        setHideToggleNav(true)
    }

    const show = () => {
        setHideToggleNav(false)
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

    const token = cookies.get('TOKEN')

    // const userData = cookies.get('USER-DATA')

    // logout
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        window.location.href = "/";
    }
    
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
                            
                            {token ? 
                            <>
                                <Button hover circle>
                                    <FontAwesomeIcon icon={faBell} />
                                </Button>
                                
                                <Tippy
                                    visible={!hideToggleNav}
                                    onClickOutside={hide}
                                    interactive
                                    offset={[0, 8]}
                                    placement='bottom-end'
                                    arrow={true}
                                    
                                    render={attrs => (
                                    <div tabIndex="-1" {...attrs}>
                                        <ItemList vertical={true}>
                                            <Button classnames={cx('header-menu')}>Profile</Button>                                           
                                            <Button classnames={cx('header-menu')}>Following</Button>
                                            <Button classnames={cx('header-menu')}>History</Button>
                                            <Button onClick={logout} classnames={cx('header-menu')}>Log out</Button>
                                        </ItemList>
                                    </div>
                                    )}
                                >
                                    <img onClick={hideToggleNav ? show : hide} className={cx('avatar')} src='https://avatar.truyenvua.com/160x160/avatar_1698158550.jpg?gt=hdfgdfg&mobile=2' alt='user avatar' />
                                </Tippy>
                            </>
                                : 
                            <>
                                <Button to={config.routes.register} classnames={cx('right-button')} medium hover text={false}>Đăng ký</Button>
                                <Button 
                                    to={config.routes.login } 
                                    state={{from: location.pathname}}
                                    classnames={cx('right-button')} 
                                    medium 
                                    hover 
                                    text={false}
                                >
                                    Đăng Nhập
                                </Button>
                            </>
                            }
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
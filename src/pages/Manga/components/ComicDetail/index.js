import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ComicDetail.module.scss'
import classNames from 'classnames/bind';
import Button from '../../../../components/Button'
import { faBook, faEye, faHeart, faPaintBrush, faRss, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../../config'
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useState } from 'react';
const cookies = new Cookies()

const cx = classNames.bind(styles);
function ComicDetail({data, firstChapter, bm_id = false}) {

    const filename =data.relationships.find(relationship => relationship.type === "cover_art").attributes.fileName;
    const author = data.relationships.find(relationship => relationship.type === "author");
    const artist = data.relationships.find(relationship => relationship.type === "artist");
    const genres = data.attributes.tags;

    const token = cookies.get('TOKEN');
    const userData = cookies.get('USER-DATA');
    console.log(userData.userID)

    const navigate = useNavigate();
    const [bm, setBm] = useState(bm_id)

    const bookmark = async () => {
        try {
            const response = await axios.post('http://localhost:4000/action/bookmark/create', {
                user_id: userData.userID,
                manga_id: data.id,
                data: {
                    title: data.attributes.title.en,
                    cover: `https://uploads.mangadex.org/covers/${data.id}/${filename}.512.jpg`
                }
            }, {
                headers: {"Authorization" : `Bearer ${token}`},
            })
            alert(response.data.message)
            setBm(response.data.bm_id)
        } catch (err) {
            console.log('Something wrong!')
        }
        
    }

    const unbookmark = async () => {
        try {
            const response = await axios.post('http://localhost:4000/action/bookmark/remove', {
                bm_id: bm,
            }, {
                headers: {"Authorization" : `Bearer ${token}`},
            })
            alert(response.data.message)
            setBm(false)
        } catch (err) {
            console.log('Something wrong!')
        }
    }

    const handleFollowButton = (e) => {

        e.preventDefault();

        if (!token) {
            navigate(config.routes.login, { state: { from: window.location.pathname }, replace: true });
            return;
        } 

        if (bm) {
            return unbookmark();
        } else {
            return bookmark();
        }
    };

    return ( 
        <div className={cx('wrapper')}>
            <p className={cx('breadcrumb')}>
                <span><Link to={config.routes.home}>Trang Chủ</Link> </span>
                <span> / {data.attributes.title.en}</span>
            </p>
            <div className={cx('container')}>
                <img className={cx('cover')} src={`https://uploads.mangadex.org/covers/${data.id}/${filename}.512.jpg`} alt='Cover art' />
                <div className={cx('detail')}>
                    <div className={cx('title')}>
                        {
                            data.attributes.title.en
                        }
                    </div>

                    <div className={cx('detail-info')}>
                        <div className={cx('key-list')}>
                            <p>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser}/> 
                                <span>Tác giả</span>
                            </p>
                            <p><FontAwesomeIcon className={cx('icon')} icon={faPaintBrush}/> 
                                <span>Họa sĩ</span></p>
                            <p><FontAwesomeIcon className={cx('icon')} icon={faRss}/> 
                                <span>Tình trạng</span></p>
                            <p><FontAwesomeIcon className={cx('icon')} icon={faThumbsUp}/> 
                                <span>Lượt thích</span></p>
                            <p><FontAwesomeIcon className={cx('icon')} icon={faHeart}/> 
                                <span>Lượt theo dõi</span></p>
                            <p><FontAwesomeIcon className={cx('icon')} icon={faEye}/> 
                                <span>Lượt xem</span></p>
                        </div>

                        <div className={cx('value-list')}>
                            <p>{author.attributes.name}</p>
                            <p>{artist.attributes.name}</p>
                            <p>{data.attributes.status}</p>
                            <p>N/A</p>
                            <p>N/A</p>
                            <p>N/A</p>
                        </div>
                    </div>
                    <div className={cx('genre-list')}>
                        {
                            genres.map(genre => {
                                return <Button key={genre.id} classnames={cx('genre-list-item')} medium text outline hover>{genre.attributes.name.en}</Button>
                            })
                        }
                    </div>
                    <div className={cx('actions')}>
                        <div className={cx('top')}>
                            <Button to={`/chapter/${firstChapter.id}`} classnames={cx('comic-action-list')} bgModGreen large leftIcon={<FontAwesomeIcon icon={faBook} />} text={false} >Đọc từ đầu</Button>
                            <Button onClick={(e) => handleFollowButton(e)} classnames={cx('comic-action-list')} bgPinkRed large leftIcon={<FontAwesomeIcon icon={faHeart} />} text={false} >{bm ? 'Hủy theo dõi' : 'Theo dõi'}</Button>
                        </div>
                        <div className={cx('bottom')}>
                            <Button classnames={cx('comic-action-list')} bgPinkViolet large leftIcon={<FontAwesomeIcon icon={faThumbsUp} />} text={false} >Thích</Button>
                        </div>
                    </div>
            </div>
            </div>
        </div>
     );
}

export default ComicDetail;
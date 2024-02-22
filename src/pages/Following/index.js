import axios from 'axios';
import styles from './Following.module.scss'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownload, faFilter } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import Cookies from "universal-cookie";
import Loading from '../../components/Loading';
import ComicCard from './ComicCard';
const cookies = new Cookies()

const cx = classNames.bind(styles)
function Following() {
    const token = cookies.get('TOKEN')
    const userData = cookies.get('USER-DATA')

    const [loading, setLoading] = useState(true)

    const [mangas, setMangas] = useState([])
    useEffect(() => {
        setLoading(!mangas.result)
    }, [mangas])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/action/bookmark/show-all', {
                    user_id: userData.userID
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                setMangas(response.data)
                } catch (err) {
                    console.log(err);
                }
        };
    
        fetchData();

    // eslint-disable-next-line
    }, [token]);
    
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Button noMargin xLarge cyan leftIcon={<FontAwesomeIcon icon={faCloudDownload}/>}>Danh sách theo dõi</Button>
                <Button noMargin outline circle>
                    <FontAwesomeIcon icon={faFilter} />
                </Button>
            </header>
            <div className={cx('container-fluid p-0')}>
                <div className='row'>
                    {loading ? <Loading /> :                     
                        mangas.bookmarks.map((manga) => {
                            return (
                                <div key={manga.manga_id} className='col-6 col-sm-4 col-md-3 col-lg-2 mb-5'>
                                    <ComicCard data={manga} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Following;
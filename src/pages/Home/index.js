import styles from './Home.module.scss'
import classNames from 'classnames/bind';
import HotList from './components/HotList'
import Schedule from './components/Schedule';
import ComicList from '../../components/ComicList';

const cx = classNames.bind(styles);

function Home({children}) {
    return <div className={cx('wrapper')}>
        <HotList />
        <Schedule />
        <ComicList listName='Truyện mới cập nhật'/>
    </div>
}

export default Home;
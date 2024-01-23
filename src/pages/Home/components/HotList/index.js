import styles from './HotList.module.scss'
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import HotListItem from '../HotListItem';

const cx = classNames.bind(styles);

function HotList() {
    return ( 
        <section className={cx('wrapper')}>
            <div className={cx('container-fluid p-0 h-100 d-none d-md-block')}>
                <div className={cx('row m-0')} >
                    <div className={cx('col-3')} >
                        <div className={cx('row')}>
                            <div className={cx('col-12 g-2 ps-0')}>
                                <HotListItem />
                            </div>
                            <div className={cx('col-12 g-2 ps-0')}>
                                <HotListItem />
                            </div>
                        </div>
                    </div>

                    <div className={cx('col-6 g-2')}>
                        <HotListItem center description='Hơn 100 năm trước, giống người khổng lồ Titan đã tấn công và đẩy loài người tới bờ vực tuyệt chủng. Những con người sống sót tụ tập lại, xây bao quanh mình 1 tòa thành 3 lớp kiên cố và tự nhốt mình bên trong để trốn tránh những cuộc tấn công của người khổng lồ. Họ tìm mọi cách để tiêu diệt người khổng lồ nhưng không thành công. Và sau 1 thế kỉ hòa bình, giống khổng lồ đã xuất hiện trở lại, một lần nữa đe dọa sự tồn vong của con người....  Elen và Mikasa phải chứng kiến một cảnh tượng cực kinh khủng - mẹ của mình bị ăn thịt ngay trước mắt. Elen thề rằng cậu sẽ giết tất cả những tên khổng lồ mà cậu gặp.....'/>
                    </div>

                    <div className={cx('col-3')}>
                        <div className={cx('row')}>
                            <div className={cx('col-12 g-2 pe-0')}>
                                <HotListItem />
                            </div>
                            <div className={cx('col-12 g-2 pe-0')}>
                                <HotListItem />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default HotList;
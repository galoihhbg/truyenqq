import styles from './Schedule.module.scss'
import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles)
function Schedule() {
    return ( 
        <section className={cx('wrapper')}>
            <div className={cx('container-fluid mt-0 g-0')}>
                <div className={cx('row')}>
                    <div className='col-sm-12 col-md-3'>
                        <span className={cx('title')}>
                            Thông báo
                        </span>
                    </div>
                    <div className='col-sm-12 col-md-9'>
                        <div className='row g-2'>
                            <div className='col-12'>
                                <span className={cx('schedule-item')}>
                                    [10:00] Ước Mong Của Thần Quan Là Được Cưỡi Ác Long - Chương 9 
                                </span>
                            </div>
                            <div className='col-12'>
                                <span className={cx('schedule-item')}>
                                    [12:00] Nam Nhân Đến Từ Địa Ngục - Chương 27
                                </span>
                            </div>
                            <div className='col-12'>
                                <span className={cx('schedule-item')}>
                                    [13:00] Mạt Thế Cùng Bạn Gái Zombie - Chương 102
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Schedule;
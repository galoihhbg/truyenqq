import Button from '../Button';
import styles from './ChapterItem.module.scss'
import classNames from 'classnames/bind';

import { ToLocalDate } from '../../functions';


const cx = classNames.bind(styles)

function ChapterItem({data}) {
    const externalUrl = data.attributes.externalUrl;
    const props = {
       
    }
    if (externalUrl) {
        props.href = externalUrl
        props.target = '_blank'
    } else {
        props.to = `/chapter/${data.id}`
    }
    return ( 
        <div className={cx('wrapper')}>
            <Button {...props} classnames={'chapter-list-item'} noMargin>{data.attributes.title ? `Chương ${data.attributes.chapter}: ${data.attributes.title}` : `Chương ${data.attributes.chapter}`}</Button>
            <span className={cx('update-time')}>{ToLocalDate(data.attributes.updatedAt)}</span>
        </div>
     );
}

export default ChapterItem;
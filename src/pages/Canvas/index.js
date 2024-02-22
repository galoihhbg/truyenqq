import { useEffect, useRef } from 'react';
import styles from './Canvas.module.scss'
import classNames from 'classnames/bind'

import Flame from './Flame';

const cx = classNames.bind(styles)

function Canvas({children}) {
    const canvasRef = useRef();

    const flameLinks = [
        'https://i.imgur.com/ph6vGtc.jpeg[/img]',
        'https://i.imgur.com/2iInDaq.jpeg[/img]',
        'https://i.imgur.com/vjs1j4K.jpeg[/img]',
        'https://i.imgur.com/JYPyE6O.jpeg[/img]',
        'https://i.imgur.com/AWRGITl.jpeg[/img]',
        'https://i.imgur.com/wSlaSbz.jpeg[/img]',
        'https://i.imgur.com/CVWK6ug.jpeg[/img]'
    ]

    const saveImage = async (dataLink) => {
        try {
            const response = await fetch(dataLink);
            const blob = await response.blob();
            const image = await createImageBitmap(blob);
            
            return image;
        } catch (error) {
            console.error('Đã xảy ra lỗi khi tải hình ảnh:', error);
        }
    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const loadImage = async (flameLinks) => {
            const flameImages = await Promise.all(flameLinks.map(async (link) => {
                return await saveImage(link);
            }));
    
            return flameImages;
        }
    
        loadImage(flameLinks).then((flameImages) => {
            // Once all images are loaded, you can draw them on the canvas
            const flame = new Flame(0,500, flameImages, ctx)
            // ctx.drawImage(flame.frames[0], 0, 0)
            flame.breath()
        }).catch(error => {
            console.error('Đã xảy ra lỗi khi tải hình ảnh:', error);
        });

    // eslint-disable-next-line
    }, []);
    
    
    

    return (
        <div className={cx('wrapper')}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
}


export default Canvas;
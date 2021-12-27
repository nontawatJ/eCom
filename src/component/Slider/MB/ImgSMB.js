import React, { useState } from 'react';
import { MBD } from './MBD';
import { NavLink } from 'react-router-dom';
import './ImgSMB.css';

const ImgSMB = ({slides}) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className='mediumBird'>
            <section className='slider'>
                <div className='slider-pic'>
                    <div className='prev-btn' onClick={prevSlide}>
                        <i className="fas fa-caret-left"></i>
                    </div>
                    <div className='next-btn' onClick={nextSlide}>
                        <i className="fas fa-caret-right"></i>
                    </div>
                    {MBD.map((slide, index) => {
                        return (
                            <div className={index === current ? 'slide active' : 'slide'} key={index}>
                                {index === current && (
                                    <img src={slide.image} alt='medium parrots' className='image' />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className='desc-box'>
                    <NavLink to='/productMediumBird'>
                        <button type='button'>
                            Medium Parrots
                        </button>
                    </NavLink>
                </div>
            </section>
        </div>
    )
}
export default ImgSMB;
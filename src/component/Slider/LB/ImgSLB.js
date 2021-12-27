import React, { useState } from 'react';
import { LBD } from './LBD';
import { NavLink } from 'react-router-dom';
import './ImgSLB.css';

const ImgSLB = ({slides}) => {
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
        <div className='largeBird'>
            <section className='slider'>
                <div className='slider-pic'>
                    <div className='prev-btn' onClick={prevSlide}>
                        <i className="fas fa-caret-left"></i>
                    </div>
                    <div className='next-btn' onClick={nextSlide}>
                        <i className="fas fa-caret-right"></i>
                    </div>
                    {LBD.map((slide, index) => {
                        return (
                            <div className={index === current ? 'slide active' : 'slide'} key={index}>
                                {index === current && (
                                    <img src={slide.image} alt='large parrots' className='image' />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className='desc-box'>
                    <NavLink to='/productLargeBird'>
                        <button type='button'>
                            Large Parrots
                        </button>
                    </NavLink>
                </div>
            </section>
        </div>
    )
}
export default ImgSLB;
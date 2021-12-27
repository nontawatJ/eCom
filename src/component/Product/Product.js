import React, {useEffect} from 'react';
import Nav from '../Nav/Nav';
import BGV from '../video/backGVideo';
import ImgSSB from '../Slider/SB/ImgSSB';
import ImgSMB from '../Slider/MB/ImgSMB';
import ImgSLB from '../Slider/LB/ImgSLB';
import { SBD } from '../Slider/SB/SBD';
import { MBD } from '../Slider/MB/MBD';
import { LBD } from '../Slider/LB/LBD';

import './Product.css';




const Product = () => {

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
        }
    }) 
    

    return (
        <div className='product-body'>
            <Nav />
            <BGV />
            <div className='product-container'>
                <div className='product-box'>
                    <ImgSSB slides={SBD} />
                </div>   
                <div className='product-box'>
                    <ImgSMB slides={MBD} />
                </div> 
                <div className='product-box'>
                    <ImgSLB slides={LBD} />
                </div>     
            </div>
            
        </div>
    );
}



export default Product;
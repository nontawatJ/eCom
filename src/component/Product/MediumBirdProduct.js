import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BGV from '../video/backGVideo'
import Nav from '../Nav/Nav';
import { NavLink } from 'react-router-dom';

import "./BirdProduct.css";

const MediumBirdProduct = () => {
    const [product, setProduct] = useState([{
        _id: '',
        birdName: '',
        description: '',
        price: '',
        birdType: '',
        birdImage: '',
        createdAt: ''
    }]);
    const [loadProduct, setLoadProduct] = useState(false);


    const getMediumBirdProduct = async () => {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get("https://mak-personal-project-server.herokuapp.com/home/auth/getMediumBirdProduct", config)
            setProduct(data);
            setLoadProduct(true);

        }
        catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getMediumBirdProduct();
    }, [])





    return (
        <div>
            <Nav />
            <BGV />
            {loadProduct ? (
                <div className="BirdProduct-body">
                    {product.map(item => (
                        <div className="BirdProduct-container">
                            <div className='BirdProduct-title'>
                                <p>{item.birdName} < br /> <span>({item.birdType})</span></p>
                            </div>
                            <div className='BirdProduct-image'>
                                <img src={item.birdImage} alt='bird' />
                            </div>
                            <div className='BirdProduct-desc'>
                                <p>{item.description}</p>
                            </div>
                            <div className='BirdProduct-footer'>
                                <div className='BirdProduct-price'>
                                    <p>Price: {item.price}$</p>
                                </div>
                                <div className="BirdProduct-buy">
                                    <NavLink to='/SignIn'>
                                        <button type='button'>
                                            Buy
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            ) : (
                <div className='BirdProduct-body'>
                    <h1>Loading Data from MongoDB...</h1>
                </div>
            )}

        </div>
    );
};

export default MediumBirdProduct;
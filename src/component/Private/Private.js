import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavPri from '../Nav/NavPri';
import BGV from '../video/backGVideo';
import "../Product/BirdProduct.css";



const Private = () => {
    const [email, setEmail] = useState("");
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
    const [addToCartIni, setAddToCartIni] = useState(null);

    const getProduct = async () => {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get("https://mak-personal-project-server.herokuapp.com/home/auth/getProduct", config)
            setProduct(data);
            setLoadProduct(true);

        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setEmail(localStorage.getItem("email"));
        getProduct();
    },[]);

    function addToCartIniFunc(_id) {
        setAddToCartIni(_id);
    }
    const cancelAddToCartIniFunc = () => {
        setAddToCartIni(null);
    }

    async function  addProductToCart(email, birdName, price )  {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/addCart", {email, birdName,price}, config)
            setAddToCartIni(null)
        }
        catch (error) {
            console.log(error)
        }
    }

   
    return (
        <div>
            <NavPri />
            <BGV />
            {loadProduct ? (
                <div className="BirdProduct-body">
                    {product.map(item => (
                        <div key={item._id} className="BirdProduct-container">
                            {item._id === addToCartIni ? (
                                <div>
                                    <div className='productList-deleteConfirm'>
                                        <p>Are you sure you want to add this product to cart?</p>
                                        <button className='productList-deleteYes' onClick={() => addProductToCart(email, item.birdName, item.price)}>Yes</button>
                                        <button className='productList-deleteNo' onClick={cancelAddToCartIniFunc}>No</button>
                                    </div>
                                </div>

                            ): (
                                <div>
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
                                            <div className="BirdProduct-addToCart">
                                                <button onClick={() => addToCartIniFunc(item._id)}> Add to Cart </button>
                                            </div>
                                        </div>
                                </div>

                            )}
                           
                        </div>
                    ))}

                </div>

            ) : (
                <div className='BirdProduct-body'>
                    <h1>Loading Data from MongoDB...</h1>
                </div>
            )}
        </div>
    )
}

export default Private;

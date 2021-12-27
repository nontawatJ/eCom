import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavPri from '../Nav/NavPri';
import BGV from '../video/backGVideo';
import './Cart.css';

const Cart = ({history}) => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [products, setProduct] = useState([{
        _id: '',
        birdName: '',
        price: ''
    }]);
    const [loadProduct, setLoadProduct] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

   

    useEffect(() => {
        const getCart = async () => {
            const config = {
                header: {
                    "Content-Type": "application/json"
                }
            }
            try {
                setEmail(localStorage.getItem("email"))
                const { data } = await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/getCart",{email}, config)
                setProduct(data);
                setLoadProduct(true);
                var temp = 0;
                for (var i=0; i<data.length;i++) {
                    temp = temp + data[i].price;
                    setTotalPrice(temp);
                }
            }
            catch (error) {
                console.log(error)
            }
        };
        setEmail(localStorage.getItem("email"))
        getCart();
    },[email]);

    async function clearCart(_id) {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/clearCart", {_id}, config);
            let updateProduct = [...products].filter((item) => item._id !== _id);
            setProduct(updateProduct);
            var temp = 0;
            for (var i=0; i<updateProduct.length;i++) {
                temp = temp + updateProduct[i].price;
                setTotalPrice(temp);
            }
            
        }
        catch (error) {
            console.log(error)
        }
    }

    const submitOrder = async () => {
        if (products.length === 0) {
            console.log("cart empty");
            return;
        }
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/addOrder", {email, products,totalPrice}, config);
            try {
                await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/clearAllCart", {email}, config);
                history.push("/userOrder");
            }
            catch {
                console.log("clear cart fail");
            }

        }
        catch (error) {
            console.log("add order fail")
        }
        
    }

   
    return (
        <div>
            <NavPri />
            <BGV />
            {loadProduct ? (
                <div className='Cart-container'>
                    <table className='Cart-table'>
                        <thead>
                            <tr>
                                <th>Bird Name</th>
                                <th>Price </th>
                                <th></th>
                            </tr>   
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item._id}>
                                    <td>{item.birdName}</td>
                                    <td>{item.price}</td>
                                    <td><i className="far fa-window-close" onClick={() => clearCart(item._id)}></i></td>
                                </tr>                      
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total:</td>
                                <td>{totalPrice}</td>
                                <td><button className="Cart-submitOrder" onClick={submitOrder}>Order Now</button></td>
                            </tr>
                        </tfoot>

                    </table>
                   
                </div>
            ):(
                <div className='BirdProduct-body'>
                    <h1>Loading Data from MongoDB...</h1>
                </div>
            )}

        </div>
    )
};

export default Cart;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavPri from '../Nav/NavPri';
import BGV from '../video/backGVideo';


const UserOrder = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [orders, setOrders] = useState([{
        email: '',
        products: [{birdName: '', price: ''}],
        totalPrice: '',
        status: '',
        orderDate: ''
    }]);
    const [loadOrder, setLoadOrder] = useState(false);

    useEffect(() => {
        const getUserAllOrders = async () => {
            const config = {
                header: {
                    "Content-Type": "application/json"
                }
            }
            try {
                const { data } = await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/getUserAllOrders",{email}, config)
                setLoadOrder(true);
                var temp = "";
                for (var i=0;i<data.length;i++) {
                    for (var j=0;j<10;j++) {
                        temp = temp + data[i].orderDate[j];
                    }
                    data[i].orderDate = temp;
                    temp = "";
                }
                setOrders(data);
                
                
            }
            catch (error) {
                console.log(error)
            }
        };
        setEmail(localStorage.getItem("email"))
        getUserAllOrders();
    },[email]);



    return(
        <div>
            <NavPri />
            <BGV />
            {loadOrder ? (
                <div className='Order-container'>
                    <table className='Order-table'>
                        <thead>
                            <tr>
                                <th>Products<span className='Order-show'>/$</span></th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Order Date</th>
                            </tr>   
                        </thead>
                        <tbody>
                            {orders.map(item => (
                                <tr key={item._id}>
                                    <td>{item.products.map(
                                        items => (
                                            <div key={items._id}>
                                                <p>{items.birdName}<span className='Order-show'>/${items.price}</span></p>
                                            </div>
                                        )
                                    )}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.status}</td>
                                    <td>{item.orderDate}</td>
                                </tr>                      
                            ))}
                        </tbody>
                    </table>
                </div>
            ):(
                <div className='productList-body'>
                    <h1>Loading Data from MongoDB...</h1>
                </div>
            )}


        </div>
    );
}

export default UserOrder;

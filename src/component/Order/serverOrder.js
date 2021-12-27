import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BGV from '../video/backGVideo'
import NavAdmin from '../Nav/NavAdmin.js';
import './serverOrder.css';


const ServerOrder = () => {
    const [orders, setOrders] = useState([{
        email: '',
        products: [{birdName: '', price: ''}],
        totalPrice: '',
        status: '',
        orderDate: ''
    }]);
    const [loadOrder, setLoadOrder] = useState(false);    
    const [tableStatus, setTableStatus] = useState('');

    const getAllOrders = async () => {
        const config = {
            header: {
                "Content-Type": "application/json"
            } 
        }
        try {
            setLoadOrder(false);
            const {data} = await axios.get("https://mak-personal-project-server.herokuapp.com/home/private/getAllOrders",config)
            setOrders(data);
            setLoadOrder(true); 
            setTableStatus('All Orders');
        }
        catch (error){
            console.log(error)
        }
    };
    const getProcessingOrders = async () => {
        const config = {
            header: {
                "Content-Type": "application/json"
            } 
        }
        try {
            setLoadOrder(false);
            const {data} = await axios.get("https://mak-personal-project-server.herokuapp.com/home/private/getProcessingOrders",config)
            setOrders(data);
            setLoadOrder(true); 
            setTableStatus('New Orders');
        }
        catch (error){
            console.log(error)
        }
    };
    const getConfirmOrders = async () => {
        const config = {
            header: {
                "Content-Type": "application/json"
            } 
        }
        try {
            setLoadOrder(false);
            const {data} = await axios.get("https://mak-personal-project-server.herokuapp.com/home/private/getConfirmOrders",config)
            setOrders(data);
            setLoadOrder(true); 
            setTableStatus('Confirm Orders');
        }
        catch (error){
            console.log(error)
        }
    };
    async function  confirmOrder(_id)  {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/confirmOrder", {_id}, config)
            const updateOrder = [...orders].map((item) => {
                if (item._id === _id) {
                    item.status = "Confirm";
                }
                return item;
            })
            setOrders(updateOrder);
        }
        catch (error) {
            console.log(error)
        }
    }
    async function  deleteOrder(_id)  {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/private/deleteOrder", {_id}, config)
            let updateOrder = [...orders].filter((item) => item._id !== _id);
            setOrders(updateOrder);
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getAllOrders(); 
    },[])



    return (
        <div>
            <NavAdmin />
            <BGV />
            <div className="Order-viewOption">
                <button onClick={getAllOrders}>All Order</button>
                <button onClick={getProcessingOrders}>New Order</button>
                <button onClick={getConfirmOrders}>Confirm Order</button>
            </div>
            <div className="Order-viewStatus">
                <h1 className="Order-tableStatus">{tableStatus}</h1>
            </div>
            
            
            {loadOrder ? (
                <div className='Order-container'>
                    <table className='Order-table'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Products<span className='Order-show'>/$</span></th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>   
                        </thead>
                        <tbody>
                            {orders.map(item => (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.products.map(
                                        items => (
                                            <div key={items._id}>
                                                <p>{items.birdName}<span className='Order-show'>/${items.price}</span></p>
                                            </div>
                                        )
                                    )}<br/> = ${item.totalPrice}</td>
                                    <td>{item.status}</td>
                                    <td><i className="fas fa-clipboard-check" onClick={() => confirmOrder(item._id)}></i></td>
                                    <td><i className="fas fa-trash" onClick={() => deleteOrder(item._id)}></i></td>
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
    )
}

export default ServerOrder;
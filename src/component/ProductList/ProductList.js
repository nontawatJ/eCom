import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BGV from '../video/backGVideo'
import NavAdmin from '../Nav/NavAdmin.js';
import FileBase64 from 'react-file-base64';


import './ProductList.css';

const birdTypeValue = [
    {key: 1, value: "Small Bird"},
    {key: 2, value: "Medium Bird"},
    {key: 3, value: "Large Bird"}
]

const ProductList = () => {
    const [product,setProduct] = useState([{
        _id: '',
        birdName: '',
        description: '',
        price: '',
        birdType: '',
        birdImage: '',
        createdAt: ''
    }]);
    const [loadProduct, setLoadProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProductConfirm, setDeleteProductConfirm] = useState(null);
    const [birdName,setBirdName] = useState("");
    const [description,setDesc] = useState("");
    const [price,setPrice] = useState(0);
    const [birdType,setBirdType] = useState("");
    const [birdImage, setBirdImage] = useState("");




    const getProduct = async () => {
        const config = {
            header: {
                "Content-Type": "application/json"
            } 
        }
        try {
            const {data} = await axios.get("https://mak-personal-project-server.herokuapp.com/home/auth/getproduct",config)
            setProduct(data);
            setLoadProduct(true); 
                     
        }
        catch (error){
            console.log(error)
        }
    };
    useEffect(()=> {
        getProduct(); 
    },[])

    async function  deleteProduct(_id)  {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/auth/deleteProduct", {_id}, config)
            let updateProduct = [...product].filter((item) => item._id !== _id);
            setProduct(updateProduct);
        }
        catch (error) {
            console.log(error)
        }
    }
    async function updateEditProduct(_id) {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/auth/editProduct", {_id,birdName, description, price, birdType, birdImage}, config);
            const updateProduct = [...product].map((item) => {
                if (item._id === _id) {
                    item.birdName = birdName;
                    item.description = description;
                    item.price = price;
                    item.birdType = birdType;
                    item.birdImage = birdImage;
                }
                return item;
            })
            setProduct(updateProduct);
            setEditProduct(null);
        }
        catch (error) {
            console.log(error)
        }
    }

    function editProductIni(item) {
        setEditProduct(item._id);
        setBirdName(item.birdName);
        setDesc(item.description);
        setPrice(item.price); 
        setBirdImage(item.birdImage);
        setBirdType(item.birdType)
        setDeleteProductConfirm(null)
    }
    const cancelEdit = () => {
        setEditProduct(null);
    
    }
    function deleteProductIni(_id) {
        setDeleteProductConfirm(_id);
        setEditProduct(null);
    }
    const cancelDelete = () => {
        setDeleteProductConfirm(null);
    }


    const birdNameChangeHandler = (e) => {
        setBirdName(e.target.value);
    }
    const birdTypeChangeHandler = (e) => {
        setBirdType(e.target.value)
    }
    const descChangeHandler = (e) => {
        setDesc(e.target.value);
    }
    const priceChangeHandler = (e) => {
        setPrice(e.target.value);
    }
    
    return (
        <div>
            <NavAdmin />
            <BGV />
                {loadProduct ? (
                    <div className='productList-body'>
                        {product.map(item => (
                            <div key={item._id} className='productList-container'>
                                {item._id === editProduct ? (
                                    <form className='editProduct-form'>
                                        <div className='editProduct-birdName'>
                                            <label className='editProduct-label'>Bird Name:-</label> 
                                            <input type='text'
                                            value={birdName}
                                            onChange={birdNameChangeHandler}/>
                                        </div> 
                                        <div className='editProduct-birdType'>
                                            <label className='editProduct-label'>Bird Type:- ({item.birdType})</label>
                                            <select onChange={birdTypeChangeHandler} id='birdType'>
                                                {birdTypeValue.map(item => (
                                                    <option key={item.key} value={item.value}>
                                                        {item.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='editProduct-image'>
                                            <label className='editProduct-label'>Picture of the bird:-</label>
                                            <div className='image-input '>
                                                <FileBase64
                                                    multiple={ false }
                                                    onDone={({base64}) => setBirdImage(base64) } />
                                            </div>
                                            
                                        </div>
                                        <div className='editProduct-preview'>
                                            <img src={birdImage} alt='bird pic2' />
                                        </div>
                                        <div className='editProduct-desc'>
                                            <label className='editProduct-label'>Description:-</label> 
                                            <textarea 
                                                value={description}
                                                onChange={descChangeHandler}
                                            />
                                        </div>
                                        <div className='editProduct-price'>
                                            <label className='editProduct-label'>Price:-</label>
                                            <input type='number' 
                                                value={price}
                                                onChange={priceChangeHandler}
                                            />
                                        </div>
                                        <div className='editProduct-save' onClick={() => updateEditProduct(item._id)}>
                                            <i className="fas fa-save"></i>
                                        </div>
                                        <div className='editProduct-cancel' onClick={cancelEdit}>
                                            <i className="fas fa-window-close"></i>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        {item._id === deleteProductConfirm ? (
                                            <div>
                                                <div className='productList-deleteConfirm'>
                                                    <p>Are you sure you want to delete this product?</p>
                                                    <button className='productList-deleteYes' onClick={() => deleteProduct(item._id)}>Delete</button>
                                                    <button className='productList-deleteNo' onClick={cancelDelete}>Cancel</button>
                                                </div>
                                            </div>
                                            ):(
                                                <div>
                                                    <div className='productList-title'>
                                                        <p>{item.birdName} < br/> <span>({item.birdType})</span></p>
                                                    </div>
                                                    <div className='productList-image'>
                                                        <img src={item.birdImage} alt='bird' />
                                                    </div>
                                                    <div className='productList-desc'>
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div className='productList-footer'>
                                                        <div className='productList-price'>
                                                            <p>Price: {item.price}$</p>
                                                        </div>
                                                        <div className='productList-edit' onClick={() => editProductIni(item)}>
                                                            <i className="far fa-edit"></i>
                                                        </div>
                                                        <div className='productList-delete' onClick={() => deleteProductIni(item._id)}>
                                                            <i className="fas fa-trash"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ):(
                    <div className='productList-body'>
                        <h1>Loading Data from MongoDB...</h1>
                    </div>
                )}            
        </div>
    )
}


export default ProductList;
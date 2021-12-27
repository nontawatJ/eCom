import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import BGV from '../video/backGVideo'
import NavAdmin from '../Nav/NavAdmin';
import './UploadProduct.css';



const birdTypeValue = [
    {key: 1, value: "Small Bird"},
    {key: 2, value: "Medium Bird"},
    {key: 3, value: "Large Bird"}
]

const UploadProduct = () => {
    const [birdName,setBirdName] = useState("");
    const [description,setDesc] = useState("");
    const [price,setPrice] = useState(0);
    const [birdType,setBirdType] = useState("Small Bird");
    const [preview, setPreview] = useState("");
    const [birdImage, setBirdImage] = useState("");
    const [error, setError] = useState("");
    const [uploading,setUploading] = useState(false);
    
    const birdNameChangeHandler = (e) => {
        setError("");
        setBirdName(e.target.value);
    }
    const descChangeHandler = (e) => {
        setError("");
        setDesc(e.target.value);
    }
    const priceChangeHandler = (e) => {
        setError("");
        setPrice(e.target.value);
    }
    const birdTypeChangeHandler = (e) => {
        setError("");
        setBirdType(e.target.value)
    }
    
    useEffect(() => {
        if (!birdImage) {
            setPreview(undefined);
            return;
        }
        setPreview(birdImage);

        return;

    }, [birdImage])

    const uploadProductHandler = async (e) => {
        e.preventDefault();
        
        if (!birdImage) {
            setError("need to upload the image");
            return;
        }
        setUploading(true);
        
        

        const config = {
            header: {
                "Content-Type": "application/json"
            } 
        }
        try {
            await axios.post("https://mak-personal-project-server.herokuapp.com/home/auth/uploadProduct", {birdName, description, price, birdType, birdImage}, config);
            window.location.reload();
        }
        catch (error) {
            setUploading(false);
            setError(error.response.data.error);
        }
    }

    return (
        <div className='UploadProduct-body'>
            <NavAdmin />
            <BGV />
            <div className='UploadProduct-container'>
                <div className='UploadProduct-title'>
                    Upload Bird Product
                </div>
                {uploading ? (
                    <div className='uploadProduct-uploading'>
                        <p>Uploading product to MongoDB...</p>
                    </div>

                ):(
                    <form onSubmit={uploadProductHandler}>
                        <div className='field'>
                            <label>Bird Name:-</label><br/>
                            <input type='text'
                            value={birdName}
                            id='birdName'
                            onChange={birdNameChangeHandler}
                            required />
                        </div>
                        <div className='field'>
                            <label>Description:-</label><br/>
                            <textarea 
                            value={description}
                            id='description'
                            onChange={descChangeHandler}
                            required />
                        </div>
                        <div className='field'>
                            <label>Price:-</label><br/>
                            <input type='number'
                            value={price}
                            id='price'
                            onChange={priceChangeHandler}
                            required />
                        </div>
                        <div className='field'>
                            <label>Bird Type:-</label><br/>
                            <select onChange={birdTypeChangeHandler} id='birdType'>
                                {birdTypeValue.map(item => (
                                    <option key={item.key} value={item.value}>
                                        {item.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='field'>
                            <label>Picture of the bird:-</label><br/>
                            <FileBase64
                                multiple={ false }
                                onDone={({base64}) => setBirdImage(base64) } />
                            <div className="uploadPic">
                                {birdImage && <img src={preview} alt="bird pic"/>}
                            </div>   

                        </div>
                        <div className="UploadProduct-errorMessage">
                            {error && <span className="errorMessage">
                                <i class="fas fa-exclamation-triangle"></i>
                                {error}
                            </span>}
                        </div>
                        <div className='field'>
                            <input type='submit' value='Upload' />
                        </div>
                        <div className='uploadProduct-note'>
                            <p>Note: it take around 5-10s to upload the product to the server</p>
                        </div>
                    </form>
                )}
                
            </div>

            
        </div>
    )
}

export default UploadProduct;

import React, { useEffect, useState } from "react";
import "./styles/AddModal.css"

type EditModalProps = {
    handleEditModal: (param:void)=>void;
    reloader: (param:void)=>void;
    product: productEditType;
}

type eventHandler = (e:React.MouseEvent) => void;

type productEditType = {
    id?: number;
    name: string;
    brand: string;
    price: number;
}
const EditModal:React.FC<EditModalProps> = ({handleEditModal,product,reloader}) => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [require, setRequire] = useState(false);
    const [adding, setAdding] = useState(false);

    useEffect(()=>{
        setName(product.name);
        setBrand(product.brand);
        setPrice(String(product.price));
    },[]);

    const editProduct = async () => {
        const url = `https://nodo-production.up.railway.app/product/${product.id}`;
        const body:productEditType = {
            name:name,
            brand:brand,
            price:Number(price)
        }
        try{
            const req = await fetch(url,{method:'PUT', 
                                        body: JSON.stringify(body),
                                        headers: {
                                        'Content-Type': 'application/json',
                                    }});     
        }catch(err){
            console.error(err);
        }
    }

    const handleOnClick = () =>{
        handleEditModal();
    }

    const handleEdit:eventHandler = () => {
        if(name==="" && brand=="" && price==="") {
            setRequire(true);
            return;
        }
        setAdding(true);
        editProduct();
        setName("");
        setBrand("");
        setPrice("");
        setTimeout(function() {
            reloader();
            handleEditModal();
        }, 1000)
    }

    return (
       <div className="modal" >
            <div className="modal-window" onClick={handleOnClick}></div>
            <div className="modal-container">
                <div className="modal-content">
                    <h3 className="modal-title">{`${""}`}product</h3>
                    <form className="product-form">
                        <label className="label-form"htmlFor="product-name">Product Name</label>
                        <input  className="input-form" 
                                type="text" 
                                id="product-name"
                                onChange={(e)=>setName(e.target.value)}
                                value={name}/>
                        <span className={`${require?"required":"none"}`}>🚫​ You need at least a product name</span>
                        
                        <label className="label-form" htmlFor="brand">Brand</label>
                        <input  className="input-form" 
                                type="text" 
                                id="brand"
                                onChange={(e)=>setBrand(e.target.value)}
                                value={brand}/>
                        <span className={`${require?"required":"none"}`}>🚫​ Yot need at least a brand</span>

                        <label className="label-form"htmlFor="price">Price</label>
                        <input  className="input-form" 
                                type="text" 
                                id="price"
                                onChange={(e)=>setPrice(e.target.value)}
                                value={price}/>
                        <span className={`${require?"required":"none"}`}>🚫​ You need at least a price</span>

                        <div className="submit-btn" onClick={handleEdit}> EDIT PRODUCT</div>
                    </form>
                </div>
            </div>
            <div className={`${adding?"adding":"none"}`}>
                <div className="load-add"></div>
                Saving changes
            </div>
       </div>
    )
}
export default EditModal;
import React, { useEffect, useState } from "react";
import "./styles/AddModal.css"

type Modalparams = {
    handleAddModal: (param:void) => void;
}

type eventHandler = (e:React.MouseEvent) => void;
type productAddType = {
    name: string;
    brand: string;
    price: number;
}
const AddModal: React.FC<Modalparams> = ({handleAddModal}) => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [requireName, setRequireName] = useState(false);
    const [requireBrand, setRequireBrand] = useState(false);
    const [requirePrice, setRequirePrice] = useState(false);
    const [adding, setAdding] = useState(false);
    const submit =async () => {
        const product:productAddType = {
            name: name,
            brand: brand,
            price: Number(price)
        }
        try{
            const url = "https://nodo-production.up.railway.app/product";
            const res = await fetch(url,{method:'POST', 
                                        body: JSON.stringify(product),
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }});
        }
        catch (error){
            console.error(error);
        }  
    }

    const handleOnClick = () =>{
        handleAddModal();
    }

    const handleSubmit:eventHandler = () => {
        if(name==="" || brand=="" || price==="") {
            if(name==="") setRequireName(true);
            if(brand==="")setRequireBrand(true);
            if(price==="" || /[a-zA-Z]/.test(price)) setRequirePrice(true);
            return;
        }
        setAdding(true);
        submit();
        setName("");
        setBrand("");
        setPrice("");
        setTimeout(function() {
            handleAddModal();
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
                                onChange={(e)=>setName(e.target.value)}/>
                        <span className={`${requireName?"required":"none"}`}>🚫​ You need a product name</span>
                        
                        <label className="label-form" htmlFor="brand">Brand</label>
                        <input  className="input-form" 
                                type="text" 
                                id="brand"
                                onChange={(e)=>setBrand(e.target.value)}/>
                        <span className={`${requireBrand?"required":"none"}`}>🚫​ Yot need a brand</span>

                        <label className="label-form"htmlFor="price">Price</label>
                        <input  className="input-form" 
                                type="text" 
                                id="price"
                                onChange={(e)=>setPrice(e.target.value)}/>
                        <span className={`${requirePrice?"required":"none"}`}>🚫​ You need a price</span>

                        <div className="submit-btn" onClick={handleSubmit}> ADD PRODUCT</div>
                    </form>
                </div>
            </div>
            <div className={`${adding?"adding":"none"}`}>
                <div className="load-add"></div>
                Adding product
            </div>
       </div>
    )
}
export default AddModal;
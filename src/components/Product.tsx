import { useState } from "react";
import DeleteSVG from "../svg/Delete";
import SettingsSVG from "../svg/Settings";
import EditModal from "./EditModal";
import "./styles/Products.css";

type productProps = {
        id: number;
        name: string;
        brand: string;
        price: number;
        reloader: (param:void)=>void;
}
type del = (param:number)=>void;
type handleDel = (param:number)=>void;

const Product: React.FC<productProps> = ({id,name,brand,price,reloader}) => {
    const [adding, setAdding] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const deleteProd:del =async (delId) => {
        const id = delId;
        try{
        const url = "https://nodo-production.up.railway.app/product/"+id;
            const res = await fetch(url ,{method:'DELETE', 
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }});
        }
        catch (error){
            console.error(error);
        }
    }
    const handleEditModal = () => {
        console.log("hola");
        
        setEditModal(!editModal);
    }

    const handleDelete:handleDel = (id) =>{
        setAdding(true);
        deleteProd(id);
        setTimeout(() => {
            reloader();
            setAdding(false);
        }, 1000);
    }

    return(
        <>
        {editModal&&<EditModal  handleEditModal={handleEditModal}
                                product={{id,name,brand,price}}
                                reloader={reloader}/>}
        <div className="container_p">
            <div className="img_p"></div>
            <div className="text_p">
                <div className="title_p">
                    <h2>PRODUCT NAME: <span className="api-content"> {name}</span></h2>
                </div>
                <div className="properties">
                    <div className="content_p">
                       <h3>BRAND: <span className="api-content"> {brand}</span></h3> 
                    </div>
                    <div className="content_p">
                        <h3>UNIT PRICE: <span className="api-content"> ${price}</span></h3>
                    </div>
                </div>
            </div>
            <div className="button-cont">
                <div className="btns edit" onClick={handleEditModal}><SettingsSVG className={"svg"}/></div>
                <div className="btns rmv" onClick={()=>handleDelete(id)}><DeleteSVG className={"svg"}/></div>
            </div>
        </div>
        <div className={`${adding?"adding":"none"}`}>
            <div className="load-add"></div>
            Deleting product
        </div>
        </>
    )
}
export default Product;
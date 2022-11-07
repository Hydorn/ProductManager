import React, { ReactNode, useEffect, useState } from "react";
import "./styles/Products.css"
import Add from "./Add";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import Product from "./Product";
import Skeleton from "./Skeleton";
import Pagination from "./Pagination";

type ProductsProps = {
    search: string;
}

type products = {
    id: number;
    name: string;
    brand: string;
    price: number;
}

type modalHandler = (param:void) => void;

type mapProd = (arr:products[]|undefined) => ReactNode;

const Products:React.FC<ProductsProps> = ({search}) => {

    const [dataFetch, setDataFetch] = useState(false);
    const [products, setProducts] = useState<products[]>();
    const [loading, setLoading] = useState(true);

    const [addModal, setAddModal] = useState(false);
    
    const [pagination, setPagination] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(()=>{
        setLoading(true);
        const fetchData = async()=>{
            const response = await fetch(`https://nodo-production.up.railway.app/product/${page}?search=${search}`);
            const data = await response.json();           
            setProducts(data.response);
            setPagination(data.length);
            setLoading(false);
        };
        fetchData();
    },[dataFetch,search,page]);

    useEffect(()=>{
        setPage(0);
    },[search]);

    const reloader = () => {
        setLoading(true);
        setDataFetch(!dataFetch);
    }

    const handleAddModal:modalHandler=()=>{
        setAddModal(!addModal);
        setDataFetch(!dataFetch);
        if(addModal==true){
            if(products){
                const newproducts:products[]|undefined = [...products];
                setLoading(true);
                setProducts(newproducts);
            }
        }
    }
    
    const handlePagination = (id:number) => {
        setPage(id);
    }

    const mapProducts: mapProd = (arr) => {
        const newList:JSX.Element[]=[];
        if(arr)
        arr.map((item)=>{
          newList.push(
            <Product
              id = {item.id}
              brand = {item.brand}
              name = {item.name}
              price = {item.price}
              reloader = {reloader}
            />
          )});       
        return newList;
    }

    const Skeletons:ReactNode = [/*<Add/>,*/<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>,<Skeleton/>];

    if (loading) return (
        <>
        {Skeletons}
        </>   
    )
    else return (
        <>
        {addModal&&<AddModal handleAddModal={handleAddModal}/>}
        <Add handleAddModal={handleAddModal}/>
        {mapProducts(products)}
        <Pagination length={pagination}
                    handlePagination={handlePagination}
                    focus={page}/>
        </>
    )
}

export default Products;
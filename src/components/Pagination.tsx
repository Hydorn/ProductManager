import React, { ReactNode, useEffect, useState } from "react";
import "./styles/Pagination.css"

type paginationProps = {
    length: number;
    focus:number;
    handlePagination: (param:number)=>void;
}

type printPag = (param: number) => ReactNode;

const Pagination:React.FC<paginationProps> = ({length, handlePagination, focus}) => {

    const handleOnClick = (e:React.MouseEvent<HTMLElement>) =>{
        let id = Number(e.currentTarget.id);
        handlePagination(id);
    }

    const printNumbers:printPag = (length:number)=>{
        let numbersList=[];
        for (let i=0; i<length; i++) {
            numbersList.push(<div id={`${i}`} className= {`pagination-item ${i==focus?"focus":""}`} onClick={handleOnClick}>{`${i+1}`}</div>);
        }
        return numbersList;
    }

    return(
        <div className="pagination-container">
            {printNumbers(length)}
        </div>
    )
}
export default Pagination;
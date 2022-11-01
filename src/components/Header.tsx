import React, { useEffect, useState } from "react";
import SearchSVG from "../svg/Search";
import "./styles/Header.css"

type HeaderProps = {
    searchHandler: (param:string) => void;
}
const Header:React.FC<HeaderProps> = ({searchHandler}) =>{
    const [value, setValue] = useState("")

    useEffect(()=>{
        searchHandler(value);
    },[value]);

    return(
        <header className="header">
            <div className="back"></div>
            <div className="search-bar">
                <SearchSVG
                    className="search-icon"/>
                <input className="search" type="text" name="search-bar" onChange={(e)=>setValue(e.target.value)} value={value} placeholder="Search"/>
            </div>
        </header>
    )
}
export default Header;
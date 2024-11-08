import React, { useState, useEffect } from 'react'
import "./Menu.css";
import MenuApi from '../../components/MenuApi/MenuApi';
import MenuCard from '../../components/MenuCard/Menucard';
import Menunav from '../../components/MenuNav/Menunav';
import ProductsCard from '../../components/MenuCard/Menucard';
import Home from '../../components/menuhome/Home';
import Cart from '../../components/cart/Cart';

const uniqueList = [
    ...new Set(
        MenuApi.map((curEle) => {
            return curEle.category;
        })
    ),
    "All"
];

const Restraunt = () => {
    const [menuData, setMenuData] = useState(MenuApi);
    useEffect(() => {
        //  console.log(menuData);
    }, [])

    const filterItem = (category) => {

        if (category === "All") {
            setMenuData(MenuApi);
            return;
        }

        const updatedList = MenuApi.filter((curElem) => {
            return curElem.category === category;
        });

        setMenuData(updatedList);
    };
    return (
        <>
            <div className="menu-header">
                <h1>Discover the best food & drinks in Tezpur                </h1>
                <p>We know everyone has different cravings, so our menu offers a<br></br> variety of dishes to satisfy every taste bud.</p>
            </div>
            {/* <Menunav filterItem = {filterItem} menuList = {menuList}/> */}
           {/* <MenuCard menuData = {menuData}/> */}
            <Home />
            <Cart />

        </>

    )
}

export default Restraunt
import React, { useState } from 'react';

const MenuNav = ({ filterItem, menuList }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
    filterItem(item);
  };

  return (
    <>
      <nav className='menu-navbar'>
        <div className='btn-group'>
          {menuList.map((curEle) => (
            <button
              key={curEle}
              className={`btn-group__item ${activeItem === curEle ? 'btn-group__item--active' : ''}`}
              onClick={() => handleClick(curEle)}
            >
              {curEle}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MenuNav;

import React, { useState, useRef } from 'react';
import ProductsCard from '../../components/MenuCard/Menucard';
import Lottie from 'react-lottie';
import filter from '/public/filter.json';
import './home.css';
import items from '../../api/items';

const Home = () => {
  console.log(items);

  // Initialize products directly from items JSON data
  const [products, setProducts] = useState(
    items.map((item, index) => ({
      id: (index + 1).toString(),
      name: item.food_name,
      price: item.food_price,
      description: item.food_description,
      image: item.image_url,
      category: item.restaurant_name, 
    }))
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: filter,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterCategory(value);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="home" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="menuContainer">
        <div className="home_content">
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="dropdown-container">
              <div className="dropdown-trigger" onClick={toggleDropdown}>
                <Lottie options={defaultOptions} />
                <span>{filterCategory || 'filter'}</span>
              </div>
              {dropdownVisible && (
                <div ref={dropdownRef} className="custom-dropdown">
                  <div onClick={() => handleFilterChange('')}>All</div>
                  <div onClick={() => handleFilterChange('Pizza Haven')}>Pizza Haven</div>
                  <div onClick={() => handleFilterChange('Italiano Bistro')}>Italiano Bistro</div>
                  <div onClick={() => handleFilterChange('Burger Joint')}>Burger Joint</div>
                  {/* Add more categories as needed */}
                </div>
              )}
            </div>
          </div>
          <div className="main-card--container">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredProducts.length < 1 ? (
              <p>No products available</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

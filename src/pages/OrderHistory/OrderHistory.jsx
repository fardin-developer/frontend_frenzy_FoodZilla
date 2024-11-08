import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [range, setRange] = useState('');

  const handleBackClick = () => {
    window.location.href = '/profile';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('cookies'));
        const params = new URLSearchParams();

        if (range) {
          params.append('range', range);
        }

        if (range === 'custom' && startDate && endDate) {
          params.append('startDate', startDate.toISOString());
          params.append('endDate', endDate.toISOString());
        }
        if ((range === 'custom' && startDate && endDate)) {
          const response = await fetch(`${BASE_URL}/orders/showAllMyOrders?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setOrders(data.orders);
        }
        if ((range==='lastWeek'||'lastMonth'||'lastYear')) {
          if ((range === 'custom' && startDate && endDate)) {
            const response = await fetch(`${BASE_URL}/orders/showAllMyOrders?${params.toString()}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            setOrders(data.orders);
          }
        }
        if (range==='') {
          const response = await fetch(`${BASE_URL}/orders/showAllMyOrders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setOrders(data.orders);
        
        }

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [range, startDate, endDate]);

  const handleRangeChange = (e) => {
    setRange(e.target.value);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className='order-history-container'>
      <div className='profileNav'>
        <div className='profileNavLeft' id='orderNav' onClick={handleBackClick}>
          <img src='arrow.png' alt='' srcSet='' width='20px' />
        </div>
        <div className='profileNavRight'></div>
      </div>
      <h2>Order History</h2>

      <div className='filter-container'>
        <select value={range} onChange={handleRangeChange} className='filter-select'>
          <option value=''>Date Range</option>
          <option value='lastWeek'>Last Week</option>
          <option value='lastMonth'>Last Month</option>
          <option value='lastYear'>Last Year</option>
          <option value='custom'>Custom Range</option>
        </select>

        {range === 'custom' && (
          <div className='date-picker-container'>
            <div>
              <label>Start Date: </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div>
              <label>End Date: </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
        )}
      </div>

      <div className='orderMain'>
        {orders.map(order =>
          order.orderItems.map(item => (
            <div className='orderItem' key={item._id}>
              <div className='orderLeft'>
                <img src={item.image} alt={item.name} />
              </div>
              <div className='orderRight'>
                <div className="namenPrice">
                  <h3>{item.name}</h3>
                  <h3><span>₹</span>{item.price}</h3>
                </div>
                <p className='category'>{item._id || 'not available'}</p>
                <p className='category'>Quantity: {item.amount || 'not available'}</p>
                {/* <p className=''>{item.category||'no'}</p> */}
                <div className='bottomOrder'>
                  <p className='price'>{new Date(order.createdAt).toLocaleDateString()}</p>
                  <button className='reorder-button'>{order.status}</button>
                </div>
              </div>
            </div>
          ))
        )}
        {
          orders.length === 0 && (
            <div className='noOrders'>
              <h2>No Orders available right now</h2>
              </div>
          )
        }
      </div>
    </div>
  );
};

export default OrderHistory;

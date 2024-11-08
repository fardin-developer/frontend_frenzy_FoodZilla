import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import './Booking.css';

const Booking = () => {
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
                    const response = await fetch(`${BASE_URL}/orders/showAllMyOrders?${params.toString()}&status=pending`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setOrders(data.orders);
                }
                if ((range === 'lastWeek' || 'lastMonth' || 'lastYear')) {
                    if ((range === 'custom' && startDate && endDate)) {
                        const response = await fetch(`${BASE_URL}/orders/showAllMyOrders?${params.toString()}&status=pending`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        const data = await response.json();
                        setOrders(data.orders);
                    }
                }
                if (range === '') {
                    const response = await fetch(`${BASE_URL}/orders/showAllMyOrders?status=pending`, {
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
            <h2>Your Current Bookings</h2>

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
                        <div className='noOrders' style={{display:'flex',justifyContent:'center', alignItems:'center',padding:'5px',height:'50vh'}}>
                            <h2>You don't have any bookings at the moment</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Booking;

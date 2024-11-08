import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TransactionHistory.css';
import { BASE_URL } from '../../api/baseUrl';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [range, setRange] = useState('');

  const handleBackClick = () => {
    window.location.href = '/profile';
  };

  useEffect(() => {
    const fetchTransactions = async () => {
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

        const response = await fetch(`${BASE_URL}/payment/showAllMyTransactions?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [range, startDate, endDate]);

  const handleRangeChange = (e) => {
    setRange(e.target.value);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className='transaction-history-container'>
      <div className='profileNav'>
        <div className='profileNavLeft' id='transactionNav' onClick={handleBackClick}>
          <img src='arrow.png' alt='' width='20px' />
        </div>
        <div className='profileNavRight'></div>
      </div>
      <h2>Transaction History</h2>

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

      <div className='transactionMain'>
        {transactions.map(transaction => (
          <div className='transactionItem' key={transaction._id}>
            <div className='transactionLeft'>
              <div className="transactionId-Date">
              <p><b>Transaction ID:</b> {transaction.transaction_id === 'null' ? 'NA' : transaction.transaction_id}</p>
              <p><b>Status:</b> {transaction.payment_status}</p>


              </div>
              {/* <p><b>Transaction ID:</b> {transaction.transaction_id || 'N/A'}</p> */}
              <p><b>Order ID:</b> {transaction.order_id}</p>
            </div>
            <div className='transactionRight'>
              <div className="details">
                <p><b>Amount:</b> ₹{transaction.amount}</p>
                {/* <p><b>Payment Method:</b> {transaction.payment_method}</p> */}
                <p><b>Date:</b> {new Date(transaction.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className='noTransactions'>
            <h2>You have no transactions yet</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;

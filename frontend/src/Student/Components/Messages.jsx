import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Message.css"; // Assuming you have separate CSS for Messages

import Home from "../Assets/Home Icon.jpg";
import Search from "../Assets/Filter-SearchIcon.png";
import { UserContext } from '../context/UserContext'; // Import UserContext

function Messages() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMessages, setErrorMessages] = useState(null);
  const [responseCount, setResponseCount] = useState({}); // State to track response counts for each message

  useEffect(() => {
    async function fetchMessageHistory() {
      try {
        const response = await axios.get('http://localhost:5000/message-history');
        if (response.status === 200) {
          setMessages(response.data); // Assuming response.data is an array of messages
          setLoadingMessages(false);
        } else {
          setErrorMessages('Failed to fetch message history');
          setLoadingMessages(false);
        }
      } catch (error) {
        console.error('Error fetching message history:', error);
        setErrorMessages('Failed to fetch message history');
        setLoadingMessages(false);
      }
    }

    fetchMessageHistory();
  }, []);

  // Function to handle responding to a message
  const handleRespond = async (messageId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/messages/${messageId}/respond`, { email: user.email });
      if (response.status === 200) {
        alert('Response submitted successfully');
        // Update local state to reflect the new response count
        setResponseCount((prevCounts) => ({
          ...prevCounts,
          [messageId]: (prevCounts[messageId] || 0) + 1
        }));
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      if (error.response && error.response.data.message === 'User has already responded') {
        alert('You have already responded to this message');
      } else {
        alert('Failed to submit response');
      }
    }
  };

  // Function to navigate back to home page
  const handleHomeNavigation = () => {
    navigate("/mainpage");
  };

  return (
<>
{/* Meetings Container */}
<div className="meetings-container">
  {/* Top Bar */}
  <div className="topBar">
    {/* Home Button */}
    <button className="home-btn" onClick={handleHomeNavigation}>
      <img src={Home} alt="" /> {/* Home Icon */}
      Home
    </button>
  </div>
  {/* Filters Section */}
  <div className="filters">
    {/* Left Side Filters */}
    <div className="leftSide">
      {/* Search Bar */}
      <div className="filters-searchBar">
        <img src={Search} alt="search-icon" /> {/* Search Icon */}
        <input type="search" placeholder="Search..." />
      </div>
    </div>
    {/* Right Side Filters */}
    <div className="rightSide">
      {/* Time Filter */}
      <div className="time filter">
        <input type="text" list="time" placeholder="From When" />
        <datalist id="time">
          <select>
            <option value="Recent">Recent</option>
            <option value="Oldest">Oldest</option>
          </select>
        </datalist>
      </div>
    </div>
  </div>
  {/* Meetings Table */}
  <div className="meetings-table">
  <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Batch</th>
              <th>Message</th>
             
              <th>Respond</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{message.year}</td>
                <td>{message.message}</td>
               
                <td>
  <button className="respond-bttn" onClick={() => handleRespond(message._id)}>Respond</button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
  
 
  </div>
  {/* Table Filters Section */}
  <div className="table-filters">
    
  </div>
</div>


</>
);
}

export default Messages;
 

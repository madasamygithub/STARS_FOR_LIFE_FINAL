import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Meetings.css";
import Home from "../Assets/Home Icon.jpg";
import Search from "../Assets/Filter-SearchIcon.png";
import { UserContext } from '../context/UserContext'; // Import UserContext

function Meetings() {
  const { user } = useContext(UserContext); // Get user from context
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [errorMeetings, setErrorMeetings] = useState(null);

  useEffect(() => {
    async function fetchMeetingHistory() {
      try {
        const response = await axios.get('http://localhost:5000/meeting-history');
        if (response.status === 200) {
          setMeetings(response.data);
          setLoadingMeetings(false);
        } else {
          setErrorMeetings('Failed to fetch meeting history');
          setLoadingMeetings(false);
        }
      } catch (error) {
        console.error('Error fetching meeting history:', error);
        setErrorMeetings('Failed to fetch meeting history');
        setLoadingMeetings(false);
      }
    }
    fetchMeetingHistory();
  }, []);

  const handleResponseSubmit = async (meetingId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/meetings/${meetingId}/respond`, { email: user.email });
      if (response.status === 200) {
        alert('Response submitted successfully');
        // Update local state to reflect the new response count
        setMeetings((prevMeetings) =>
          prevMeetings.map((meeting) =>
            meeting._id === meetingId ? { ...meeting, responses: meeting.responses + 1 } : meeting
          )
        );
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      if (error.response && error.response.data.message === 'User has already responded') {
        alert('You have already responded to this meeting');
      } else {
        alert('Failed to submit response');
      }
    }
  };

  return (
    <div className="meetings-container">
      {/* Top Bar */}
      <div className="topBar">
        <button className="home-btn" onClick={() => navigate("/mainpage")}>
          <img src={Home} alt="Home Icon" /> Home
        </button>
      </div>
      {/* Filters Section */}
      <div className="filters">
        <div className="leftSide">
          <div className="filters-searchBar">
            <img src={Search} alt="search-icon" />
            <input type="search" placeholder="Search..." />
          </div>
        </div>
        <div className="rightSide">
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
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>To</th>
              <th>Meeting Title</th>
              
              <th>Respond</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{meeting.date}</td>
                <td>{meeting.time}</td>
                <td>{meeting.venue}</td>
                <td>{meeting.to}</td>
                <td>{meeting.title}</td>
               
                <td>
                  <button className="respond-bttn"onClick={() => handleResponseSubmit(meeting._id)}>Respond</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Meetings;

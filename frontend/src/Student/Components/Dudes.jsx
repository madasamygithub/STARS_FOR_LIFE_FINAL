import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Dudes.css';
import Home from '../Assets/Home Icon.jpg';

function Dudes() {
  const navigate = useNavigate();
  const toggleButton = useRef();
  const [inDepartment, setInDepartment] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');

  useEffect(() => {
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setErrorMessage('Error fetching users');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  function handleHomeNavigation() {
    navigate('/mainpage');
  }

  function handleToggle() {
    if (inDepartment) {
      toggleButton.current.style.justifyContent = 'flex-end';
      setInDepartment(false);
    } else {
      toggleButton.current.style.justifyContent = 'flex-start';
      setInDepartment(true);
    }
  }

  function handleSearchByDistrict() {
    const filtered = users.filter(user => user.district.toLowerCase().includes(searchDistrict.toLowerCase()));
    setFilteredUsers(filtered);
  }

  function handleSearchByDepartment() {
    const filtered = users.filter(user => user.department.toLowerCase().includes(searchDepartment.toLowerCase()));
    setFilteredUsers(filtered);
  }

  return (
    <div className="dudes-container">
      <div className="topBar">
        <button className="home-btn" onClick={handleHomeNavigation}>
          <img src={Home} alt="home-icon" />
          Home
        </button>
      </div>

      <div className="filters">
        <div className="leftSide">
          <input
            type="text"
            placeholder="Search by District"
            value={searchDistrict}
            onChange={(e) => setSearchDistrict(e.target.value)}
          />
          <button onClick={handleSearchByDistrict}>Search District</button>
          <input
            type="text"
            placeholder="Search by Department"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
          />
          <button onClick={handleSearchByDepartment}>Search Department</button>
        </div>
       
      </div>

      <div className="student-details-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Reg No</th>
              <th>Year</th>
              <th>District</th>
              <th>Department</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.regno}</td>
                <td>{user.year}</td>
                <td>{user.district}</td>
                <td>{user.department}</td>
                <td>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <div className="table-filters">
     
      </div>
    </div>
  );
}

export default Dudes;

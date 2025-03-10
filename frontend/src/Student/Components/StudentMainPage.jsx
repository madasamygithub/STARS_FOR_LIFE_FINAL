import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../CSS/MainPage.css";
import Logo from "../Assets/Logo.png";
import Slider from "react-slick";
import { UserContext } from '../context/UserContext';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import FFCS1 from "../Assets/FFCS1.png";
import FFCS2 from "../Assets/FFCS2.png";
import Materials1 from "../Assets/Materials.png";
import Materials2 from "../Assets/Materials2.png";
import Events1 from "../Assets/Events1.png";
import Events2 from "../Assets/Events2.png";
import Others1 from "../Assets/Others1.png";
import Others2 from "../Assets/Others2.png";
import User from "../Assets/User.png";
import SI from "../Assets/Filter-SearchIcon.png";

import bottom from "../Assets/bottom.png";

import title from "../Assets/title.png";



function StudentMainPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userDropDown = useRef(null);
  const onCampus = useRef(null);
  const [isOnCampus, setIsOnCampus] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const [showButtonsDD, setShowButtonsDD] = useState(false);
  

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/achievements`);
      console.log('Response:', response.data); 
      setImages(response.data); 
    } catch (error) {
      console.error('Error fetching images:', error); 
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "black" : "white";
    document.body.style.color = isDarkMode ? "white" : "black";
  }, [isDarkMode]);
  function showDropDown(e) {
    if (e.target.hasAttribute("class", "links")) {
      const dropDown = e.target.children.item(2);
      dropDown.classList.toggle("show");
    }
  }

  function closeDropDown(e) {
    const dropDown = e.target;
    dropDown.classList.remove("show");
  }

  function showUserDropDown() {
    userDropDown.current.classList.toggle("show");
  }

  function handleOncampus(e) {
    setIsOnCampus(!isOnCampus);
    e.target.style.backgroundColor = isOnCampus ? "green" : "red";
  }

  function handleShowButtonDD() {
    setShowButtonsDD(!showButtonsDD);
  }

  function handleOnCampus() {
    setIsOnCampus(prevOnCampus => !prevOnCampus);
  }

  useEffect(() => {
    if (onCampus.current) {
      onCampus.current.style.backgroundColor = isOnCampus ? "green" : "red";
    }
  }, [isOnCampus]);

  function handleLogout() {
    navigate("/");
  }

  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    autoplay: true,
    autoplaySpeed: 3000, 
  };
  function handleShowButtonDD() {
    setShowButtonsDD(!showButtonsDD);
  }

  return (
    <div className="main-container">
      <div className="top-nav-bar">
        <div className="left">
          <div className="logo">
            <img src={Logo} alt="Logo" />
            
          </div>
          <h1>  STARS For Life</h1>
        </div>
        <div className="right">
          <div className="buttons">
            <div className="toggle-btn" onClick={() => setIsDarkMode(prevMode => !prevMode)}>
              <div className="btn"></div>
            </div>
          
            <button className="oncampus-btn btn" ref={onCampus} onClick={handleOnCampus}>
              {user.name}
            </button>
            <div className="down-btn" onClick={handleShowButtonDD}>
                ▼
              </div>
            <button className="queries-btn btn">
              <a href="mailto:mohamedzubair235@gmail.com">Queries</a>
            </button>
            <button className="logout-btn btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="shiningStar-container">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
              <img src={`${process.env.REACT_APP_BACKEND_URL}${img.imageUrl}`} alt={`achievement-${idx}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="placementInfo-container">
      <img src={title} alt="Logo" />
 
  <div className="text-image-container">
    
       <img src={bottom} text=" " alt="Logo" />
       <p>"A Child should never be deprived of quality education owing to poverty. This forceful thought in my mind became the seed that gave birth to the innovative STARS Scheme". – Dr.G.Viswanathan, Chancellor, VIT- Vellore</p>
  </div>
</div>

      <div className="side-nav-bar">
      <div className="top-items">
            {/* <div className="expansion-logo">➲</div> */}
            <div className="searchBar">
              <input type="search" />
              <img src={SI} alt="search-icon" />
            </div>
          </div>
        
        <hr />
        <div className="middle-items">
          <nav>
            <ul>
              <li className="links link1" onClick={showDropDown}>
                <img src={FFCS1} alt="FFCS-icon" />
                FFCS
                <img src={FFCS2} alt="FFCS-icon" />
                <ul className="dropDown hide" onMouseLeave={closeDropDown}>
                  <li>
                    <Link to="/ffcs/facultysuggestion">Faculty Review</Link>
                  </li>
                </ul>
              </li>
              <li className="links link2" onClick={showDropDown}>
                <img src={Materials1} alt="Materials-icon" />
                Materials
                <img src={Materials2} alt="Materials-icon" />
                <ul className="dropDown" onMouseLeave={closeDropDown}>
                  <li>
                    <Link to="/materials/btech">Question papers</Link>
                  </li>
                </ul>
              </li>
              <li className="links link3" onClick={showDropDown}>
                <span></span>Stars Coordinator<span></span>
                <ul className="dropDown" onMouseLeave={closeDropDown}>
                  <li>
                    <Link to="/sc/meetings">Meetings</Link>
                  </li>
                  <li>
                    <Link to="/sc/messages">Messages</Link>
                  </li>
                </ul>
              </li>
              <li className="links link4" onClick={showDropDown}>
                <img src={Events1} alt="Events-icon" />
                Events
                <img src={Events2} alt="Events-icon" />
                <ul className="dropDown" onMouseLeave={closeDropDown}>
                  <li>
                    <Link to="/events/archives">Starsday Archives</Link>
                  </li>
                </ul>
              </li>
              <li className="links link5" onClick={showDropDown}>
                <img src={Others1} alt="Others-icon" />
                GPA & CGPA
                <img src={Others2} alt="Others-icon" />
                <ul className="dropDown" onMouseLeave={closeDropDown}>
                  <li>
                    <Link to="/others/calculators">Calculators</Link>
                  </li>
                </ul>
              </li>
              <li className="links link6" onClick={showDropDown}>
                <img src={Others1} alt="Others-icon" />
                Dudes
                <img src={Others2} alt="Others-icon" />
                <ul className="dropDown" onMouseLeave={closeDropDown}>
                  <li>
                    <Link to="/others/dudes">Dudes</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <hr />
        <div className="bottom-items">
          <div className="user-profile">
            <img src={User} alt="user-icon" onClick={showUserDropDown} />
            <span></span>
            <ul className="userDropDown" ref={userDropDown}>
              <li>{user.name}</li>
              <li>
                <Link to="/profile/profilesettings">Profile Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMainPage;

import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/Logo-bgremoved.png";
import { MdAccountCircle } from "react-icons/md";

function Header(props) {
  const [loc, setLoc] = useState("Any");
  const [showOver, setshowOver] = useState(false);
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.handleClick && props.handleClick();
    }
  };

  const locations = [
    { placeName: "Any" },
    { placeName: "Boys Hostels" },
    { placeName: "Girls Hostels" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setshowOver(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header-container d-flex justify-content-between">
      <Link className="links" to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <div className="centered-container">
        <select
          className="custom-select"
          value={loc}
          onChange={(e) => {
            localStorage.setItem("userLoc", e.target.value);
            setLoc(e.target.value);
          }}
        >
          {locations.map((item, index) => (
            <option key={index} value={item.placeName}>
              {item.placeName}
            </option>
          ))}
        </select>
        <div className="search-container">
          <input
            className="search"
            type="text"
            value={props.search}
            onChange={(e) =>
              props.handlesearch && props.handlesearch(e.target.value)
            }
            onKeyPress={handleKeyPress}
          />
          <button
            className="search-btn"
            onClick={() => props.handleClick && props.handleClick()}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <div>
        <div
          onClick={() => setshowOver((prev) => !prev)}
          ref={iconRef}
        >
          <MdAccountCircle style={{ fontSize: '4.3em', color: '#002f34' }} />
        </div>

        {showOver && (
          <div
            ref={dropdownRef}
            style={{
              minHeight: "25px",
              width: "200px",
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: 1,
              marginTop: "50px",
              marginRight: "50px",
              color: "red",
              fontSize: "14px",
              background: "#002f34",
              borderRadius: "5px",
            }}
          >
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/add-product" className="dropdown-item">
                  ADD PRODUCT
                </Link>
              )}
            </div>
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/liked-products" className="dropdown-item">
                  FAVOURITES
                </Link>
              )}
            </div>
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/my-products" className="dropdown-item">
                  MY ADS
                </Link>
              )}
            </div>
            <div>
              {!localStorage.getItem("token") ? (
                <Link to="/login" className="dropdown-item">LOGIN</Link>
              ) : (
                <button
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./Home.css";
import API_URL from "../constants";

function LikedProducts() {
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [likedproducts, setlikedproducts] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleHover = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // useEffect(() => {
  //     if (!localStorage.getItem('token')) {
  //         navigate('/login')
  //     }
  // }, [])

  useEffect(() => {
    const url = API_URL + "/liked-products";
    let data = { userId: localStorage.getItem("userId") };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  }, [refresh]);

  const handlesearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      if (
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleLike = (productId) => {
    let userId = localStorage.getItem("userId");

    const url = API_URL + "/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert("Liked.");
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  const handleDisLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please Login first.");
      return;
    }

    const url = API_URL + "/dislike-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          // alert("Disliked.");
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        alert("Server Err. (dislike)");
      });
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div>
      <Header
        search={search}
        handlesearch={handlesearch}
        handleClick={handleClick}
      />
      <Categories handleCategory={handleCategory} />
      <h5 style={{ textAlign: "center", marginTop: "20px" }}>
        {" "}
        SEARCH RESULTS{" "}
      </h5>
      <div className="d-flex justify-content-center flex-wrap">
        {cproducts &&
          products.length > 0 &&
          cproducts.map((item, index) => {
            return (
              <div
                onClick={() => handleProduct(item._id)}
                key={item._id}
                className="card m-3"
                onMouseEnter={() => handleHover(index)} // Pass the index here
                onMouseLeave={handleMouseLeave}
              >
                <div className="icon-con">
                  <FaHeart
                    onClick={(e) => handleDisLike(item._id, e)}
                    className="red-icons"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{ objectFit: "cover" }}
                  width="250px"
                  height="180px"
                  src={
                    hoveredItem === index
                      ? API_URL + "/" + item.pimage2
                      : API_URL + "/" + item.pimage
                  }
                  alt={item.pname}
                />
                </div>
                <h3 className="m-2 price-text margin-adjust">
                  Rs. {item.price} /-
                </h3>
                <p className="m-2 margin-adjust">
                  {item.pname} | {item.category}
                </p>
                <p className="m-2 text-success margin-adjust">
                  {item.pdesc && item.pdesc.substring(0, 25)}
                  {item.pdesc && item.pdesc.length > 25 && "..."}
                </p>
              </div>
            );
          })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h5 style={{ marginRight: "10px", marginBottom: "0px" }}>
          ALL RESULTS
        </h5>
        <button
          style={{ marginRight: "10px", marginTop: "0px" }}
          className="clear-btn"
          onClick={() => navigate("/")}
        >
          GO BACK
        </button>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
        {products &&
          products.length > 0 &&
          products.map((item, index) => {
            return (
              <div
                onClick={() => handleProduct(item._id)}
                key={item._id}
                className="card m-3"
                onMouseEnter={() => handleHover(index)} // Pass the index here
                onMouseLeave={handleMouseLeave}
              >
                <div className="icon-con">
                  <FaHeart
                    onClick={(e) => handleDisLike(item._id, e)}
                    className="red-icons"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{ objectFit: "cover" }}
                  width="250px"
                  height="180px"
                  src={
                    hoveredItem === index
                      ? API_URL + "/" + item.pimage2
                      : API_URL + "/" + item.pimage
                  }
                  alt={item.pname}
                />
                </div>
                <h3 className="m-2 price-text margin-adjust">
                  Rs. {item.price} /-
                </h3>
                <p className="m-2 margin-adjust">
                  {item.pname} | {item.category}
                </p>
                <p className="m-2 text-success margin-adjust">
                  {item.pdesc && item.pdesc.substring(0, 25)}
                  {item.pdesc && item.pdesc.length > 25 && "..."}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LikedProducts;

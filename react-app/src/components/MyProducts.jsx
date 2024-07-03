import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./Home.css";
import "./MyProducts.css";
import API_URL from "../constants";

function MyProducts() {
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
    const url = API_URL + "/my-products";
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

    const url2 = API_URL + "/liked-products";
    let data2 = { userId: localStorage.getItem("userId") };
    axios
      .post(url2, data2)
      .then((res) => {
        if (res.data.products) {
          setlikedproducts(res.data.products);
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
      if (item.category === value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please Login first.");
      return;
    }

    const url = API_URL + "/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          // alert("Liked.");
          setrefresh(!refresh);
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

  const handleDel = (pid, e) => {
    e.stopPropagation();
    if (!localStorage.getItem("userId")) {
      alert("Please Login First");
      return;
    }
    const url = API_URL + "/delete-product";
    const data = {
      pid,
      userId: localStorage.getItem("userId"),
    };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          // alert("Deleted.");
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  return (
    <div>
      <Header
        search={search}
        handlesearch={handlesearch}
        handleClick={handleClick}
      />
      <Categories handleCategory={handleCategory} />

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
                  {likedproducts.find(
                    (likedItem) => likedItem._id === item._id
                  ) ? (
                    <FaHeart
                      onClick={(e) => handleDisLike(item._id, e)}
                      className="red-icons"
                    />
                  ) : (
                    <FaHeart
                      onClick={(e) => handleLike(item._id, e)}
                      className="icons"
                    />
                  )}
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

      <h5 style={{ textAlign: "center", marginTop: "20px" }}> ALL RESULTS </h5>

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
                  {likedproducts.find(
                    (likedItem) => likedItem._id === item._id
                  ) ? (
                    <FaHeart
                      onClick={(e) => handleDisLike(item._id, e)}
                      className="red-icons"
                    />
                  ) : (
                    <FaHeart
                      onClick={(e) => handleLike(item._id, e)}
                      className="icons"
                    />
                  )}
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
                <button
                  onClick={(e) => handleDel(item._id, e)}
                  className="btn btn-danger m-2"
                >
                  DELETE
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyProducts;

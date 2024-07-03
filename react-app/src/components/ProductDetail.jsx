import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import "./ProductDetail.css";

function ProductDetail() {
    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    const [showContact, setShowContact] = useState(false);
    const p = useParams();

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product);
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    }, [p.productId]);

    const handleContact = (addedBy) => {
        if (showContact) {
            setShowContact(false);
            setuser(null);
            return;
        }

        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user);
                    setShowContact(true);
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    };

    return (
        <>
            <Header />
            <div className="product-detail-container">
                <div className="product-detail-box">
                    {product && (
                        <div className="d-flex justify-content-between flex-wrap">
                            <div>
                                <img className="product-image" src={API_URL + '/' + product.pimage} alt="Product" />
                                {product.pimage2 && <img className="product-image" src={API_URL + '/' + product.pimage2} alt="Product" />}
                                <h6>Product Details:</h6>
                                <p className="product-description">{product.pdesc}</p>
                            </div>
                            <div>
                                <h3 className="text-black" style={{marginBottom:"0px"}}>{product.pname}</h3>
                                <p>{product.category}</p>
                                <h3 className="price-text">Rs. {product.price} /-</h3>
                                {product.addedBy && (
                                    <button className="contact-button" onClick={() => handleContact(product.addedBy)}>
                                        {showContact ? 'HIDE CONTACT DETAILS' : 'SHOW CONTACT DETAILS'}
                                    </button>
                                )}
                                {showContact && user && (
                                    <div className="contact-details">
                                        <h4>{user.username}</h4>
                                        <h5>{user.mobile}</h5>
                                        <h6>{user.email}</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductDetail;

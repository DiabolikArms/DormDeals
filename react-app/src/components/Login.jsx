import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import bcrypt from 'bcryptjs';
import "./Login.css"; // Import the CSS file

function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = async () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                const { message, token, userId } = res.data;
                if (message) {
                    if (token) {
                        localStorage.setItem('token', token);
                        localStorage.setItem('userId', userId);
                        navigate('/');
                    } else {
                        alert(message); 
                    }
                }
            })
            .catch((err) => {
                console.error('Server error:', err);
                alert('SERVER ERROR');  
            });
    }

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className="login-box">
                    <h3 className="mb-0">Welcome to Login Page</h3>
                    <br/>
                    <label>USERNAME</label>
                    <input className="form-control" type="text" value={username}
                        onChange={(e) => setusername(e.target.value)} />
                    <label>PASSWORD</label>
                    <input className="form-control" type="password" value={password}
                        onChange={(e) => setpassword(e.target.value)} />
                    <br/>
                    <button className="btn btn-primary mr-3 mt-0" onClick={handleApi}>LOGIN</button>
                    <Link className="m-3" to="/signup">SIGNUP</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;

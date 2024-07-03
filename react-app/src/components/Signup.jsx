import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import bcrypt from "bcryptjs";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');

    const handleApi = async () => {
        const url = API_URL + '/signup';
        const hashedPassword = await bcrypt.hash(password, 10); 
        const data = { username, password: hashedPassword, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    // Clear form inputs
                    setusername('');
                    setpassword('');
                    setemail('');
                    setmobile('');
                    // Navigate to login page
                    navigate('/login');
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            })
    }

    return (
        <div>
            <Header />
            <div className="signup-container">
                <div className="signup-box">
                    <h3 className="mb-0"> Welcome to Signup Page </h3>
                    <br />
                    <label>USERNAME</label>
                    <input className="form-control" type="text" value={username}
                        onChange={(e) => setusername(e.target.value)} />
                    <label>MOBILE</label>
                    <input className="form-control" type="text" value={mobile}
                        onChange={(e) => setmobile(e.target.value)} />
                    <label>EMAIL</label>
                    <input className="form-control" type="text" value={email}
                        onChange={(e) => setemail(e.target.value)} />
                    <label>PASSWORD</label>
                    <input className="form-control" type="password" value={password}
                        onChange={(e) => setpassword(e.target.value)} />
                    <br />
                    <button className="btn btn-primary mr-3 mt-0" onClick={handleApi}> SIGNUP </button>
                    <Link className="m-3" to="/login">LOGIN</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;

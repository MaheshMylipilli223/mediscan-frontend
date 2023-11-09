import React from "react";
import { Link } from "react-router-dom";
import './HeroImg.css'; // Import your CSS file here

const HeroImg = () => {
    return (
        <div className="hero">
            <div className="content">
                <h1 id="thetitle">MEDI-SCAN</h1>
                <p>"Empowering patients with convenience, care, and compassion – saving time, healing hearts."</p>
                <h3>-bytebots</h3>
                <br></br>
                <br></br>
                <div>
                    <Link to="/login-pat" className="btn">PATIENT</Link>
                    <Link to="/login-dia" className="btn btn-light">DIAGNOSIS CENTRE</Link>
                </div>
            </div>
            <div className="mask">
                <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" alt="Background" />
            </div>
        </div>
    );
}

export default HeroImg;

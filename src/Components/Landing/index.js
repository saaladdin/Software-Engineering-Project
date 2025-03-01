import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss"

const Landing = () => {
    const navigate = useNavigate();
    useEffect(() =>{
        navigate("/login");
    }, [navigate]);
    return(
        <div className="landing">
            Landing
        </div>
    );
}

export default Landing;
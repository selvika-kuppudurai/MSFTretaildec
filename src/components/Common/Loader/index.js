import React from "react";
import Loader from "react-loader-spinner";
import "./style.scss"

const MyLoader = () => {
    return (
        <div className="loader">
            <Loader
                type="Bars"
                color="#00BFFF"
                height={80}
                width={80}
                timeout={3000} //3 secs
                className={"d-flex justify-content-center align-items-center"}
            />
        </div >
    )
}

export default MyLoader;
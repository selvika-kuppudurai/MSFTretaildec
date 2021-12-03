import React, { Component } from "react";
import loaderImg from "../../../assets/images/Spinner-5.gif"
import "./sytle.scss"

class PageLoader extends Component {
    state = {
        loading: true
    };
    render() {
        const { loading } = this.state

        if (!loading) return null;

        return (
            <div className="loader-container">
                <div className="loader">
                    <img src={loaderImg}></img>
                </div>
            </div>
        );
    }
}


export default PageLoader;
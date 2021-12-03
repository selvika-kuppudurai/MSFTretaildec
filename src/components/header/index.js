import React, { useState } from "react";
import Logo from "../../assets/images/Microsoft-Logo-new.png"
import { useHistory } from 'react-router-dom';
import authentication from 'react-azure-b2c';
import logo_mobile from '../../assets/images/Microsoft_logo.png'


// icons

import { AiOutlineUser } from "react-icons/ai"
import { IoIosArrowDown } from 'react-icons/io'

import { Popover } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Redirect } from 'react-router'

import Navigation from "../Navigation";


const Header = ({ userDetails }) => {
    
const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
    const history = useHistory();
    console.log('url', window.location.href.split('/')[3] === '')
    const [selectedsummaryvalues, setselectedvaluesforsummary] = useState(false)
    const [selecteddeepdivevalues, setselectedvaluesfordeepdive] = useState(false)
    const [selectedManagevalues, setselectedvaluesformanage] = useState(false)
    const [selectedactivityvalues, setselectedactivityvalues] = useState(false)
    // const [selectedvalues, setselectedvalues] =useState('summary')
    //     let history = useHistory();

    //   function handleClick() {
    //     history.push("/deepdive");
    //   }
    const [navigationLinks] = useState([{ link: "Summary", to: "/summary" }, { link: "Deepdive", to: "/deepdive" }])


    const [visible, setVisible] = useState(false)


    const handleVisibleChange = () => {
        setVisible(!visible)
    }

    const setselectedvalues = (res) => {
        console.log('hhh', res)
        
        if(res === 'summary'){
            history.push("/");
        } else {
            history.push("/deepdive");
        }
    }

    const logOutuser = () => {
        sessionStorage.clear("userDetails")
        authentication.signOut()
    }

    const deepdiveselected = () => {
        setselectedvaluesfordeepdive(true)
        setselectedvaluesforsummary(false)
        setselectedvaluesformanage(false)
        setselectedactivityvalues(false)
    }
    const summaryselected = () => {
        setselectedvaluesforsummary(true)
        setselectedvaluesfordeepdive(false)
        setselectedvaluesformanage(false)
        setselectedactivityvalues(false)
    }
    const manageselected = () => {
        setselectedvaluesformanage(true)
        setselectedvaluesforsummary(false)
        setselectedvaluesfordeepdive(false)
        setselectedactivityvalues(false)
    }

    const activityselected = () => {
        setselectedvaluesformanage(false)
        setselectedvaluesforsummary(false)
        setselectedvaluesfordeepdive(false)
        setselectedactivityvalues(true)
    }

    const handleChange = (event) => {
        if(event.target.value === 'summary'){
            history.push("/");
        } else {
            history.push("/deepdive");
        }

    };



    return (

        

        <header className="header container-xl">
            <div className="headerdesign_boxshadow container-xl">
                <div className="d-flex justify-content-between col-lg-12 col-sm-12 col-md-12 pl-md-0 pl-lg-0 pl-sm-0 mobileview_fontsize">

                    {/* <div className="d-flex align-items-center d-lg-flex d-sm-flex d-md-flex col-lg-8 col-md-8 col-sm-8"> */}
                    {window.innerWidth > 600 ?  <div className="d-flex align-items-center d-lg-flex d-sm-flex d-md-flex col-lg-9 col-md-9 col-sm-9 p-md-0 p-sm-0"> 
                    <img src={Logo} alt="logo" className="header__logo" />
                        
                        <div className="header__retail col-lg-3 col-md-4 col-sm-4">
                            <p className="mb-0 fontsize">In Store Experience</p>
                        </div>
                        <div className="headerdesignfortabs mt-lg-1 cursor-pointer d-lg-flex d-sm-flex d-md-flex">
                            <Link to="/" onClick={() => summaryselected()} className="col-lg-5 col-md-5 col-sm-5 mobileresponsive"><p className={!selectedsummaryvalues ? window.location.href.split('/')[3] === '' ? "selecteddesign" : "hoverdesign" : "selecteddesign"}>Summary</p></Link>
                            <Link to="/deepdive" onClick={() => deepdiveselected()} className="col-lg-5 col-md-5 col-sm-5 mobileresponsive"><p className={!selecteddeepdivevalues ? window.location.href.split('/')[3] === 'deepdive' ? "selecteddesign" : "hoverdesign" : "selecteddesign"}>Deep Dive</p></Link>
                            {userDetails && userDetails.role === "Admin" && <Link to="/Manage" onClick={() => manageselected()} className="col-sm-5 col-lg-5 col-md-5 mobileresponsive"><p className={!selectedManagevalues ? window.location.href.split('/')[3] === 'Manage' ? "selecteddesign" : "hoverdesign" : "selecteddesign"}>Manage</p></Link>}
                            {userDetails && userDetails.role !== "Admin" && <Link to="/activitytrack" onClick={() => activityselected()} className="col-sm-5 col-lg-5 col-md-5 mobileresponsive"><p className={!selectedactivityvalues ? window.location.href.split('/')[3] === 'activitytrack' ? "selecteddesign" : "hoverdesign" : "selecteddesign"}>Activity</p></Link>}
                        </div>
                        </div>
:<div className="d-flex"><img src={logo_mobile} alt="logo" className="header__logo" />
                        
<div className="header__retail__mobileview">
    <h2 className="mb-0 fontsize">In Store Experience</h2>
</div></div>}
                        

                        {/* <button type="button" onClick={handleClick}>
      Go home
    </button> */}
                        {/* <NavLink activeClassName="Summary" to="/summary">About</NavLink> */}
                    {/* </div> */}


                    {/* <div className="col-6">
                    <Navigation navigationLinks={navigationLinks} />
                    </div> */}
                    <div className="d-flex justify-content-end  d-lg-flex d-sm-flex d-md-flex col-lg-3 col-md-3 col-sm-3 paddingnone margintop-2 ml-4">
                        {/* <IoSettingsOutline size="30" className="icon__clr cursor-pointer" /> */}
                        <AiOutlineUser size="20" className="icon__clr_user cursor-pointer" />
                        <div>
                            <Popover
                                placement="bottomRight"
                                overlayClassName="language-selector"
                                content={
                                    <>
                                        <ul className='language-list cursor-pointer'>
                                            <li onClick={() => logOutuser()}>Logout</li>

                                        </ul>
                                    </>}
                                trigger="click"
                                visible={visible}
                                onVisibleChange={handleVisibleChange}
                            >
                                <div className="d-flex  cursor-pointer user__details  w-100" id="container">
                                    <h3 className="mb-0 user__detail"> {`Welcome ${userDetails && userDetails.name}`}
                                        <div className="d-flex user__detail justify-content-end mt-1">{userDetails && userDetails.role}</div>
                                    </h3>

                                    <IoIosArrowDown size="20" className="icon__clr ml-3 d-flex justify-content-center align-items-center" />

                                </div>




                            </Popover>

                        </div>
                    </div>
                </div>

            </div>

        </header>

    )
}

const mapStateToProps = (state) => {

    return {
        userDetails: state.user.userDetails
    }
}

export default connect(mapStateToProps)(Header);
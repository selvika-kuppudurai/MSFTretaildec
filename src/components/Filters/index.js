import React, { useState, useEffect } from "react";
import { NormalSelect } from "../Common/NormalSelect"
import { endPoints } from "../../config/Api";
import axios from "axios"
import { connect } from "react-redux"
import { BiEraser } from "react-icons/bi"



const Filters = ({ sendData, dispatch }) => {
    //     formFields = {
    //         Region: '',
    //         Model: '',
    //         Country: '',
    //         Retailer: '',
    //         State:'',
    // }
    const [formFields, setFormFields] = useState([])
    // const []
    const [summaryDataforwholefilter, setsummaryDataforwholefilter] = useState([])
    // const [summaryDataforCountry, setsummaryDataforCountry] = useState([])
    // const [summaryDataforstate, setsummaryDataforState] = useState([])
    // const [summaryDataforcity, setsummaryDataforcity] = useState([])
    const [getsummarydataforcountry, setsummaryDataforCountry] = useState([])
    const [getsummarydataforRetail, setsummaryDataforRetail] = useState([])
    const [getsummarydataforState, setsummaryDataforState] = useState([])
    const [getsummarydataforCity, setsummaryDataforCity] = useState([])
    const [getsummarydataforGLID, setsummaryDataforGLID] = useState([])
    const [getsummarydataforAssettagID, setsummaryDataforAssettagID] = useState([])
    useEffect(() => {
        testing()
    }, [])


    const testing = () => {
        const url = endPoints.dropdowndata.dropdownlistapi

        axios.get(url).then((res) => {
            dispatch({ type: "STORE_LATLANG", payload: [] })
            setsummaryDataforwholefilter(res.data)
        })
    }



    const handleChange = (data, name) => {
        formFields[name] = data
        setFormFields(formFields)
        sendData(formFields)


        dispatch({ type: "STORE_LATLANG", payload: [] })

        if (name === 'Region') {
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    // sendData(res.data);   
                })
            } else {
                // const Regionfilter = formFields[name][formFields[name].length - 1]
                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
            // console.log('country length', Object.keys(summaryDataforCountry).length)
        } else if (name === 'Country') {  // country depend  on Region
            if (formFields[name].length > 0) {


                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
        } else if (name === 'State') {  // State depend  on Retailer,Country,Region
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?State_Province=${formFields[name]}`
                axios.get(url).then((res) => {
                    // setsummaryDataforState(res.data.state);
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })

            }

            else {
                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
        } else if (name === 'Retailer') { // Retailer depend  on Country,Region
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })

            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
        } else if (name === 'City') { // City depend  on State,Retailer,Country,Region
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?City=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
                // console.log('city length', Object.keys(summaryDataforcity).length)
            } else {
                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
        } else if (name === 'Glid') { // Glid depend  on City,State,Retailer,Country,Region
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?Glid=${formFields[name]}`
                axios.get(url).then((res) => {

                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);

                    setsummaryDataforAssettagID(res.data.assetTagid);
                })

            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
        } else if (name === 'Assetid') { // Assetid depend  on Glid, City,State,Retailer,Country,Region
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?AssetTagID=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    // setsummaryDataforAssettagID(res.data.assetTagid);
                })

            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })
            }
        }
    }
    return (
        <div className="filter d-flex mt-4 pt-4 col-12">

            <div className="filter__width">
                <div className='dropdowndesign'>
                    <label>Program Model</label>

                    <NormalSelect options={Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.model : summaryDataforwholefilter.model} handleChange={(data) => handleChange(data, "Model")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Region</label>

                    <NormalSelect options={Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.region : summaryDataforwholefilter.region} value={summaryDataforwholefilter.region} handleChange={(data) => handleChange(data, "Region")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Country</label>


                    <NormalSelect options={Object.keys(getsummarydataforcountry).length > 0 ? getsummarydataforcountry : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.country : summaryDataforwholefilter.country} val='country' handleChange={(data) => handleChange(data, "Country")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Retailer</label>

                    <NormalSelect options={Object.keys(getsummarydataforRetail).length > 0 ? getsummarydataforRetail : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.retailer : summaryDataforwholefilter.retailer} handleChange={(data) => handleChange(data, "Retailer")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>State</label>

                    <NormalSelect options={Object.keys(getsummarydataforState).length > 0 ? getsummarydataforState : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.state : summaryDataforwholefilter.state} handleChange={(data) => handleChange(data, "State")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>City</label>

                    <NormalSelect options={Object.keys(getsummarydataforCity).length > 0 ? getsummarydataforCity : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.city : summaryDataforwholefilter.city} handleChange={(data) => handleChange(data, "City")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Global ID</label>
                    <NormalSelect options={Object.keys(getsummarydataforGLID).length > 0 ? getsummarydataforGLID : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.glid : summaryDataforwholefilter.glid} handleChange={(data) => handleChange(data, "Glid")} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Asset ID</label>

                    <NormalSelect options={Object.keys(getsummarydataforAssettagID).length > 0 ? getsummarydataforAssettagID : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.assetTagid : summaryDataforwholefilter.assetTagid} handleChange={(data) => handleChange(data, "Assetid")} />
                </div>
            </div>
        </div>
    )
}

export default connect(null)(Filters);
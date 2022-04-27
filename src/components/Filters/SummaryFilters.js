import React, { useState, useEffect } from "react";
import { NormalSelect } from "../Common/NormalSelect"
import { endPoints } from "../../config/Api";
import axios from "axios"
import { connect } from "react-redux"
import { BiEraser } from "react-icons/bi"

const summaryFilter = {
    model: [],
    region: [],
    country: [],
    retailer: [],
    state: [],
    city: [],
    glid: [],
    assetid: []
}



const SummaryFilters = ({ sendData, summaryFilter, dispatch }) => {

    const [formFields, setFormFields] = useState([])

    const [summaryDataforwholefilter, setsummaryDataforwholefilter] = useState([])

    const [getsummarydataforregion, setsummaryDataforRegion] = useState([])
    const [getsummarydataforcountry, setsummaryDataforCountry] = useState([])
    const [getsummarydataforRetail, setsummaryDataforRetail] = useState([])
    const [getsummarydataforState, setsummaryDataforState] = useState([])
    const [getsummarydataforCity, setsummaryDataforCity] = useState([])
    const [getsummarydataforGLID, setsummaryDataforGLID] = useState([])
    const [getsummarydataforStatus, setsummaryDataforStatus] = useState([])
    const [getsummarydataforAssettagID, setsummaryDataforAssettagID] = useState([])




    useEffect(() => {

        if (sessionStorage.getItem("summaryFilter")) {
            let filterSessionData = JSON.parse(sessionStorage.getItem("summaryFilter"))

            console.log("sessiondata", Object.values(filterSessionData).some(d => d.length))

            formFields.Model = filterSessionData.Model
            formFields.Region = filterSessionData.Region
            formFields.Country = filterSessionData.Country
            formFields.Retailer = filterSessionData.Retailer
            formFields.State = filterSessionData.State
            formFields.City = filterSessionData.City
            formFields.Glid = filterSessionData.Glid
            formFields.Assetid = filterSessionData.Assetid
            formFields.Status = filterSessionData.Status

            setFormFields(formFields)


            if (filterSessionData.hasOwnProperty("Status") && filterSessionData.Status.length > 0) {
                handleChange(filterSessionData.Status, "Status")
                recallDropdown("Status")
                return
            }


            if (filterSessionData.hasOwnProperty("Assetid") && filterSessionData.Assetid.length > 0) {
                handleChange(filterSessionData.Assetid, "Assetid")
                recallDropdown("Assetid")
                return
            }


            if (filterSessionData.hasOwnProperty("Glid") && filterSessionData.Glid.length > 0) {
                handleChange(filterSessionData.Glid, "Glid")
                recallDropdown("Glid")
                return
            }

            if (filterSessionData.hasOwnProperty("City") && filterSessionData.City.length > 0) {
                handleChange(filterSessionData.City, "City")
                recallDropdown("City")
                return
            }

            if (filterSessionData.hasOwnProperty("State") && filterSessionData.State.length > 0) {
                handleChange(filterSessionData.State, "State")
                recallDropdown("State")
                return
            }



            if (filterSessionData.hasOwnProperty("Retailer") && filterSessionData.Retailer.length > 0) {
                handleChange(filterSessionData.Retailer, "Retailer")
                recallDropdown("Retailer")
                return
            }

            if (filterSessionData.hasOwnProperty("Country") && filterSessionData.Country.length > 0) {

                handleChange(filterSessionData.Country, "Country")
                recallDropdown("Country")

                return
            }

            if (filterSessionData.hasOwnProperty("Region") && filterSessionData.Region.length > 0) {
                handleChange(filterSessionData.Region, "Region")
                recallDropdown("Region")
                return
            }


            if (!Object.values(filterSessionData).some(d => d.length)) {
                dropdownList()
            }



            sendData(filterSessionData)

        } else {
            dropdownList()
        }

    }, [])

    // get triggred while come from deepdive page
    const recallDropdown = (name) => {
        const url = endPoints.dropdowndata.dropdownlistapi

        axios.get(url).then((res) => {

            if (name === "Status") {
                setsummaryDataforStatus(res.data.status)
            }

            if (name === "Assetid") {
                setsummaryDataforAssettagID(res.data.assetTagid)
            }

            if (name === "Glid") {
                setsummaryDataforGLID(res.data.glid)
            }

            if (name === "City") {
                setsummaryDataforCity(res.data.city)
            }

            if (name === "State") {
                setsummaryDataforState(res.data.state)
            }

            if (name === "Retailer") {
                setsummaryDataforRetail(res.data.retailer)
            }

            if (name === "Country") {
                setsummaryDataforCountry(res.data.country)
            }

            if (name === "Region") {
                setsummaryDataforRegion(res.data.region)
            }


        })
    }

    const dropdownList = () => {
        const url = endPoints.dropdowndata.dropdownlistapi

        axios.get(url).then((res) => {
            dispatch({ type: "STORE_LATLANG", payload: [] })
            dispatch({ type: "STORE_MODEL", payload: res.data.model })
            setsummaryDataforwholefilter(res.data)
        })
    }

    const handleChange = (data, name) => {
        console.log('name', name)
        formFields[name] = data
        setFormFields(formFields)
        console.log('ssssssssssss',formFields)

        let chosenFilters = {
            ...formFields,
            [name]: data
        }

        sessionStorage.setItem("summaryFilter", JSON.stringify(chosenFilters))


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
                    setsummaryDataforStatus(res.data.status)
                    // sendData(res.data);   
                })
            } else {
                // const Regionfilter = formFields[name][formFields[name].length - 1]
                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
            // console.log('country length', Object.keys(summaryDataforCountry).length)
        } else if (name === 'Country') {  // country depend  on Region
            console.log('inside country')
            if (formFields[name].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else if (formFields["Region"] !== undefined && formFields["Region"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforCountry(res.data.country);

                    setsummaryDataforRetail(res.data.retailer);

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
        } else if (name === 'State') {  // State depend  on Retailer,Country,Region
            if (formFields[name].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?State_Province=${formFields[name]}`
                axios.get(url).then((res) => {
                    // setsummaryDataforState(res.data.state);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })

            } else if (formFields["Retailer"] !== undefined && formFields["Retailer"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields["Retailer"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforRegion(res.data.region)

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            }
            else if (formFields["Country"] !== undefined && formFields["Country"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields["Country"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforRegion(res.data.region)

                    setsummaryDataforRetail(res.data.retailer);

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields["Region"] !== undefined && formFields["Region"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforState(res.data.state);

                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforCountry(res.data.country);

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            }
            else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
        } else if (name === 'Retailer') { // Retailer depend  on Country,Region
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })

            } else if (formFields["Country"] !== undefined && formFields["Country"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields["Country"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else if (formFields["Region"] !== undefined && formFields["Region"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
        } else if (name === 'City') { // City depend  on State,Retailer,Country,Region
            console.log("cityfields", formFields["State"])
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?City=${formFields[name]}`
                axios.get(url).then((res) => {
                    // setsummaryDataforState(res.data.state);
                    // setsummaryDataforCity(res.data.city);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
                // console.log('city length', Object.keys(summaryDataforcity).length)
            } else if (formFields["State"] !== undefined && formFields["State"].length > 0) {

                console.log("formFields", formFields["State"])
                const url = endPoints.dropdowndata.dropdownlistapi + `?State_Province=${formFields["State"]}`
                axios.get(url).then((res) => {

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforRetail(res.data.retailer)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields["Retailer"] !== undefined && formFields["Retailer"].length > 0) {

                console.log("formFields", formFields["Retailer"])
                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields["Retailer"]}`
                axios.get(url).then((res) => {

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields["Country"] !== undefined && formFields["Country"].length > 0) {

                console.log("formFields", formFields["Country"])
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields["Country"]}`
                axios.get(url).then((res) => {

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforRetail(res.data.retailer)
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields["Region"] !== undefined && formFields["Region"].length > 0) {

                console.log("formFields", formFields["Region"])
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                axios.get(url).then((res) => {

                    setsummaryDataforCity(res.data.city);

                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else {
                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
        } else if (name === 'Glid') { // Glid depend  on City,State,Retailer,Country,Region
            if (formFields[name].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Glid=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);

                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })

            } else if (formFields['City'] !== undefined && formFields["City"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?City=${formFields["City"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else if (formFields['State'] !== undefined && formFields["State"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?State_Province=${formFields["State"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforCity(res.data.city);

                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else if (formFields['Retailer'] !== undefined && formFields["Retailer"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields["Retailer"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);

                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else if (formFields['Country'] !== undefined && formFields["Country"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields["Country"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforRegion(res.data.region)

                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else if (formFields['Region'] !== undefined && formFields["Region"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforGLID(res.data.glid);

                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
        } else if (name === 'Assetid') { // Assetid depend  on Glid, City,State,Retailer,Country,Region
            if (formFields[name].length > 0) {

                // Do nothing
                const url = endPoints.dropdowndata.dropdownlistapi + `?Assetid=${formFields["Assetid"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)
                })

            } else if (formFields["Glid"] !== undefined && formFields["Glid"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Glid=${formFields["Glid"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforRetail(res.data.retailer)
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['City'] !== undefined && formFields["City"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?City=${formFields["City"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['State'] !== undefined && formFields["State"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?State_Province=${formFields["State"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['Retailer'] !== undefined && formFields["Retailer"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields["Retailer"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['Country'] !== undefined && formFields["Country"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields["Country"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['Region'] !== undefined && formFields["Region"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                // const url = endPoints.dropdowndata.dropdownlistapi + `?AssetTagID=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)
                    // setsummaryDataforAssettagID(res.data.assetTagid);
                })

            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }
        } else if (name === "Status") {
            if (formFields[name].length > 0) {

                const url = endPoints.dropdowndata.dropdownlistapi + `?Status=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    // setsummaryDataforStatus  (res.data.status)
                    setsummaryDataforAssettagID(res.data.assetTagid);
                })

            } else if (formFields["Assetid"] !== undefined && formFields["Assetid"].length > 0) { // Assetid depend  on Glid, City,State,Retailer,Country,Region


                // Do nothing
                const url = endPoints.dropdowndata.dropdownlistapi + `?Assetid=${formFields["Assetid"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)
                })

            } else if (formFields["Glid"] !== undefined && formFields["Glid"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Glid=${formFields["Glid"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforRetail(res.data.retailer)
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['City'] !== undefined && formFields["City"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?City=${formFields["City"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['State'] !== undefined && formFields["State"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?State_Province=${formFields["State"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['Retailer'] !== undefined && formFields["Retailer"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Retailer=${formFields["Retailer"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['Country'] !== undefined && formFields["Country"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Country=${formFields["Country"]}`
                axios.get(url).then((res) => {
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforRetail(res.data.retailer)

                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)

                })
            } else if (formFields['Region'] !== undefined && formFields["Region"].length > 0) {
                const url = endPoints.dropdowndata.dropdownlistapi + `?Region=${formFields["Region"]}`
                // const url = endPoints.dropdowndata.dropdownlistapi + `?AssetTagID=${formFields[name]}`
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforStatus(res.data.status)
                    // setsummaryDataforAssettagID(res.data.assetTagid);
                })

            } else {

                const url = endPoints.dropdowndata.dropdownlistapi
                axios.get(url).then((res) => {
                    setsummaryDataforRegion(res.data.region)
                    setsummaryDataforCountry(res.data.country);
                    setsummaryDataforRetail(res.data.retailer);
                    setsummaryDataforState(res.data.state);
                    setsummaryDataforCity(res.data.city);
                    setsummaryDataforGLID(res.data.glid);
                    setsummaryDataforAssettagID(res.data.assetTagid);
                    setsummaryDataforStatus(res.data.status)
                })
            }

        }
    }




    return (
        <div className="filter d-flex mt-4 pt-4 col-lg-12 col-sm-12 col-md-12">

            <div className="filter__width">
                <div className='dropdowndesign'>
                    <label>Program Model</label>

                    {/* <NormalSelect options={Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.model : summaryDataforwholefilter.model} handleChange={(data) => handleChange(data, "Model")} /> */}


                    <NormalSelect options={summaryFilter && summaryFilter.model} handleChange={(data) => handleChange(data, "Model")} values={formFields.Model} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Region</label>

                    <NormalSelect options={Object.keys(getsummarydataforregion).length > 0 ? getsummarydataforregion : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.region : summaryDataforwholefilter.region} value={summaryDataforwholefilter.region} handleChange={(data) => handleChange(data, "Region")} values={formFields.Region} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Country </label>


                    <NormalSelect options={Object.keys(getsummarydataforcountry).length > 0 ? getsummarydataforcountry : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.country : summaryDataforwholefilter.country} handleChange={(data) => handleChange(data, "Country")} values={formFields.Country} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Retailer</label>

                    <NormalSelect options={Object.keys(getsummarydataforRetail).length > 0 ? getsummarydataforRetail : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.retailer : summaryDataforwholefilter.retailer} handleChange={(data) => handleChange(data, "Retailer")} values={formFields.Retailer} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>State</label>

                    <NormalSelect options={Object.keys(getsummarydataforState).length > 0 ? getsummarydataforState : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.state : summaryDataforwholefilter.state} handleChange={(data) => handleChange(data, "State")} values={formFields.State} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>City</label>

                    <NormalSelect options={Object.keys(getsummarydataforCity).length > 0 ? getsummarydataforCity : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.city : summaryDataforwholefilter.city} handleChange={(data) => handleChange(data, "City")} values={formFields.City} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Global ID</label>
                    <NormalSelect options={Object.keys(getsummarydataforGLID).length > 0 ? getsummarydataforGLID : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.glid : summaryDataforwholefilter.glid} handleChange={(data) => handleChange(data, "Glid")} values={formFields.Glid} />
                </div>
            </div>

            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Asset ID</label>

                    <NormalSelect options={Object.keys(getsummarydataforAssettagID).length > 0 ? getsummarydataforAssettagID : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.assetTagid : summaryDataforwholefilter.assetTagid} handleChange={(data) => handleChange(data, "Assetid")} values={formFields.Assetid} />
                </div>
            </div>
            <div className="filter__width">

                <div className='dropdowndesign'>
                    <label>Status</label>

                    <NormalSelect options={Object.keys(getsummarydataforStatus).length > 0 ? getsummarydataforStatus : Object.keys(summaryDataforwholefilter).length > 0 ? summaryDataforwholefilter.status : summaryDataforwholefilter.status} handleChange={(data) => handleChange(data, "Status")} values={formFields.Status} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        summaryFilter: state.summaryFilter
    }
}

export default connect(mapStateToProps)(SummaryFilters);
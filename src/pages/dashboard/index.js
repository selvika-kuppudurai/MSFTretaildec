import React, { useState, useEffect } from "react";
import DashboardCard from "../../components/DashboardCard";
import Filters from "../../components/Filters";
import StoreMap from "../../components/StoreMap";
import ChartsComponent from "../../components/Chartcomponentsummary";
import { endPoints } from "../../config/Api";
import axios from "axios";
import { connect } from "react-redux";
import SummaryFilters from "../../components/Filters/SummaryFilters";
import { DialogueboxLoading } from '../../components/Common/loaddialoguebox';
import PageLoader from "../../components/Common/PageLoader";




const Dashboard = ({ dispatch }) => {

    const [dialogueopenandclose, setdialogueopenandclose] = useState(true)

    const sendData = (data) => {
        console.log(Object.values(data))



        let g = JSON.parse(sessionStorage.getItem('summaryFilter'))
        console.log(g)

        if (Object.values(g).some(({ length }) => length)) {

            // console.log('hdhd')
            testing2(g, false)

        } else {
            // console.log('gfgf')

            testing2({}, false)

        }
    }

    // if (Object.values(data).some(({ length }) => length)) {
    //     // console.log(length)
    //     testing2(data)

    // } else {
    //     testing2({})
    // }




    const [summaryData, setTableDatafordashboard] = useState([])
    const [filterMob, setFilterMob] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (!sessionStorage.getItem("summaryFilter")) {
            console.log('vcvcvc')
            testing2({}, true)
        }
    }, [])

    const testing2 = (filtervalues, loadervalue) => {

        if (Object.keys(filtervalues).length === 0) {
            console.log(loadervalue)
            setdialogueopenandclose(loadervalue)
            const url = endPoints.summary.table_Data_summary + `?Model=All&Region=All&Country=All&Retailer=All&State=All&City=All&GLID=All&AssetTagID=All&Status=All`
            axios.get(url).then((res) => {
                setdialogueopenandclose(false)
                dispatch({ type: "STORE_LATLANG", payload: [] })

                setTableDatafordashboard(res.data)

                if (res.data.map_details) {
                    dispatch({ type: "STORE_LATLANG", payload: res.data.map_details })
                }
            })
        } else {
            let filterModel = []
            let filterRegion = []
            let filterCountry = []
            let filterRetailer = []
            let filterState = []
            let filterCity = []
            let filterGLID = []
            let filterAssetTagID = []
            let filterStatus = []
            console.log(filtervalues)
            if (Object.keys(filtervalues).includes('Model')) {
                console.log(filtervalues)
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Model.length === 0) {
                    filterModel = 'All'
                } else {
                    filterModel = filtervalues.Model

                }
            }
            else {
                filterModel = 'All'
            }
            if (Object.keys(filtervalues).includes('Region')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Region.length === 0) {
                    filterRegion = 'All'
                } else {
                    filterRegion = filtervalues.Region
                }
            } else {
                filterRegion = 'All'
            }
            if (Object.keys(filtervalues).includes('Country')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Country.length === 0) {
                    filterCountry = 'All'
                } else {
                    filterCountry = filtervalues.Country
                }
            } else {
                filterCountry = 'All'
            }
            if (Object.keys(filtervalues).includes('Retailer')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Retailer.length === 0) {
                    filterRetailer = 'All'
                } else {
                    filterRetailer = filtervalues.Retailer
                }
            } else { filterRetailer = 'All' }
            if (Object.keys(filtervalues).includes('State')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.State.length === 0) {
                    filterState = 'All'
                } else {
                    filterState = filtervalues.State
                }
            } else { filterState = 'All' }

            if (Object.keys(filtervalues).includes('City')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.City.length === 0) {
                    filterCity = 'All'
                } else {
                    filterCity = filtervalues.City
                }
            } else { filterCity = 'All' }

            if (Object.keys(filtervalues).includes('Glid')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Glid.length === 0) {
                    filterGLID = 'All'
                } else {
                    filterGLID = filtervalues.Glid
                }
            } else { filterGLID = 'All' }
            if (Object.keys(filtervalues).includes('Assetid')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Assetid.length === 0) {
                    filterAssetTagID = 'All'
                } else {
                    filterAssetTagID = filtervalues.Assetid
                }
            } else { filterAssetTagID = 'All' }
            if (Object.keys(filtervalues).includes('Status')) {
                dispatch({ type: "STORE_LATLANG", payload: [] })
                if (filtervalues.Status.length === 0) {
                    filterStatus = 'All'
                } else {
                    filterStatus = filtervalues.Status
                }
            } else { filterStatus = 'All' }


            const url = endPoints.summary.table_Data_summary + `?Model=${filterModel}&Region=${filterRegion}&Country=${filterCountry}&Retailer=${filterRetailer}&State=${filterState}&City=${filterCity}&GLID=${filterGLID}&AssetTagID=${filterAssetTagID}&Status=${filterStatus}`

            // // const url = endPoints.summary.table_Data_summary + `?Model=Surface&Region=EMEA&Country=All&Retailer=All&State=All&City=All&GLID=All&AssetTagID=All`
            axios.get(url).then((res) => {


                setTableDatafordashboard(res.data)
                setdialogueopenandclose(false)

                if (res.data.map_details) {

                    dispatch({ type: "STORE_LATLANG", payload: res.data.map_details })
                }
            })
        }
    }

    console.log(summaryData)
    return (
        <div className="mt-4">
            {/* <Filters sendData={data => sendData(data)} /> */}

            {/* <PageLoader /> */}

            {window.innerWidth < 600 && <div className="d-flex ml-3 mt-3 asset__link">
                <a onClick={() => setFilterMob(!filterMob)} className="fs-14">Show Filters</a>
            </div>}

            {window.innerWidth < 600 && filterMob && <SummaryFilters sendData={data => sendData(data)} />}

            {window.innerWidth > 600 && <SummaryFilters sendData={data => sendData(data)} />}

            {dialogueopenandclose && <DialogueboxLoading />}
            <div className="mt-2">

                <DashboardCard data={summaryData} />
            </div>
            <div>
                <StoreMap />
            </div>

            <ChartsComponent data={summaryData} />


        </div>
    )
}



export default connect()(Dashboard);



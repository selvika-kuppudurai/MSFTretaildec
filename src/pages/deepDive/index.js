
import React, { useState, useEffect, memo } from "react";
import Filters from "../../components/Filters"
import { IoStorefrontOutline } from "react-icons/io5"
import { NormalButton } from "../../components/Common/NormalButton";
import FixtureDetails from "../../components/StoreDetails/FixtureDetails";
import InstallerDetails from "../../components/StoreDetails/InstallerDetails";
import Carousel from "../../components/Carousel";
import './style.scss'
import CustomTable from "../../components/Common/CustomTable";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MdEdit } from "react-icons/md";
import moment from "moment";

import axios from "axios"
import { endPoints } from "../../config/Api";
import HistoryDetails from '../../components/StoreDetails/HistoryDetails'

import StoreModal from "../../components/StoreDetails/StoreModal";
import PdfViewer from "../../components/PdfViewer";
import { TableSort } from "../../helpers";
import { loadCarouselData } from "../../redux/actions/carouselAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import DeepDiveFilters from "../../components/Filters/DeepDiveFilters";
import { checkGlId } from "../../redux/actions/storeInfoAction";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ImCancelCircle } from 'react-icons/im'
import { GrFormClose } from 'react-icons/gr';

import { CSVLink, CSVDownload } from "react-csv";

import CSVicon from '../../assets/images/CSVicon.png'
import Button from "@material-ui/core/Button"
// import addstoreimg from '../../assets/images/Add Store.PNG'

// deepdive table columns
const columns = [
    { id: 'glid', label: 'Global ID', className: "text-c2 fw-700", width: "8%" },
    { id: 'region', label: 'Region', className: "text-c2 fw-700", width: "8%" },
    { id: 'country', label: 'Country', className: "text-c2 fw-700", width: "10%" },
    { id: 'retailer', label: 'Retailer', className: "text-c2 fw-700", width: "12%" },
    { id: 'storeName', label: 'Store Name', className: "text-c2 fw-700", width: "12%" },
    { id: 'stateProvince', label: 'State', className: "text-c2 fw-700", width: "8%" },
    { id: 'city', label: 'City', className: "text-c2 fw-700", width: "8%" },
    { id: 'address', label: 'Address', className: "text-c2 fw-700", width: "18%" },
    { id: 'zip', label: 'Zip', className: "text-c2 fw-700", width: "7%" },
    { id: 'activeAssetTagID', label: '#Active Assets', className: "text-c2 fw-700", width: "4%" },
    { id: 'inactiveAssetTagID', label: '#Inactive Assets', className: "text-c2 fw-700", width: "4%" },
    {id: '', label: '', className: "text-c2 fw-700 p-0"}
   
];

// after click the GLID fixture detail header columns 
const columnsforfixturedeatilafterclick = [
    { id: 'Model', label: 'Program Model', className: "text-c2 fw-700", width: "8%" },
    { id: 'Asset Tag ID', label: 'Asset Tag ID', className: "text-c2 fw-700", width: "8%" },
    { id: 'SKU', label: 'SKU', className: "text-c2 fw-700", width: "7%" },
    { id: 'Status', label: 'Status', className: "text-c2 fw-700", width: "8%" },
    { id: 'Proposed Installation Date', label: 'Proposed Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'Actual Installation Date', label: 'Actual Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'Age', label: 'Age', className: "text-c2 fw-700", width: "8%" },
    { id: 'Depreciated?', label: 'Depreciated?', className: "text-c2 fw-700", width: "8" },
    // { id: 'Updated Date', label: 'Updated Date', className: "text-c2 fw-700", width: "7%" },

];

// csv header
const headerforcsv = [{ key: 'glid', label: 'Global ID' },
{ key: 'region', label: 'Region' },
{ key: 'country', label: 'Country' },
{ key: 'retailer', label: 'Retailer' },
{ key: 'storeName', label: 'Store Name' },
{ key: 'stateProvince', label: 'State' },
{ key: 'city', label: 'City' },
{ key: 'address', label: 'Address' },
{ key: 'zip', label: 'Zip' },
{ key: 'activeAssetTagID', label: '#Active Assets' },
{ key: 'inactiveAssetTagID', label: '#Inactive Assets' },
]


const DeepDive = ({ userDetails, loadCarouselData, carouselData, fixtureinstaller, dispatch, checkGlId }) => {
    console.log(window.innerWidth)
    // { userDetails.role !== "Guest" && columns.push()}
    const [table__Data, setTableDatafordeepdive] = useState([])
    const [table__loader, setTableLoader] = useState(true)
    const [assetDetails, showAssetDetails] = useState(false)
    const [storedetailsspecficinformation, setstoredetailsspecficinformation] = useState(false)
    const [storedetailsforcard, setstoredetail] = useState([])
    const [TableDataforhistory, setTableDataforhistory] = useState([])
    const [visible, setVisible] = useState(false)
    const [load2DImage, set2dImage] = useState(true)
    const [load3DImage, set3dImage] = useState(true)
    const [loadFloorImage, setLoadFloorImage] = useState(true)
    const [loadQuadImage, setLoadQuadImage] = useState(true)
    const [loadInstallImage, setLoadInstallImage] = useState(true)
    const [loadPicImage, setLoadPicImage] = useState(true)

    const [load2DPdf, setLoad2DPdf] = useState(false)
    const [load3DPdf, setLoad3DPdf] = useState(false)
    const [floorPdf, setFloorPdf] = useState(false)
    const [quadPdf, setQuadPdf] = useState(false)
    const [installPdf, setInstallPdf] = useState(false)
    const [picPdf, setPicPdf] = useState(false)

    const [valuefordialoguebox, setvaluefordialoguebox] = useState([])

    const [opendialogue, setopenthedialoguebox] = useState(false)

    const [editModal, setEditModal] = useState(false)
    const [filterMob, setFilterMob] = useState(false)
    const [detailsModal, setDetailsModal] = useState(false)

    const [vallll, setvalll] = useState(0)

    const [datavalueofhistory, setdatavalueofhistory] = useState([])



    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)

    const [unFilteredTable, setTableData] = useState([])

    // if(userDetails && userDetails.role !== "Guest") {
    //     columns.push( { id: '', label: '', className: "text-c2 fw-700" })
    //     console.log(columns)
    //     }

// function for api calling
    const sendData = (data) => {
        console.log('datafilter', Object.values(data).some((d) => d))
        // setfilterdetailsfordeepdive(data)
        // data = sessionStorage.getItem('deepdiveFilter')

        if (start !== 0 && end !== 10) {
            setStart(0)
            setEnd(10)
        }
        let g = JSON.parse(sessionStorage.getItem('deepdiveFilter'))
        console.log(g)
        if (Object.values(g).some(({ length }) => length)) {
            testingfordeepdive(g)
        } else {
            testingfordeepdive({})
        }

        // if (data && Object.values(data).some(({ length = {} }) => length ? length : {})) {
        //     testingfordeepdive(data)
        // } else {
        //     testingfordeepdive({})
        // }

    }

    // fixture detail and installer detail function
    const assetDetailsVisibility = (data) => {
        showAssetDetails(data)
        // console.log('bbbbbb', storedetailsforcard.glid)
        historyDataload(storedetailsforcard.glid)
    }


    useEffect(() => {
        if (!sessionStorage.getItem("deepdiveFilter")) {
            testingfordeepdive({})
        }
    }, [])

    // call when move from one tab to another tab
    useEffect(() => {
        return function cleanup() {
            dispatch({ type: "CAROUSEL_FAIL", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
            dispatch({ type: "Installer_fixture_fail", payload: { installerDetails: [], fixtureDatails: [] } })
        }
    }, [])

    // setting the display variable for 2D 3D floor plan Quard installation images 
    useEffect(() => {

        if (carouselData) {

            if (carouselData.twoDImages) {
                if (carouselData.twoDImages.length === 0 && carouselData.twoDPdf.length > 0) {
                    set2dImage(false)
                    setLoad2DPdf(true)
                }
            }


            if (carouselData.threeDImages) {
                if (carouselData.threeDImages.length === 0 && carouselData.threeDPdf.length > 0) {
                    set3dImage(false)
                    setLoad3DPdf(true)
                }
            }


            if (carouselData.FloorImages) {
                if (carouselData.FloorImages.length === 0 && carouselData.FloorPdf.length > 0) {
                    setLoadFloorImage(false)
                    setFloorPdf(true)
                }
            }



            if (carouselData.QuadImages) {
                if (carouselData.QuadImages.length === 0 && carouselData.QuadPdf.length > 0) {
                    setLoadQuadImage(false)
                    setQuadPdf(true)
                }
            }

            if (carouselData.InstallImage) {
                if (carouselData.InstallImage.length === 0 && carouselData.InstallPdf.length > 0) {
                    setLoadInstallImage(false)
                    setInstallPdf(true)
                }
            }

            if (carouselData.PicImage) {
                if (carouselData.PicImage.length === 0 && carouselData.PicPdf.length > 0) {
                    setLoadPicImage(false)
                    setPicPdf(true)
                }
            }
            // if (carouselData.installerDetails) {
            //     if (carouselData.installerDetails.length === 0 && carouselData.installerDetails.length > 0) {
            //         console.log('cc',carouselData.installerDetails)
            //     }
            // }
        }
    }, [carouselData])


    // const exportPDF = () => {
    //     const unit = "pt";
    //     const size = "A4"; // Use A1, A2, A3 or A4
    //     const orientation = "portrait"; // portrait or landscape

    //     const marginLeft = 40;
    //     const doc = new jsPDF(orientation, unit, size);

    //     doc.setFontSize(15);

    //     const title = "My Awesome Report";
    //     const headers = [["glid", "region", "country", "retailer", "storeName", "stateProvince","city", "address", "zip", "assetTagId"]];

    //     const data = pdfvalues.map(elt=> [elt.glid, elt.region,elt.country,elt.retailer,elt.storeName,elt.stateProvince,elt.city,elt.address,elt.zip,elt.assetTagId]);

    //     let content = {
    //       startY: 50,
    //       head: headers,
    //       body: data
    //     };

    //     doc.text(title, marginLeft, 40);
    //     doc.autoTable(content);
    //     doc.save("report.pdf")
    //   }

// function for table data in deepdive
    const setTableDatafordeepdivefordata = (data) => {
        setTableDatafordeepdive(data)
        setTableData(data)

    }
// function for pagination in deepdive 
    const handlePagination = (currentPage) => {

        let firstRecord = 0;
        let lastRecord = 10;


        if (currentPage <= 500) {
            lastRecord = currentPage * 10;
            firstRecord = lastRecord - 10;
        }

        if (currentPage > 500) {
            lastRecord = currentPage * 1;
            firstRecord = lastRecord - 10;
        }



        console.log("recorddetails", firstRecord, lastRecord)
        setStart(firstRecord)
        setEnd(lastRecord)

        if (table__Data[firstRecord].hasOwnProperty("glid") && table__Data[firstRecord].glid) {
            loadCarouselData(table__Data[firstRecord].glid)
            historyDataload(table__Data[firstRecord].glid)
        }

    }

// call when apply the filter
    const testingfordeepdive = (filtervaluesfordeepdive) => {
        console.log(filtervaluesfordeepdive)
        dispatch({ type: "TWO_D_FILES", payload: [] })
        // console.log('filtervaluesfordeepdive', filtervaluesfordeepdive)
        const filtermodel = {}
        let filterModel = []
        let filterRegion = []
        let filterCountry = []
        let filterRetailer = []
        let filterState = []
        let filterCity = []
        let filterGLID = []
        let filterAssetTagID = []
        let filterStatus = []

        if (Object.keys(filtervaluesfordeepdive).length > 0) {

            if (Object.keys(filtervaluesfordeepdive).includes('Model')) {
                if (filtervaluesfordeepdive.Model.length === 0) {
                    filterModel = 'All'
                } else {
                    filterModel = filtervaluesfordeepdive.Model
                }
            }
            else {
                filterModel = 'All'
            }
            if (Object.keys(filtervaluesfordeepdive).includes('Region')) {
                if (filtervaluesfordeepdive.Region.length === 0) {
                    filterRegion = 'All'
                } else {
                    filterRegion = filtervaluesfordeepdive.Region
                }
            } else {
                filterRegion = 'All'
            }
            if (Object.keys(filtervaluesfordeepdive).includes('Country')) {
                if (filtervaluesfordeepdive.Country.length === 0) {
                    filterCountry = 'All'
                } else {
                    filterCountry = filtervaluesfordeepdive.Country
                }
            } else {
                filterCountry = 'All'
            }
            if (Object.keys(filtervaluesfordeepdive).includes('Retailer')) {
                if (filtervaluesfordeepdive.Retailer.length === 0) {
                    filterRetailer = 'All'
                } else {
                    filterRetailer = filtervaluesfordeepdive.Retailer
                }
            } else { filterRetailer = 'All' }
            if (Object.keys(filtervaluesfordeepdive).includes('State')) {
                if (filtervaluesfordeepdive.State.length === 0) {
                    filterState = 'All'
                } else {
                    filterState = filtervaluesfordeepdive.State
                }
            } else { filterState = 'All' }

            if (Object.keys(filtervaluesfordeepdive).includes('City')) {
                if (filtervaluesfordeepdive.City.length === 0) {
                    filterCity = 'All'
                } else {
                    filterCity = filtervaluesfordeepdive.City
                }
            } else { filterCity = 'All' }

            if (Object.keys(filtervaluesfordeepdive).includes('Glid')) {
                if (filtervaluesfordeepdive.Glid.length === 0) {
                    filterGLID = 'All'
                } else {
                    filterGLID = filtervaluesfordeepdive.Glid
                }
            } else { filterGLID = 'All' }
            if (Object.keys(filtervaluesfordeepdive).includes('Assetid')) {
                if (filtervaluesfordeepdive.Assetid.length === 0) {
                    filterAssetTagID = 'All'
                } else {
                    filterAssetTagID = filtervaluesfordeepdive.Assetid
                }
            } else { filterAssetTagID = 'All' }
            if (Object.keys(filtervaluesfordeepdive).includes('Status')) {
                if (filtervaluesfordeepdive.Status.length === 0) {
                    filterStatus = 'All'
                } else {
                    filterStatus = filtervaluesfordeepdive.Status
                }
            } else { filterStatus = 'All' }

            const url = endPoints.deepDive.table_Data + `?Model=${filterModel}&Region=${filterRegion}&Country=${filterCountry}&Retailer=${filterRetailer}&State=${filterState}&City=${filterCity}&GLID=${filterGLID}&AssetTagID=${filterAssetTagID}&Status=${filterStatus}`

            setTableLoader(true)
            axios.get(url).then((res) => {
                console.log(res.length)
                setTableDatafordeepdive(res.data)
                setTableData(res.data)

                setTableLoader(false)
                console.log('res', res.length)
                if (Object.keys(res).length > 0) {
                    loadCarouselData(res.data[0].glid === null ? 40612 : res.data[0].glid)
                    setstoredetail(res.data[0])
                    setstoredetailsspecficinformation(true)
                    setvalll(0)
                    historyDataload(res.data[0].glid === null ? 40612 : res.data[0].glid)
                    // loadCarouselData(res.data[0].glid === null ? 40612 : res.data[0].glid)
                    if (res.data[0].glid.length > 0) {
                        loadCarouselData(res.data[0].glid === null ? 40612 : res.data[0].glid)
                    }
                }
            })
        } else {
            const url = endPoints.deepDive.table_Data + "?Model=All&Region=All&Country=All&Retailer=All&State=All&City=All&GLID=All&AssetTagID=All&Status=All"

            setTableLoader(true)
            axios.get(url).then((res) => {
                setTableDatafordeepdivefordata(res.data)

                setTableLoader(false)

                loadCarouselData(res.data[0].glid === null ? 40612 : res.data[0].glid)
                setstoredetail(res.data[0])
                // console.log('zzz', storedetailsforcard)
                setvalll(0)
                setstoredetailsspecficinformation(true)
                historyDataload(res.data[0].glid === null ? 40612 : res.data[0].glid)

                loadCarouselData(res.data[0].glid === null ? 40612 : res.data[0].glid)
                if (res.data[0].glid.length > 0) {
                    loadCarouselData(res.data[0].glid === null ? 40612 : res.data[0].glid)
                }

            }
            )


        }
    }
// history table function
    const historyDataload = (glid) => {
        const url = endPoints.deepDive.table_Data + `/GetHistoryDetails?GLIDCode=${glid}`
        axios.get(url).then(res => setTableDataforhistory(res.data))

    };
// for deepdive table row highlight
    const handleClick = (event, index) => {
        setstoredetail(event)
        setvalll(index)
        setstoredetailsspecficinformation(true)
        historyDataload(event.glid === null ? 40612 : event.glid)
        loadCarouselData(event.glid === null ? 40612 : event.glid)
    };




    // Table sort
    const onSort = (sortKey) => {
        console.log(sortKey)
        const sortedData = TableSort(table__Data, sortKey)
        // console.log("sortedData", sortedData)

        setTableDatafordeepdive(sortedData)
        setstoredetail(sortedData[0])
        setstoredetailsspecficinformation(true)
        historyDataload(sortedData[0].glid === null ? 40612 : sortedData[0].glid)
        loadCarouselData(sortedData[0].glid === null ? 40612 : sortedData[0].glid)

    }



    // change extension  view
    const changeExtensionView = (cId) => {
        console.log('vvvv',cId)

        if (cId === 1) {
            set2dImage(!load2DImage)
            setLoad2DPdf(!load2DPdf)
        }

        if (cId === 2) {
            set3dImage(!load3DImage)
            setLoad3DPdf(!load3DPdf)
        }

        if (cId === 3) {
            setLoadFloorImage(!loadFloorImage)
            setFloorPdf(!floorPdf)
        }

        if (cId === 4) {
            setLoadQuadImage(!loadQuadImage)
            setQuadPdf(!quadPdf)
        }

        if (cId === 5) {
            setLoadInstallImage(!loadInstallImage)
            setInstallPdf(!installPdf)
        }

        if (cId === 6) {
            setLoadPicImage(!loadPicImage)
            setPicPdf(!picPdf)
        }
    }

    // cancel button 
    const cancel = () => {

        dispatch({ type: "GLID_CLEAR" })
        setVisible(false)
        setEditModal(false)
        setDetailsModal(false)
    }
// edit button
    const editStore = (glid) => {
        dispatch({ type: "GLID_INPUT", payload: glid })
        checkGlId(glid)
        setEditModal(true)
    }
// images api call
    const glidclickfunction = (data) => {

        setvaluefordialoguebox(data)
        setopenthedialoguebox(true)
        const url = endPoints.deepDive.table_Data + "/" + `${data.glid}`
        axios.get(url).then(res => setdatavalueofhistory(res.data))
        console.log('kk', datavalueofhistory)


    }

    const handleCancel = () => {
        console.log('g')
    }

    // const searchTable = (e) => {

    //     let query = unFilteredTable.map(item => item).filter(d => d.glid.includes(e.target.value))
    //     console.log("querydata", query)

    //     const lastRecord = 1 * query.length;
    //     const firstRecord = lastRecord - query.length;

    //     // setStart(firstRecord)
    //     // setEnd(lastRecord)
    //     // setTableDatafordeepdive(query)
    // }

    // function for storemodal(dialogue box)
    const openStoreModal = (data) => {
        dispatch({ type: "GLID_INPUT", payload: storedetailsforcard.glid })
        checkGlId(storedetailsforcard.glid).then(() => {
            setDetailsModal(data)
        })

    }

    return (

        <div>
            {/* <Filters sendData={(data) => sendData(data)} deepDive={true} /> */}
            {window.innerWidth < 600 && <div className="d-flex ml-3 mt-3 asset__link">
                <a onClick={() => setFilterMob(!filterMob)} className="fs-14">Show Filters</a>
            </div>}

            {window.innerWidth < 600 && filterMob && <DeepDiveFilters sendData={(data) => sendData(data)} deepDive={true} />}

            {window.innerWidth > 600 && <DeepDiveFilters sendData={(data) => sendData(data)} deepDive={true} />}



            <div className="storedetailstabledesign">
                <div className="pt-4 d-flex  justify-content-between">
                    <div className="d-flex col-4 align-items-center">
                        <IoStorefrontOutline size="30" className="icon__clr" />
                        <h3 className="mb-0 Headerfontdesign">Store Details</h3>
                    </div>
                    <div className="col-8 contentenddesign d-flex">
                        {/* <div>
                            <input type="search" onChange={(e) => searchTable(e)} />
                        </div> */}
                        {table__Data.length > 0 && <div className="mr-3">
                            <CSVLink filename='data.csv' data={table__Data} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
                        {userDetails && (userDetails.role === "Admin" || userDetails.role === "Country Lead") &&
                            <div className="add__asset store__btn_addstore mr-sm-3">
                                <Button title='Add a new store' variant="contained" className="tore__btn_addstore" onClick={() => setVisible(true)}  > add store</Button>
                            </div>
                        }
                    </div>
                </div>


                <div className="col-lg-12   pt-4 table-container customtable deep__dive--table ml-2 mr-2">
               
                    <CustomTable columns={columns} onSort={(data) => onSort(data)} tableLength={table__Data.length} handlePagination={(data) => handlePagination(data)} showPagination={true} loader={table__loader} >

                        {!table__loader && table__Data.length > 0 && table__Data.slice(start, end).map((data, index) => {

                            return (
                                <TableRow onClick={() => handleClick(data, index)} className={vallll === index ? 'highlightedtablerowdesign' : 'cursor-pointer'} hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell className="tablecelldesign widthforglid">
                                        {/* {data.glid} */}
                                        <a onClick={() => glidclickfunction(data)}>{data.glid}</a>
                                    </TableCell >
                                    <TableCell className="tablecelldesign widthforregion">
                                        {data.region}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforcountry">
                                        {data.country}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforretailer">
                                        {data.retailer}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforstorename">
                                        {data.storeName}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforstate">
                                        {data.stateProvince}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforcity">
                                        {data.city}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforaddress">
                                        {data.address}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforzip">
                                        {data.zip}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforassettagid">
                                        {data.activeAssetTagID}
                                    </TableCell>
                                    <TableCell className="tablecelldesign widthforassettagid">
                                        {data.inactiveAssetTagID}
                                    </TableCell>

                                    {userDetails && userDetails.role !== "Guest" ? <TableCell onClick={() => editStore(data.glid)}> <MdEdit className="cursor-pointer" title="Edit this store" /> </TableCell>:<TableCell className="p-0"/>}

                                </TableRow>
                            )
                        })}
                    </CustomTable>
                </div>
            </div>
            {
                storedetailsspecficinformation && storedetailsforcard && <div className='retailcontaincard'>
                    {/* <div className="cardheaderinretail">Store </div> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 dashboard__card  d-flex justify-content-between flex-wrap textaligncenter"><div className="col-lg-2 col-md-1 col-sm-12"><div className="retailercardheader"> GLID </div> <div className="retailercardContent">{storedetailsforcard.glid}</div></div> <div className="col-lg-3 col-md-5 col-sm-12"><div className="retailercardheader "> Store Name</div> <div className="retailercardContent"> {storedetailsforcard.storeName}</div> </div> <div className="col-lg-2 col-md-3 col-sm-12 "><div className="retailercardheader"> Retailer</div> <div className="retailercardContent">{storedetailsforcard.retailer} </div></div><div className="col-lg-2 col-md-2 col-sm-12"> <div className="retailercardheader"> City</div> <div className="retailercardContent"> {storedetailsforcard.city} </div></div><div className="col-lg-2 col-md-1 col-sm-12"> <div className="retailercardheader">#Active Assets </div> <div className="retailercardContent"> {storedetailsforcard.activeAssetTagID}</div>
                    </div></div>
                </div>
            }
            <div className="d-flex flex-wrap store__details">
                <FixtureDetails assetDetailsVisibility={(data) => assetDetailsVisibility(data)} data={fixtureinstaller.fixtureDatails} loader={table__loader} openStoreModal={(d) => openStoreModal(d)} />
                {window.innerWidth < 992 &&
                assetDetails && <div>
                    <HistoryDetails assetDetailsVisibility={(data) => assetDetailsVisibility(data)} data={TableDataforhistory} />
                </div>
            }
                <InstallerDetails data={fixtureinstaller.installerDetails} openStoreModal={(d) => openStoreModal(d)} />
            </div>

            {window.innerWidth > 992 &&
                assetDetails && <div>
                    <HistoryDetails assetDetailsVisibility={(data) => assetDetailsVisibility(data)} data={TableDataforhistory} />
                </div>
            }
            {opendialogue &&
                <Dialog open={opendialogue} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    {/* <DialogTitle id="form-dialog-title">Add Execution Tier</DialogTitle> */}
                    <DialogContent>
                        <div className="textalignend "> 
                    <GrFormClose size="30" className="icon__clr cursorpointer" onClick={() => setopenthedialoguebox(false)} />
</div>
                        <div className="d-flex mt-4 alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> GLID </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.glid}</div>
                            {/* <ImCancelCircle className="cursor-pointer" onClick={() => setopenthedialoguebox(false)} /> */}
                        </div>
                        <div className="d-flex alignmentdesign ">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Region </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.region}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Retailer </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.retailer}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Country </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.country}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Store Name </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.storeName}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> State </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.stateProvince}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> City </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.city}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Address </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.address}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Zip </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.zip}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Assets </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.assetTagId}</div>

                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Execution Tier </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{valuefordialoguebox.executionTier}</div>


                        </div>
                    
                        {datavalueofhistory && datavalueofhistory.length > 0 && <div className="fontsize_14px">
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Sub PM name </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{datavalueofhistory.subPmname}</div>


                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Backwall Custom Specifications </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{datavalueofhistory.backwallCustomSpecifications}</div>


                        </div>
                        <div className="d-flex alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Special Requests </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{datavalueofhistory.specialRequests}</div>


                        </div>
                        <div className="d-flex mb-4 alignmentdesign">
                            <div className="col-1"></div>
                            <div className="col-3 columncolorfordeepdive"> Graphics Language </div>
                            <div className="col-1">:</div>
                            <div className="ml-5 col-6">{datavalueofhistory.graphicsLanguage}</div>


                        </div>
                            <p>Fixture Details:</p>
                            <CustomTable className="customdesign mt-3" columns={columnsforfixturedeatilafterclick} onSort={(data) => onSort(data)} tableLength={datavalueofhistory.length} loader={table__loader} >

                                {datavalueofhistory == undefined || datavalueofhistory.length == 0 ? <div>Loading....</div> : datavalueofhistory.map((data, index) => {

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell>
                                                {data.model}
                                            </TableCell>
                                            <TableCell>
                                                {data.assetTagID}
                                            </TableCell>
                                            <TableCell>
                                                {data.sku}
                                            </TableCell>
                                            <TableCell>
                                                {data.status}
                                            </TableCell>
                                            <TableCell>
                                                {/* {data.proposedInstallationDate} */}
                                            {data.proposedInstallationDate != null ? moment(data.proposedInstallationDate).format("MM/DD/YYYY"): data.proposedInstallationDate}

                                            </TableCell>
                                            <TableCell>
                                            {data.actualInstallationDate != null ? moment(data.actualInstallationDate).format("MM/DD/YYYY"): data.actualInstallationDate}
                                                
                                                {/* {data.actualInstallationDate} */}
                                            </TableCell>
                                            <TableCell>
                                                {data.assetAge}
                                            </TableCell>
                                            <TableCell>
                                                {data.isAssetDepreciated}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </CustomTable>
                        </div>}
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            }
            <div className="d-lg-flex d-md-flex col-lg-12 col-md-12 col-sm-12 pl-0">

                {loadPicImage && carouselData && carouselData.PicImage && <Carousel title="Picture of Space" images={carouselData.PicImage} loadImage={loadPicImage} changeExtensionView={changeExtensionView} fileExtension={carouselData.PicExtensions} carouselId={6} carouselLoader={carouselData.picLoader} filesExist={carouselData.picfilesExist} />}



                {picPdf && carouselData && carouselData.PicPdf && <PdfViewer title="Picture of Space" images={carouselData.PicPdf} loadPdf={picPdf} changeExtensionView={changeExtensionView} fileExtension={carouselData.PicExtensions} carouselLoader={carouselData.picLoader} carouselId={6} />}

                {loadFloorImage && carouselData && carouselData.FloorImages && <Carousel title="Floor Plan" images={carouselData.FloorImages} fileExtension={carouselData.FloorExtensions} changeExtensionView={changeExtensionView} loadImage={loadFloorImage} carouselId={3} carouselLoader={carouselData.floorLoader} filesExist={carouselData.floorfilesExist} />}

                {floorPdf && carouselData && carouselData.FloorPdf && <PdfViewer title="Floor Plan" images={carouselData.FloorPdf} loadPdf={floorPdf} changeExtensionView={changeExtensionView} fileExtension={carouselData.FloorExtensions} carouselId={3} carouselLoader={carouselData.floorLoader} filesExist={carouselData.floorfilesExist} />}

                {load2DImage && carouselData && carouselData.twoDImages && <Carousel title="2D Floor Plan" images={carouselData.twoDImages} loadImage={load2DImage} changeExtensionView={changeExtensionView} fileExtension={carouselData.twoDExtensions} carouselLoader={carouselData.twodLoader} carouselId={1} filesExist={carouselData.twodfilesExist} />}



                {load2DPdf && carouselData && carouselData.twoDPdf && <PdfViewer title="2D Floor Plan" images={carouselData.twoDPdf} loadPdf={load2DPdf} changeExtensionView={changeExtensionView} fileExtension={carouselData.twoDExtensions} carouselLoader={carouselData.twodLoader} carouselId={1} filesExist={carouselData.twodfilesExist} />}




            </div>
            <div className="d-lg-flex d-md-flex col-lg-12 col-md-12 col-sm-12  pl-0">


                {load3DImage && carouselData && carouselData.threeDImages && <Carousel title="3D Floor Plan" images={carouselData.threeDImages} loadImage={load3DImage} changeExtensionView={changeExtensionView} fileExtension={carouselData.threeDExtensions} carouselId={2} carouselLoader={carouselData.threedLoader} filesExist={carouselData.threedfilesExist} />}

                {load3DPdf && carouselData && carouselData.threeDPdf && <PdfViewer title="3D Floor Plan" images={carouselData.threeDPdf} loadPdf={load3DPdf} changeExtensionView={changeExtensionView} fileExtension={carouselData.threeDExtensions} carouselId={2} carouselLoader={carouselData.threedLoader} filesExist={carouselData.threedfilesExist} />}





                {loadQuadImage && carouselData && carouselData.QuadImages && <Carousel title="Quad Report" images={carouselData.QuadImages} loadImage={loadQuadImage} changeExtensionView={changeExtensionView} fileExtension={carouselData.QuadExtensions} carouselId={4} carouselLoader={carouselData.quadLoader} filesExist={carouselData.quadfilesExist} />}

                {quadPdf && carouselData && carouselData.QuadPdf && <PdfViewer title="Quad Report" images={carouselData.QuadPdf} loadPdf={quadPdf} changeExtensionView={changeExtensionView} fileExtension={carouselData.QuadExtensions} carouselId={4} carouselLoader={carouselData.quadLoader} filesExist={carouselData.quadfilesExist} />}

                {loadInstallImage && carouselData && carouselData.InstallImage && <Carousel title="Installation Photos" images={carouselData.InstallImage} loadImage={loadInstallImage} changeExtensionView={changeExtensionView} fileExtension={carouselData.InstallExtensions} carouselId={5} carouselLoader={carouselData.installLoader} filesExist={carouselData.insfilesExist} />}


                {installPdf && carouselData && carouselData.InstallPdf && <PdfViewer title="Installation Photos" images={carouselData.InstallPdf} loadPdf={installPdf} changeExtensionView={changeExtensionView} fileExtension={carouselData.InstallExtensions} carouselId={5} filesExist={carouselData.insfilesExist} carouselLoader={carouselData.installLoader} />}





            </div>
            {(visible || editModal || detailsModal) && <StoreModal title="In Store Experience" visible={visible} cancel={cancel} editModal={editModal} detailsModal={detailsModal} />}
        </div >
    )
}


const mapStateToProps = ({ user, fixtureinstaller, carousel: { carouselData } }) => {

    return {
        userDetails: user.userDetails,
        carouselData,
        fixtureinstaller: fixtureinstaller.InstallerDetailsfordeepdive
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadCarouselData,
        checkGlId,
        dispatch
    }, dispatch);
};




export default connect(mapStateToProps, mapDispatchToProps)(DeepDive)
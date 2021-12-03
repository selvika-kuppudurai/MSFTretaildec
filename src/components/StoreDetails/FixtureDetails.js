import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import { MdModeEdit } from 'react-icons/md'
import { GiTable } from 'react-icons/gi'
import CustomTable from "../../components/Common/CustomTable";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconAssets from '../../assets/images/Icon-Assets.png';
import { TableSort } from "../../helpers";
import { connect } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";
// import { CSVLink, CSVDownload } from "react-csv";
import CSVicon from '../../assets/images/CSVicon.png'


const columns = [
    { id: 'model', label: 'Program Model', className: "text-c2 fw-700", width: "8%" },
    { id: 'assetTagID', label: 'Asset Tag ID', className: "text-c2 fw-700", width: "8%" },
    { id: 'SKU', label: 'SKU', className: "text-c2 fw-700", width: "7%" },
    { id: 'fixtureDescription', label: 'Fixture Description', className: "text-c2 fw-700", width: "8%" },
    { id: 'status', label: 'Status', className: "text-c2 fw-700", width: "8%" },
    { id: 'proposedInstallationDate', label: 'Proposed Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'actualInstallationDate', label: 'Actual Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'assetAge', label: 'Age', className: "text-c2 fw-700", width: "8%" },
    { id: 'isAssetDepreciated?', label: 'Depreciated?', className: "text-c2 fw-700", width: "8%" },
    

    // { id: 'Updated Date', label: 'Updated Date', className: "text-c2 fw-700", width: "7%" },

];

const headerforcsv = [{ key: 'model', label: 'Program Model' },
{ key: 'assetTagID', label: 'Asset Tag ID' },
{ key: 'sku', label: 'SKU' },
{ key: 'fixtureDescription', label: 'Fixture Description' },
{ key: 'status', label: 'Status' },
{ key: 'proposedInstallationDate', label: 'Proposed Installation Date' },
{ key: 'actualInstallationDate', label: 'Actual Installation Date' },
{ key: 'assetAge', label: 'Age' },
{ key: 'isAssetDepreciated', label: 'Depreciated?' },

]


const FixtureDetails = ({ assetDetailsVisibility, data, userDetails, loader, openStoreModal }) => {
    const [table__Data_fixture, setTableDataforfixtiredetails] = useState([])
    const [FixtureHistoryData, setFixtureHistoryData] = useState([])

    const [modalState, setModal] = useState(false)

    console.log("datamy", data)

    const clickEdit = () => {
        openStoreModal(!modalState)
    }

    useEffect(() => {
        testingsetFixtureHistoryData()
    }, [])
    const testingsetFixtureHistoryData = () => {
        // const url = endPoints.deepDive.table_Data + "/GetHistoryDetails?GLIDCode=115499"
        // axios.get(url).then(res => )
        // console.log('testing', FixtureHistoryData)
        if (data.length > 0) {
            setTableDataforfixtiredetails(data)

        }
    };

    const onSort = (sortKey) => {
        const sortedDataforfixturedetail = TableSort(data, sortKey)
        data = sortedDataforfixturedetail
    }

    return (


        <div className='col-lg-9 paddingnone pr-2'>
            <Card className='border-0 carddesignwithheight mt-4'>
                <Card.Body className="paddingnone">
                    <div className='flexdesign col-lg-12'>
                        <div className='centeralign'>
                            <img className="imgwidth" src={IconAssets} alt="asset" />
                        </div>
                        <div className='col-lg-1 col-sm-2 d-lg-flex align-items-center no-wrap mr-lg-3 mr-md-3 mr-sm-3 pl-0 pr-0'>
                            <Card.Title>Fixture Details</Card.Title>
                        </div>
                        {userDetails && userDetails.role != 'Guest' ?
                            <div className='col-lg-2 col-sm-1 d-lg-flex align-items-center cursor-pointer fixture__edit'>
                                <MdModeEdit size='20' className='icon__clr__edit__fixture' onClick={clickEdit} />
                            </div>
                            :<div className='col-lg-2 col-sm-1 d-lg-flex align-items-center cursor-pointer fixture__edit'>
                            </div>}
                            {data.length > 0 && <div className="col-lg-8 col-md-8 col-sm-8 textalign-end">
                            <CSVLink filename='Fixture_details_data.csv' data={data} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
                    </div>
                    <Card.Text className='textdesign'>
                        <div className="table-container">
                            {/* <CSVLink data={data}><MdModeEdit/></CSVLink> */}
                            <CustomTable className="" columns={columns} onSort={(data) => onSort(data)} tableLength={data.length}>

                                {data.length > 0 && data.map((data, index) => {

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
                                                {data.fixtureDescription}
                                            </TableCell>
                                            <TableCell>
                                                {data.status}
                                            </TableCell>
                                            <TableCell>
                                            {/* {moment(row.systemUpdatedDate).format("M/DD/YYYY HH:MM:SS")} */}

                                                {data.proposedInstallationDate != null ? moment(data.proposedInstallationDate).format("M/DD/YYYY"): data.proposedInstallationDate}
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
                        </div>
                        
                    </Card.Text>
                    
                </Card.Body>
                <div className="d-flex justify-content-end mt-1 asset__link mr-2">
                            <a onClick={() => assetDetailsVisibility(true)} className="fs-14">View Asset History</a>
                        </div>
            </Card>

        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        userDetails: state.user.userDetails
    }
}

export default connect(mapStateToProps)(FixtureDetails);
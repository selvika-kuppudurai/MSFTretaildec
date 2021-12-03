import React, { useState, useEffect } from "react";
import axios from "axios"
import { endPoints } from "../../config/Api";
import { MdEdit } from "react-icons/md";
import CustomTable from "../../components/Common/CustomTable";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { GrFormClose } from 'react-icons/gr';
import { TableSort } from "../../helpers";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import CSVicon from '../../assets/images/CSVicon.png'

const columns = [
    { id: 'model', label: 'Program Model', className: "text-c2 fw-700", width: "8%" },
    { id: 'assetTagID', label: 'Asset Tag ID', className: "text-c2 fw-700", width: "8%" },
    { id: 'sku', label: 'SKU', className: "text-c2 fw-700", width: "7%" },
    { id: 'fixtureDescription', label: 'Fixture Description', className: "text-c2 fw-700", width: "7%" },
    { id: 'status', label: 'Status', className: "text-c2 fw-700", width: "8%" },
    { id: 'proposedInstallationDate', label: 'Proposed Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'actualInstallationDate', label: 'Actual Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'previousAssetTag', label: 'Previous Asset Tag', className: "text-c2 fw-700", width: "8%" },
    { id: 'updatedby', label: 'Updated By', className: "text-c2 fw-700", width: "8" },
    { id: 'systemUpdatedDate', label: 'Updated Date', className: "text-c2 fw-700", width: "7%" },
   

];

const headerforcsv = [{ key: 'model', label: 'Program Model' },
{ key: 'assetTagID', label: 'Asset Tag ID' },
{ key: 'sku', label: 'SKU' },
{ key: 'fixtureDescription', label: 'Fixture Description' },
{ key: 'status', label: 'Status' },
{ key: 'proposedInstallationDate', label: 'Proposed Installation Date' },
{ key: 'actualInstallationDate', label: 'Actual Installation Date' },
{ key: 'previousAssetTag', label: 'Previous Asset Tag' },
{ key: 'updatedby', label: 'Updated By' },
{ key: 'systemUpdatedDate', label: 'Updated Date' },
]
const HistoryDetails = ({ assetDetailsVisibility, data}) => {
    // const [TableDataforhistory, setTableDataforhistory] = useState([])

    // useEffect(() => {
    //     historyDataload()
        
    // }, [])
    // const historyDataload = () => {
    //     const url = endPoints.deepDive.table_Data + `/GetHistoryDetails?GLIDCode=${data}`
    //     axios.get(url).then(res => setTableDataforhistory(res.data))
    // };
    
    const onSort = (sortKey) => {
        console.log(data)
        const sortedData = TableSort(data, sortKey)
        console.log(sortedData)
        data = sortedData
        console.log(data)
    }
    return (
        <div className='mt-sm-4 widthdesignforhistory '>
  <div className="col-lg-12 col-md-12 col-sm-12 justify-content-end">
  {data.length > 0 && <div className="mr-3">
                            <CSVLink filename='View_asset_history_data.csv' data={data} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
            <GrFormClose size="30" className="icon__clr cursorpointer" onClick={() => assetDetailsVisibility(false)} />
</div>
            <div className="pt-4 table-container widthdesignforhistoryforresponsive ml-2 mr-2 col-sm-12 col-md-12 col-lg-12">
                <CustomTable columns={columns} onSort={(data) => onSort(data)} tableLength={data.length}>
                    {data != undefined && data.length > 0 ? data.map((data) => {
                       

                        return (
                            <TableRow  hover role="checkbox" tabIndex={-1} key={1}>
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
                                {data.proposedInstallationDate != null && data.proposedInstallationDate != "0001-01-01T00:00:00" ? moment(data.proposedInstallationDate).format("MM/DD/YYYY"): ""}

                                    {/* {data.proposedInstallationDate} */}
                                </TableCell>
                                <TableCell>
                                {data.actualInstallationDate != null && data.actualInstallationDate != "0001-01-01T00:00:00" ? moment(data.actualInstallationDate).format("MM/DD/YYYY"): ""}

                                    {/* {data.actualInstallationDate} */}
                                </TableCell>
                                <TableCell>
                                    {data.previousAssetTag}
                                </TableCell>
                                <TableCell>
                                    {data.updatedby}
                                </TableCell>
                                <TableCell>
                                {data.systemUpdatedDate != null ? moment(data.systemUpdatedDate).format("MM/DD/YYYY"): data.systemUpdatedDate}

                                    {/* {data.systemUpdatedDate} */}
                                </TableCell>
                                
                               

                            </TableRow>
                        )
                    }) : <div>Loading....</div> }
                </CustomTable>

                {/* <GrFormClose></GrFormClose> */}

            </div>
        </div>
    )


}
export default HistoryDetails;
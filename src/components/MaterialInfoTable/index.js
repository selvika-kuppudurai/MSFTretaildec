import React from "react";

import CustomTable from "../../components/Common/CustomTable";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableSort } from "../../helpers";
import moment from "moment";


const materialInfoColumns = [
    { id: 'model', label: 'Program Model', className: "text-c2 fw-700", width: "8%" },
    { id: 'sku', label: 'Fixture', className: "text-c2 fw-700", width: "8%" },
    { id: 'fixtureDescription', label: 'Fixture Description', className: "text-c2 fw-700", width: "10%" },

    { id: 'assetTagId', label: 'Asset Tag ID', className: "text-c2 fw-700", width: "8%" },
    { id: 'Previous Asset Tag ID', label: 'Previous Asset Tag ID', className: "text-c2 fw-700", width: "8%" },
    { id: 'fixtureCost', label: 'Cost', className: "text-c2 fw-700", width: "7%" },
    { id: 'status', label: 'Status', className: "text-c2 fw-700", width: "8%" },
    { id: 'installerName', label: 'Installer', className: "text-c2 fw-700", width: "8%" },
    { id: 'installerContact', label: 'Installer Contact', className: "text-c2 fw-700", width: "8%" },
    { id: 'actualInstallationDate', label: 'Actual Installation Date', className: "text-c2 fw-700", width: "8%" },
    { id: 'proposedInstallationDate', label: 'Proposed Installation Date', className: "text-c2 fw-700", width: "8%" },



];

const MaterialInfoTable = ({ materialInfoDetails = [], table__loader }) => {
    return (
        <>
            {materialInfoDetails && materialInfoDetails.length > 0 && <div className="fontsize_14px">

                <p>Fixture Details:</p>
                <CustomTable className="customdesign mt-3" tableLength={materialInfoDetails.length} loader={table__loader} columns={materialInfoColumns} >

                    {materialInfoDetails.length > 0 && materialInfoDetails.map((data, index) => {

                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                                <TableCell>
                                    {data.model}
                                </TableCell>

                                <TableCell>
                                    {data.sku}
                                </TableCell>

                                <TableCell>
                                    {data.fixtureDescription}
                                </TableCell>

                                <TableCell>

                                    {data.assetTagID}
                                </TableCell>

                                <TableCell>
                                    {data.previousAssetTag}
                                </TableCell>

                                <TableCell>
                                    {data.fixtureCost}
                                </TableCell>

                                <TableCell>
                                    {data.status}
                                </TableCell>

                                <TableCell>
                                    {data.installerName}
                                </TableCell>

                                <TableCell>
                                    {data.installerContact}
                                </TableCell>
                                <TableCell>
                                {data.actualInstallationDate != null ? moment(data.actualInstallationDate).format("YYYY-MM-DD"): data.actualInstallationDate}

                                    {/* {moment(data.actualInstallationDate).format("")} */}
                                </TableCell>

                                <TableCell>
                                {data.proposedInstallationDate != null ? moment(data.proposedInstallationDate).format("YYYY-MM-DD"): data.proposedInstallationDate}

                                    {/* {moment(data.proposedInstallationDate).format("YYYY-MM-DD")} */}
                                </TableCell>

                            </TableRow>
                        )
                    })}
                </CustomTable>
            </div>}
        </>
    )
}



export default MaterialInfoTable;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import '../Common/Activity/activitystyle.scss'
import { connect } from 'react-redux';
import { useEffect } from 'react';

import moment from 'moment';
import { loadUserActivity } from '../../redux/actions/userActivity';
import Loader from 'react-loader-spinner';


function createData(StoreID, Updatedby, changes, ApprovalStatus, ApprovalactionBy, Timestamp) {
    return { StoreID, Updatedby, changes, ApprovalStatus, ApprovalactionBy, Timestamp };
}

const rows = [
    createData('32087', 'User1', 'Fixtures', 'APPROVED', 'Admin1', '6/21/2021 6PM'),
    createData('32088', 'User1', 'Fixtures', 'APPROVED', 'Admin1', '6/21/2021 6PM'),
    createData('32089', 'User1', 'Fixtures', 'APPROVED', 'Admin1', '6/21/2021 6PM'),
    createData('32081', 'User1', 'Fixtures', 'REJECTED', 'Admin1', '6/21/2021 6PM'),
    createData('32082', 'User1', 'Fixtures', 'APPROVED', 'Admin1', '6/21/2021 6PM'),
    createData('32083', 'User1', 'Fixtures', 'APPROVED', 'Admin1', '6/21/2021 6PM'),
    createData('32084', 'User1', 'Fixtures', 'REJECTED', 'Admin1', '6/21/2021 6PM')
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'glid', numeric: false, disablePadding: false, label: 'Global ID' },
    { id: 'storeName', numeric: false, disablePadding: false, label: 'Store Name' },
    { id: 'retailer', numeric: false, disablePadding: false, label: 'Retailer' },
    { id: 'city', numeric: false, disablePadding: false, label: 'City' },
    { id: 'countryName', numeric: false, disablePadding: false, label: 'Country' },
    { id: 'updatesIn', numeric: false, disablePadding: false, label: 'Changes Made to' },
    { id: 'updatedby', numeric: false, disablePadding: false, label: 'Updated by (Email ID)' },
    { id: 'updatedbyUser', numeric: false, disablePadding: false, label: 'Updated by (User)' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
    { id: 'systemUpdatedDate', numeric: false, disablePadding: false, label: 'Updated on' },
    { id: 'isApproved', numeric: false, disablePadding: false, label: 'Approval Status' },
    { id: 'approvedBy', numeric: false, disablePadding: false, label: 'Approval Action By' },
    { id: 'approvalDate', numeric: false, disablePadding: false, label: 'Approval Date' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, activityData } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const ActivityTrack = ({ userActivity, activityLoader, userDetails, loadUserActivity }) => {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('glid');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    useEffect(() => {

        loadUserActivity(userDetails.email)
    }, [])





    return (
        <div className='activitytrack mt-3'>
           
            <Paper className={classes.paper}>

                <TableContainer style={{ height: "425px" }} className="mt-5">
                    <Table stickyHeader
                        className="tableheaderdesignforactivity "
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"

                    >
                        <EnhancedTableHead

                            classes={classes}

                            order={order}
                            orderBy={orderBy}

                            onRequestSort={handleRequestSort}


                        />

                        {activityLoader}
                        <TableBody className="table-parent">

                            {userActivity.length > 0 && !activityLoader && stableSort(userActivity, getComparator(order, orderBy))
                                .map((row, index) => {

                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.StoreID}
                                        >

                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.glid}
                                            </TableCell>
                                            <TableCell >{row.storeName}</TableCell>
                                            <TableCell >{row.retailer}</TableCell>
                                            <TableCell >{row.city}</TableCell>
                                            <TableCell >{row.countryName}</TableCell>
                                            <TableCell >{row.updatesIn}</TableCell>
                                            <TableCell >{row.updatedby}</TableCell>
                                            <TableCell >{row.updatedbyUser}</TableCell>

                                            <TableCell >{row.role}</TableCell>
                                            <TableCell >{row.systemUpdatedDate ? moment(row.systemUpdatedDate).format("M/DD/YYYY HH:mm:ss"): ''}</TableCell>
                                            {row.isApproved === 1 ? <TableCell className="approveddesign" align="right"><p>{"APPROVED"}</p></TableCell> : row.isApproved === -1 ? <TableCell className="rejectdesign" align="right"><p>{"REJECTED"}</p></TableCell> : row.isApproved === 0 ? <TableCell className=" pending__clr" align="right"><p>{"PENDING"}</p></TableCell> : null}
                                            {/* <TableCell align="right">{row.ApprovalStatus}</TableCell> */}
                                            <TableCell >{row.approvedBy}</TableCell>
                                            {/* <TableCell>{moment(row.systemUpdatedDate).format("M/DD/YYYY HH:MM:SS")}</TableCell> */}
                                            <TableCell>{row.approvalDate ? moment(row.approvalDate).format("M/DD/YYYY HH:mm:ss"): ''}</TableCell>
                                        </TableRow>
                                    );
                                })}

                            {activityLoader && <div className="table__loader">
                                <Loader
                                    type="Oval"
                                    color="#00BFFF"
                                    height={50}
                                    width={50}
                                />
                            </div>
                            }

                            {userActivity.length === 0 && !activityLoader && <div className="table__loader font-weight-bold "> No Data </div>}

                            {/* {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>

                    </Table>
                </TableContainer>
                {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
                  /> */}


            </Paper>

           

        </div>
    );
}

const mapStateToProps = ({ user, userTrack }) => {
    return {

        userDetails: user.userDetails,
        userActivity: userTrack.userActivity,
        activityLoader: userTrack.loader
    }
}


export default connect(mapStateToProps, { loadUserActivity })(ActivityTrack)
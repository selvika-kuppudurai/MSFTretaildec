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
import './activitystyle.scss'
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { approvalDetails, loadUserApprovals, userApproveReject } from "../../../redux/actions/approvalsAction"
import moment from 'moment';
import ApprovalDetailsModal from '../../approvalDetailsModal';
import { CSVLink, CSVDownload } from "react-csv";
import CSVicon from '../../../assets/images/CSVicon.png'

import Button from "@material-ui/core/Button"



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

const headerforcsv = [{key: 'glid',label: 'Global ID'},
{ key: 'storeName', label: 'Store Name' },
{ key: 'retailer', label: 'Retailer' },
{ key: 'city',  label: 'City' },
{ key: 'countryName',  label: 'Country' },
{ key: 'updatesIn', label: 'Changes Made to' },
{ key: 'updatedby',  label: 'Updated By (Email ID)' },
{ key: 'updatedbyUser',  label: 'Updated By (User )' },
{ key: 'role', label: 'Role' },
{ key: 'systemUpdatedDate', label: 'Updated on' },
{ key: 'isApproved',  label: 'Approval Status' },
{ key: 'approvedBy',label: 'Approval Action By' },
{ key: 'approvalDate', label: 'Approval Date' },

]

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, activityData } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && activityData.length === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
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

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;


// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

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

const Activitytab = ({ loadUserApprovals, activityData, userApproveReject, userDetails, storeDetails, approvalDetails }) => {
  // console.log("actdata", activityData.length > 0 && moment(activityData[0].approvalDate).format("M/DD/YYYY h A"))
  const dispatch = useDispatch()
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('glid');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [records, selectedRecords] = useState([])

  const [chosenRecords, setChosenRecords] = useState([])

  const [modal, setModal] = useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const records = activityData.length > 0 && activityData.map((n, idx) => idx);

      selectedRecords(records)


      activityData.map(d => {
        setChosenRecords(prevArray => [...prevArray, {
          "updatedby": d.updatedby,
          "systemUpdatedDate": d.systemUpdatedDate,
          "approvedBy": "string",
          "Glid": d.glid,
          "updateddate": d.systemUpdatedDate
        }])
      })
      return;
    } else {
      selectedRecords([])
      setChosenRecords([])
    }
    setSelected([]);
  };

  useEffect(() => {
    loadUserApprovals("Activity")
  }, [])


  const getDetails = (e, data) => {
    console.log("events", e)
    e.stopPropagation();

    setModal(true)
    approvalDetails(data)
  }

  const modalCancel = () => {
    dispatch({ type: "APPROVAL_DETAILS", payload: [] })
    setModal(false)
  }


  const handleClick = (event, data, idx) => {


    if (records.length > 0 && records.includes(idx)) {
      let filterRecord = records.filter(d => d !== idx)
      selectedRecords(filterRecord)
    } else {
      selectedRecords(prevArray => [...prevArray, idx])
    }

    if (chosenRecords.length > 0 && chosenRecords.find(d => d.systemUpdatedDate === data.systemUpdatedDate)) {
      console.log('gg')
      let filtervalues = chosenRecords.filter(d => d.systemUpdatedDate !== data.systemUpdatedDate)
      console.log(filtervalues)
      setChosenRecords(filtervalues)


    } else {
      console.log('hh')
      setChosenRecords(prevArray => [...prevArray, {
        "updatedby": data.updatedby,
        "systemUpdatedDate": data.systemUpdatedDate,
        "approvedBy": "string",
        "Glid": data.glid,
        "updateddate": data.systemUpdatedDate
      }])

    }


  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = () => {
    userApproveReject("Reset", userDetails.name, userDetails.email, chosenRecords).then(() => {
      selectedRecords([])
    })
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

console.log(activityData.approvalDate)
  return (
    <div>
       {activityData.length > 0 && <div className="mb-1 textalign-end">
                            <CSVLink filename='Approvals_Data.csv' data={activityData} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
    
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer style={{ height: "485px" }}>
          <Table stickyHeader
            className="tableheaderdesignforactivity mt-3"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"

          >
            <EnhancedTableHead

              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={records.length}
              activityData={activityData}

            />
            <TableBody>
              {activityData.length !== 0 ? stableSort(activityData, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
 
                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row, index)}
                      role="checkbox"
                      aria-checked={records.includes(index)}
                      tabIndex={-1}
                      key={row.StoreID}
                      selected={records.includes(index)}
                      className="cursor-pointer"
                    >

                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={records.includes(index)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        // onChange={(event) => handleClick(event, row, index)}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" onClick={(e) => getDetails(e, row)} className="cursor-pointer" >
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
                      <TableCell >{moment(row.systemUpdatedDate).format("MM/DD/YYYY HH:mm:ss")}</TableCell>
                      {row.isApproved === 1 ? <TableCell className="approveddesign" align="right"><p>{"APPROVED"}</p></TableCell> : row.isApproved === -1 ? <TableCell className="rejectdesign" align="right"><p>{"REJECTED"}</p></TableCell> : row.isApproved === 0 ? <TableCell className="pending__clr" align="right"><p>{"PENDING"}</p></TableCell> : null}
                      {/* <TableCell align="right">{row.ApprovalStatus}</TableCell> */}
                      <TableCell >{row.approvedBy}</TableCell>
                      {/* <TableCell>{moment(row.systemUpdatedDate).format("M/DD/YYYY HH:MM:SS")}</TableCell> */}
                      <TableCell>{row.approvalDate != null ? moment(row.approvalDate).format("M/DD/YYYY HH:mm:ss"): ''}</TableCell>
                    </TableRow>
                  );
                }):<TableRow> <TableCell colSpan={14}>No Data Available</TableCell> </TableRow>}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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

        {modal && <ApprovalDetailsModal modal={modal} modalCancel={modalCancel} storeDetails={storeDetails} />}
        {/* <div className="d-flex justify-content-center">
          <button className="buttondesignforactivity  mt-4 mb-3" onClick={() => handleSubmit()}>Reset</button>
        </div> */}
        <div className="mt-4 add__asset justify-content-center mr-3">
                                    <Button variant="contained" onClick={() => handleSubmit()} > reset</Button>
                                </div>
      </Paper>



    </div>
    </div>
  );
}

const mapStateToProps = ({ approvals, user }) => {
  return {
    activityData: approvals.activityData,
    userDetails: user.userDetails,
    storeDetails: approvals.approvalDetails
  }
}


export default connect(mapStateToProps, { loadUserApprovals, userApproveReject, approvalDetails })(Activitytab)
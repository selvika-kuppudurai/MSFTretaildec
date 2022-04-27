import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import './pendingstyle.scss'
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { loadUserApprovals, userApproveReject, approvalDetails } from "../../../redux/actions/approvalsAction"
import moment from 'moment';
import ApprovalDetailsModal from "../../approvalDetailsModal/index"
import { FcCheckmark } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'
import { CSVLink, CSVDownload } from "react-csv";
import CSVicon from '../../../assets/images/CSVicon.png'

import Button from "@material-ui/core/Button"


function createData(name, globalID, Retailer, Country, store, UserRole, timestamp) {
  return { name, globalID, Retailer, Country, store, UserRole, timestamp };
}

const rows = [
  createData('User 12324', 32156, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 2', 32156, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 3', 156, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 4', 32156, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 5', 3, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 6', 56, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 7', 32156, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),
  createData('User 8', 3, 'harvey norman', 'Australia', 'HN osborne park', 'Guest', '12/06/2021 10:30 AM'),

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
{ key: 'systemUpdatedDate', label: 'Updated on' }

]

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
  console.log(array)
  console.log(comparator)
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'glid', numeric: false, disablePadding: false, label: 'Global ID', width: "5%" },
  { id: 'storeName', numeric: false, disablePadding: false, label: 'Store Name' },
  { id: 'retailer', numeric: false, disablePadding: false, label: 'Retailer' },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'countryName', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'updatesIn', numeric: false, disablePadding: false, label: 'Changes Made to' },
  { id: 'updatedby', numeric: false, disablePadding: false, label: 'Updated By (Email ID)' },
  { id: 'updatedbyUser', numeric: false, disablePadding: false, label: 'Updated By (User )' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'systemUpdatedDate', numeric: false, disablePadding: false, label: 'Updated on' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, pendingData, handleClick } = props;
  console.log('pendingdata',pendingData)
  const createSortHandler = (property) => (event) => {

    onRequestSort(event, property);
  };

  return (

    <TableHead stickyHeader>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && pendingData.length === rowCount}
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


const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
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

const PendingTab = ({ loadUserApprovals, pendingData, userApproveReject, userDetails, approvalDetails, storeDetails }) => {

  const dispatch = useDispatch()

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('glid');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [records, selectedRecords] = useState([])

  const [chosenRecords, setChosenRecords] = useState([])


  const [selectapproval, setapproval] = useState(false)
  const[selectreject, setreject] = useState(false)
  const [modal, setModal] = useState(false)



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  useEffect(() => {
    loadUserApprovals("Manage")
    let check = "2021-09-22 04:40:29.550"
    console.log("datecheck", moment(check).format("M/DD/YYYY HH:mm:ss.SSS"))
  }, [])

  const handleSelectAllClick = (event) => {
    console.log('cc', event.target.checked)
    if (event.target.checked) {
      const records = pendingData.length > 0 && pendingData.map((n, idx) => idx);

      selectedRecords(records)

      console.log(pendingData)
      pendingData.map(d => {

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
      console.log('vvvv')
      selectedRecords([])
      setChosenRecords([])
    }
    setSelected([]);
  };

  const handleClick = (event, data, idx) => {

    console.log('xxx',event)
    console.log('xxx1',data)
    console.log('xxx2',idx)

    if (records.length > 0 && records.includes(idx)) {

      let filterRecord = records.filter(d => d !== idx)

      selectedRecords(filterRecord)
    } else {

      selectedRecords(prevArray => [...prevArray, idx])

    }
    console.log(chosenRecords.length)
    if (chosenRecords.length > 0 && chosenRecords.find(d => d.updatedby === data.updatedby && d.systemUpdatedDate === data.systemUpdatedDate)) {
      console.log(chosenRecords)
      console.log(data)
      let filtervalues = chosenRecords.filter(d => d.systemUpdatedDate !== data.systemUpdatedDate)
      console.log(filtervalues)
      setChosenRecords(filtervalues)


    } else {
      console.log('fgf')

      setChosenRecords(prevArray => [...prevArray, {
        "updatedby": data.updatedby,
        "systemUpdatedDate": data.systemUpdatedDate,
        "approvedBy": "string",
        "Glid": data.glid,
        "updateddate": data.systemUpdatedDate
      }])

    }


  };

  const checkAll = () => {

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const getDetails = (e, data) => {
    e.stopPropagation();

   
    approvalDetails(data)
    setModal(true)
  }

  const modalCancel = () => {
    dispatch({ type: "APPROVAL_DETAILS", payload: [] })
    setModal(false)
  }

  const handleSubmit = (flag) => {
    setapproval(true)
    setreject(true)
    console.log(flag)
    console.log('useremail',userDetails)
    console.log(chosenRecords, "red")
    userApproveReject(flag, userDetails.name ,userDetails.email, chosenRecords).then(() => {
      setapproval(false)
      setreject(false)
      selectedRecords([])
      setChosenRecords([])
    })
  }

  const isSelected = (idx) => idx !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div >
      {pendingData.length > 0 && <div className="mb-1 textalign-end">
                            <CSVLink filename='Pending_data.csv' data={pendingData} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
    <div className={classes.root}>
      
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        
        <TableContainer style={{ height: "485px" }}>
          <Table stickyHeader
            className="tableheaderdesign"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"

          >
        {/* {pendingData.length === 0 && <div className="table__center font-weight-bold "> No Data </div>} */}

            
            <EnhancedTableHead

              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={records.length}
              pendingData={pendingData}

            />



            <TableBody>
              {pendingData.length !== 0 ? stableSort(pendingData, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row, index)}
                      role="checkbox"
                      aria-checked={records.includes(index)}
                      tabIndex={-1}
                      key={row.name}
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
                      <TableCell onClick={(e) => getDetails(e, row)} className="cursor-pointer">{row.glid}</TableCell>
                      <TableCell>{row.storeName}</TableCell>
                      <TableCell>{row.Retailer}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.countryName}</TableCell>
                      <TableCell>{row.updatesIn}</TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.updatedby}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.updatedbyUser}
                      </TableCell>




                      <TableCell>{row.role}</TableCell>
                      <TableCell>{moment(row.systemUpdatedDate).format("M/DD/YYYY HH:mm:ss")}</TableCell>
                    </TableRow>
                  );
                }):<TableRow> <TableCell colSpan={12}>No Data Available</TableCell> </TableRow>}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6}></TableCell>
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

        <div className="d-flex justify-content-center">
          
        <div className="mt-4 add__asset__approve mr-3">
                                    <Button className={ !selectapproval ? '' : 'disabled' } variant="contained" onClick={() => handleSubmit("Approval")} > Approve</Button>
                                </div> 
          {/* <button className=" mt-4 buttondesignforpending d-flex mr-4" onClick={() => handleSubmit("Approval")}><FcCheckmark size="30" className="mr-2" /><p>Approve</p></button> */}
          <div className="mt-4 add__asset__reject">
          
                                    <Button className={ !selectreject ? '' : 'disabled' } variant="contained" onClick={() => handleSubmit("Rejected")} > Reject</Button>
                                </div>
          {/* <button className="buttondesignforpending d-flex colorchangeforpending mt-4" onClick={() => handleSubmit("Rejected")}><ImCross size="20" className="mt-3 mr-2 icondesign" /><p>Reject</p></button> */}
        </div>
      </Paper>



    </div >
    </div>
  );
}


const mapStateToProps = ({ approvals, user }) => {
  return {
    pendingData: approvals.pendingData,
    userDetails: user.userDetails,
    storeDetails: approvals.approvalDetails
  }
}

export default connect(mapStateToProps, { loadUserApprovals, userApproveReject, approvalDetails })(PendingTab);
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

import './usernamestyle.scss';
import { TableSort } from "../../helpers";

import { RiDeleteBin5Line } from "react-icons/ri"
import { MdModeEdit } from "react-icons/md"

import { IoIosArrowBack } from "react-icons/io"

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomTable from "../../components/Common/CustomTable";
import axios from "axios"
import { endPoints } from "../../config/Api";
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../components/Common/CustomTable/style.scss"
import { CSVLink, CSVDownload } from "react-csv";
import CSVicon from '../../assets/images/CSVicon.png'

// user table header
const columns = [
    { id: '#', label: '#', className: "text-c2 fw-700", width: "8%" },
    { id: 'name', label: 'User Name', className: "text-c2 fw-700", width: "8%" },
    { id: 'email', label: 'Email', className: "text-c2 fw-700", width: "8%" },
    { id: 'country', label: 'Country', className: "text-c2 fw-700", width: "5%" },
    { id: 'roleRequested', label: 'Requested Role', className: "text-c2 fw-700", width: "8%" },
    { id: 'role', label: 'Role', className: "text-c2 fw-700", width: "7%" },
    { id: 'Actions', label: 'Actions', className: "text-c2 fw-700", width: "8%" },
];

// user table csv header
const headerforcsv = [
{ key: 'name', label: 'User Name' },
{ key: 'email', label: 'Email' },
{ key: 'country', label: 'Country' },
{ key: 'roleRequested', label: 'Requested Role' },
{ key: 'role', label: 'Role' },

]


// const useStyles = makeStyles((theme) => ({
//     // table: {
//     //   minWidth: 650,
//     // },
//     root: {
//         '& .MuiTextField-root': {
//           margin: theme.spacing(1),
//           width: '25ch',
//         },
//       },
//   }));
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    // root: {
    //   '& > *': {
    //     margin: theme.spacing(1),
    //     width: '25ch',
    //   },
    // },
}));
const Usermanage = () => {
    const classes = useStyles();
    const [formpagetrue, showtheformpage] = useState(false)
    const [rows, settestfunction] = useState([])
    const [selectedrowvalue, setselectedrowvalue] = useState([])
    const [openthedeleteuserdetails, setopenthedeleteuserdetails] = useState(false)
    const [userdetailfordelete, setuserdetailfordelete] = useState([])

    const [table__loader, setLoader] = useState(true)

    const Roles = ['Admin', 'Country Lead', 'Fixture Manufacturer', 'Installer', 'Store Planner']
    // getting roles api
    useEffect(() => {
        userdeatils()
        // createuserdeatils()
    }, [])
    // function for roles
    const userdeatils = () => {
        const url = endPoints.deepDive.table_Data + '/GetAllRoles'

        setLoader(true)

        axios.get(url).then((res) => {
            settestfunction(res.data)
            setLoader(false)
        })
    }

// function for edit the user table
    const selectedvalueforeditrow = (selectedrow) => {
        setselectedrowvalue(selectedrow)
        showtheformpage(true)
    }

    const [Role, setRole] = React.useState('');

// roles fropdown function
    const handleChange = (event) => {
        setRole(event.target.value);

    };
// function for cancel button in delete dialogue box
    const handleCancelthedelete = () => {
        setopenthedeleteuserdetails(false)
    }

    // delete the user 
    const handleClosethedelete = () => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'DELETE, delete'
        }
        const url = endPoints.deepDive.table_Data + `/Roles Delete?UserName=${userdetailfordelete}`;

        setLoader(true)
        axios.delete(url).then((res) => {
            if (res.data.status === 'Success') {
                userdeatils()
            } else {
                userdeatils()
            }
            setLoader(false)
        })
            .catch(error => {
                // setErrorMessage(error.message);
                console.error('There was an error!', error);
            });
        setopenthedeleteuserdetails(false)
    }
// roles update
    const handleClose = () => {
        const url = endPoints.deepDive.table_Data + `/Roles Update?UserName=${selectedrowvalue.email}&RoleName=${Role}`

        setLoader(true)

        axios.put(url).then((res) => {
            if (res.data.status === 'Success') {
                userdeatils()
                showtheformpage(false)
                setLoader(false)
            }

        })
    }
// delete user
    const deleteuserdetails = (userdeatilsfordelete) => {
        setopenthedeleteuserdetails(true)
        setuserdetailfordelete(userdeatilsfordelete.email)
    }

    // table sort
    const onSort = (sortKey) => {
        const sortedDataforUsertable = TableSort(rows, sortKey)
        settestfunction(sortedDataforUsertable)
    }
    // return(
    //     <div>usermanage</div>
    // )


    return (
        <div>

            <div className="tabledesignforfixtureManage col-lg-12   ml-2 mr-2 mt-4">
            {rows.length > 0 && <div className="textalign-end mb-2">
                            <CSVLink filename='User_Manage_Data.csv' data={rows} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
                {!formpagetrue &&
                    <CustomTable columns={columns} onSort={(data) => onSort(data)} tableLength={rows.length} loader={table__loader} >

                        {rows.length > 0 && rows.map((data, index) => {
                            // console.log("tabledata", data)
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {data.name}
                                    </TableCell>
                                    <TableCell>
                                        {data.email}
                                    </TableCell>
                                    <TableCell>
                                        {data.country}
                                    </TableCell>
                                    <TableCell>
                                        {data.roleRequested}
                                    </TableCell>
                                    <TableCell>
                                        {data.role}
                                    </TableCell>

                                    <TableCell> <MdModeEdit size="20" className="mr-2 cursor-pointer" onClick={() => selectedvalueforeditrow(data)}></MdModeEdit><RiDeleteBin5Line size="20" className="ml-2 cursor-pointer" onClick={() => deleteuserdetails(data)}></RiDeleteBin5Line> </TableCell>

                                </TableRow>
                            )
                        })}{openthedeleteuserdetails &&
                            <div>
                                <Dialog open={openthedeleteuserdetails} onClose={handleCancelthedelete} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                                    <DialogContent>
                                        <h4>Are you sure you want to delete this User?</h4>
                                    </DialogContent>
                                    <DialogActions className="fixedselection">
                                        <Button onClick={handleCancelthedelete} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleClosethedelete} color="primary">
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>}
                    </CustomTable>
                }
            </div>


            {formpagetrue && <div className="table__style--revert">
                {/* <div className="usermangedesign">
                    <IoIosArrowBack size="30" onClick={() => showtheformpage(false)}></IoIosArrowBack>
                </div> */}
                <div className="formdesign">

                    <form className='MuiTextField-root' noValidate autoComplete="off">
                        <div className="mb-4 disabled">
                            <TextField id="standard-basic" label="Display Name" value={selectedrowvalue.name} />
                        </div>
                        <div className="mb-4 disabled">
                            <TextField id="standard-basic" label="Email" value={selectedrowvalue.email} />
                        </div>
                        <div className="mb-4 disabled">
                            <TextField id="standard-basic" label="Requested Role" value={selectedrowvalue.roleRequested} />
                        </div>
                        {/* <div className="mb-4">
                            <TextField id="standard-basic" label="Password" />
                        </div> */}
                        <div className="mb-4">
                            {/* <TextField id="standard-basic" label="Role" /> */}
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select className="widthsetup"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Role}
                                    onChange={handleChange}
                                >
                                    {Roles.length > 0 && Roles.map((data) => {
                                        return (
                                            <MenuItem value={data}>{data}</MenuItem>
                                        )
                                    })}
                                </Select>

                            </FormControl>
                        </div>
                        <div className="textaligncenter add__asset">

                            <Button variant="contained" className="width_20 mr-2" onClick={() => showtheformpage(false)} > Back</Button>

                            {/* <div className="add__asset mr-sm-3"> */}
                            <Button variant="contained" className="width_20 " onClick={handleClose} > Update User</Button>
                            {/* </div> */}
                            {/* <button className="buttondesign" onClick={handleClose}>Update User</button> */}
                        </div>

                    </form>

                </div>

            </div>
            }
        </div>
    );


}
export default Usermanage;







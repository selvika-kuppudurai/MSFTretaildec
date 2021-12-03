import './fixturestyle.scss'
// import { RiDeleteBin6Line } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { endPoints } from "../../config/Api";
import axios from "axios"
import CustomTable from "../../components/Common/CustomTable";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TableSort } from "../../helpers";
import { CSVLink, CSVDownload } from "react-csv";
import CSVicon from '../../assets/images/CSVicon.png'

// import Button from "@material-ui/core/Button"


const columns = [
  { id: 'model', label: 'Program Model' },
  { id: 'fixture', label: 'Fixture' },
  { id: 'fixtureDescription', label: 'Fixture Description' },
  { id: 'Actions', label: 'Actions' }
];

const headerforcsv = [{ key: 'model', label: 'Program Model' },
{ key: 'fixture', label: 'Fixture' },
{ key: 'fixtureDescription', label: 'Fixture Description' },
{ key: 'Actions', label: 'Actions' }

]

const FixtureManage = (props) => {

  const [open, setOpen] = useState(false);
  const [fixtureManage, setfixtureMange] = useState([])
  const [TextvaluetoupdateModel, setTextvaluetoupdateModel] = useState([])
  const [Textvaluetoupdatefixture, setTextvaluetoupdatefixture] = useState([])
  const [Textvaluetoupdatefixturedescription, setTextvaluetoupdatefixturedescription] = useState([])
  const [openthedelete, setopenfordelete] = useState(false)
  const [deletefixturedetail, deleteFixturedetail] = useState([])

  const [table__loader, setLoader] = useState(true)


  useEffect(() => {
    fixtureApicall()
  }, [])

  const handleCancelthedelete = () => {
    setopenfordelete(false)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  }
  const handleClosethedelete = () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'DELETE, delete'
    }
    const url = endPoints.deepDive.table_Data + `/TabActionDelete`;
    let params = {
      'FixtureDescription': deletefixturedetail
    }
    axios.delete(url, { params }, headers).then((res) => {
      if (res.data.status === 'Success') {
        fixtureApicall()
      } else {
        fixtureApicall()
      }
    })
      .catch(error => {
        // setErrorMessage(error.message);
        console.error('There was an error!', error);
      });
    setopenfordelete(false)

  }

  const handleSave = () => {
    const url = endPoints.deepDive.table_Data + `/TabActionInsert?Model=${TextvaluetoupdateModel}&Fixture=${Textvaluetoupdatefixture}&FixtureDescription=${Textvaluetoupdatefixturedescription}`;
    axios.post(url).then((res) => {
      if (res.data.status === 'Success') {
        fixtureApicall()
      } else {
        fixtureApicall()
      }
    });
    setOpen(false);
  };
  const fixtureApicall = () => {
    const url = endPoints.tabs.fixtures + `?param=Fixtures`;
    setLoader(true)
    axios.get(url).then((res) => {
      setfixtureMange(res.data)
      setLoader(false)
    });
  }
  const setTextValueModel = (event) => {
    setTextvaluetoupdateModel(event.target.value)

  }
  const setTextValuefixture = (event) => {
    setTextvaluetoupdatefixture(event.target.value)

  }
  const setTextValuefixturedescription = (event) => {
    setTextvaluetoupdatefixturedescription(event.target.value)

  }
  const deletefunction = (data) => {
    setopenfordelete(true)
    deleteFixturedetail(data.fixtureDescription)
    // console.log('delete', data)
  }
  const onSort = (sortKey) => {
    const sortedDataforfixturetable = TableSort(fixtureManage, sortKey)
    setfixtureMange(sortedDataforfixturetable)
  }
  return (
    <div className="col-lg-10 col-md-10 col-sm-10 fixture__table">
      <div className="headerdesignforfixturedetails">
        <div className="buttondesigninfixturemanageforfixture d-flex col-lg-12">
        {fixtureManage.length > 0 && <div className="mr-3">
                            <CSVLink filename='Fixture_Manage_Data.csv' data={fixtureManage} headers={headerforcsv}><img title="Download as csv" className="mt-1 imgwidthfordeepdive" src={CSVicon} /></CSVLink>
                        </div>}
        <div className="add__asset mr-sm-3">
                                <Button variant="contained" onClick={() => setOpen(true)} > Add Fixture</Button>
                            </div>
          {/* <button className="buttondesigninfixturemanagebordercolor" onClick={() => setOpen(true)}> Add Fixture</button> */}
        </div>
        <div className="pt-4 table-container ml-2 mr-2 d-flex">

          <CustomTable className="" columns={columns} onSort={(data) => onSort(data)} tableLength={fixtureManage.length} loader={table__loader}  >

            {fixtureManage.length > 0 && fixtureManage.map((data, index) => {


              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>
                    {data.model}
                  </TableCell>
                  <TableCell>
                    {data.fixture}
                  </TableCell>
                  <TableCell>
                    {data.fixtureDescription}
                  </TableCell>
                  <TableCell> <RiDeleteBin6Line className="cursor-pointer" onClick={() => deletefunction(data)} /> </TableCell>

                </TableRow>
              )
            })}
          </CustomTable>

        </div>
        {open &&
          <div>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
              {/* <DialogTitle id="form-dialog-title">Add Fixture</DialogTitle> */}
              <DialogContent>
                <TextField
                  onChange={setTextValueModel}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Program Model"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={setTextValuefixture}
                  margin="dense"
                  id="fixture"
                  label="Fixture"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={setTextValuefixturedescription}
                  margin="dense"
                  id="Description"
                  label="Fixture Description"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions className="fixedselection">
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>}
          {openthedelete &&
          <div>
            <Dialog open={openthedelete} onClose={handleCancelthedelete} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Delete</DialogTitle>
              <DialogContent>
                <h4>Are you sure you want to delete this Fixture?</h4>
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
      </div>
    </div>
  )
}

export default FixtureManage;
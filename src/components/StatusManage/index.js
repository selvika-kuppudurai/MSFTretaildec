import './statusstyle.scss'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { endPoints } from "../../config/Api";
import axios from "axios"
// import Button from "@material-ui/core/Button"


const StatusManage = (props) => {
    const [open, setOpen] = useState(false);
    const [statusmanage, setStatusManage] = useState([])
    const [textvaluetoupdate, setTextvaluetoupdate] = useState([])
    const [openthedeletestatus, setopenfordeletestatus] = useState(false)
    const [deletestatusdetail, setdeletestatusdetail] =useState([])

    useEffect(() => {
        StatusApicall()
    }, [])
    const handleCancelthedelete = () => {
        setopenfordeletestatus(false)
    }
    const handleClosethedelete = () => {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods': 'DELETE, delete'
      }
          const url = endPoints.deepDive.table_Data + `/TabActionDelete`;
          let params = {
            'Status': deletestatusdetail 
          }
          axios.delete(url,{params}, headers).then((res) => {
              if (res.data.status === 'Success') {
                StatusApicall()
              } else {
                StatusApicall()
              }
          })
          .catch(error => {
            // setErrorMessage(error.message);
            console.error('There was an error!', error);
        });
        setopenfordeletestatus(false)
      
        }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  }

  const handleSave = () => {
    
    const url = endPoints.deepDive.table_Data + `/TabActionInsert?Status=${textvaluetoupdate}`;
        axios.post(url).then((res) => {
            if (res.data.status === 'Success') {
                StatusApicall()
            } else {
                StatusApicall()
            }
        });
        setOpen(false);
  };
  const StatusApicall = () => {
    const url = endPoints.tabs.fixtures + `?param=FixtureStatus`;
    axios.get(url).then((res) => {(setStatusManage(res.data))});
    }
    const setTextValue = (event) => {
        setTextvaluetoupdate(event.target.value)
    }
    const deletefunction = (data) => {
        setopenfordeletestatus(true)
        setdeletestatusdetail(data.status)

        // console.log('delete', data)
      }
    const [inputfieldtrue, setinputfieldtrue] = useState(false)
    return (
        <div>
            <div className="headerdesignforfixture d-flex row">
                <div className="d-flex col-12">
                    <div className="buttondesigninfixturemanage">
                    <div className="add__asset mr-sm-3">
                                <Button variant="contained" onClick={() => setOpen(true)} > Add Status</Button>
                            </div>
                        {/* <button className="buttondesigninfixturemanagebordercolor" onClick={() => setOpen(true)}> Add Status</button> */}
                    </div>
                </div>
                {statusmanage.length > 0 && statusmanage.map((data) => {
                    return (
                        <div className="col-12 d-flex">
                            <div className="col-lg-6 col-md-4 col-sm-4 designformodelvalues">{data.status}</div>
                            <RiDeleteBin6Line className="mt-4 cursor-pointer" onClick={() => deletefunction(data)}></RiDeleteBin6Line>

                        </div>
                    )

                })
                }
                {open && 
                <div>
                <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                  {/* <DialogTitle id="form-dialog-title">Add Status</DialogTitle> */}
                  <DialogContent>
                    <TextField
                    onChange={setTextValue}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Status"
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
              {openthedeletestatus && 
                <div>
                <Dialog open={openthedeletestatus} onClose={handleCancelthedelete   } aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                  <DialogContent>
                   <h4>Are you sure you want to delete this Status?</h4>
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

export default StatusManage;
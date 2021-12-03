import './executionstyle.scss'
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

const ExcutionTierManage = (props) => {
    const [open, setOpen] = useState(false);
    const [executiontierManage, setexecutiontiermanage] = useState([])
    const [textvaluetoupdate, setTextvaluetoupdate] = useState([])
    const [openthedeleteexecution, setopenfordeleteexecutiontier] = useState(false)
    const [deleteExecutiontierdetail, deleteExecutiondetail] =useState([])

    useEffect(() => {
        executiontiermanage()
    }, [])

    const handleCancelthedelete = () => {
        setopenfordeleteexecutiontier(false)
    }
    const handleCancel = () => {
        setOpen(false);
      }
    const handleClosethedelete = () => {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods': 'DELETE'
      }
          const url = endPoints.deepDive.table_Data + `/TabActionDelete?ExecutionTier=${deleteExecutiontierdetail}`;
         
          axios.delete(url, headers).then((res) => {
              if (res.data.status === 'Success') {
                executiontiermanage()
              } else {
                executiontiermanage()
              }
          })
          .catch(error => {
            // setErrorMessage(error.message);
            console.error('There was an error!', error);
        });
        setopenfordeleteexecutiontier(false)
      
        }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    const url = endPoints.deepDive.table_Data + `/TabActionInsert?ExecutionTier1=${textvaluetoupdate}`;
    axios.post(url).then((res) => {
        if (res.data.status === 'Success') {
            executiontiermanage()
        } else {
            executiontiermanage()
        }
    });
    setOpen(false);
  };
  const executiontiermanage = () => {
    const url = endPoints.tabs.fixtures + `?param=ExecutionTier`;
    axios.get(url).then((res) => {(setexecutiontiermanage(res.data))});
    }
    const setTextValue = (event) => {
        setTextvaluetoupdate(event.target.value)
    }

    const deletefunctionexecutiontier = (data) => {
        setopenfordeleteexecutiontier(true)
        deleteExecutiondetail(data.executionTier1)
        // console.log('delete', data)
      }
    const [inputfieldtrue, setinputfieldtrue] = useState(false)
    // const val = [{ model: 'MRR', fixture: '65FX-16', description:'10 Modular Table Tower 1.6'},
    // { model: 'MRR', fixture: '10FX-16' ,description:'10 Modular Table Tower 1.6 w-Glass'},
    // { model: 'MRR', fixture: 'PCX',description:'10 Modular Table Tower 1.6 w-Glass' },
    // { model: 'MRR', fixture: 'GAMX',description:'10 Modular Table Tower 1.6 w-Glass' },
    // { model: 'Surface', fixture: 'Pinball',description:'10 Modular Table Tower 1.6 w-Glass' },
    // { model: 'surface', fixture: 'Inline',description:'10 Modular Table Tower 1.6 w-Glass' }]
    // console.log('va', val.length)
    return (
        <div>
            <div className="headerdesignforfixture d-flex row">
                <div className="d-flex col-lg-12 col-md-12 col-sm-12">
                    <div className="buttondesigninfixturemanage">
                    <div className="add__asset mr-sm-3">
                                <Button variant="contained" onClick={() => setOpen(true)} > Add Execution Tier</Button>
                            </div>
                        {/* <button className="buttondesigninfixturemanagebordercolor" onClick={() => setOpen(true)}> Add Execution Tier</button> */}
                    </div>
                </div>
                {executiontierManage.length > 0 && executiontierManage.map((data) => {
                    return (
                        <div className="col-12 d-flex">
                            <div className="col-lg-6 col-sm-4 col-md-4 designformodelvalues">{data.executionTier1}</div>
                            <RiDeleteBin6Line className="mt-4 cursor-pointer"  onClick={() => deletefunctionexecutiontier(data)}></RiDeleteBin6Line>

                        </div>
                    )

                })
                }
                {open && 
                <div>
                <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                  {/* <DialogTitle id="form-dialog-title">Add Execution Tier</DialogTitle> */}
                  <DialogContent>
                    <TextField
                    onChange={setTextValue}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Execution Tier"
                      type="text"
                      fullWidth
                    />
                    
                  </DialogContent>
                  <DialogActions className="execution">
                    <Button onClick={handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>}
              {openthedeleteexecution && 
                <div>
                <Dialog open={openthedeleteexecution} onClose={handleCancelthedelete} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                  <DialogContent>
                   <h4>Are you sure you want to delete this Execution Tier?</h4>
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

export default ExcutionTierManage;
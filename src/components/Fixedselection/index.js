import './fixedselectionstyle.scss'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { endPoints } from "../../config/Api";
import axios from "axios";
// import Button from "@material-ui/core/Button"

const FixedselectionManage = (props) => {
    const [open, setOpen] = useState(false);
    const [fixedselectionManage, setfixedselectionmanage] = useState([])
    const [textvaluetoupdate, setTextvaluetoupdate] = useState([])
    const [Updatedataresult, setUpdatedataresult] = useState([])
    const [openthedeletefixtureselection, setopenfordeletefixtureselection] = useState(false)
    const [deletefixtureselectiondetail, deleteFixtureselectiondetail] =useState([])

    useEffect(() => {
        fixedselectionmanage()
    }, [])

    const handleCancelthedelete = () => {
        setopenfordeletefixtureselection(false)
    }

    const handleCancel = () => {
        setOpen(false);
      }

    const handleClosethedelete = () => {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods': 'DELETE, delete'
      }
          const url = endPoints.deepDive.table_Data + `/TabActionDelete?FixedSelection=${deletefixtureselectiondetail}`;
 
          axios.delete(url).then((res) => {
              if (res.data.status === 'Success') {
                fixedselectionmanage()
              } else {
                fixedselectionmanage()
              }
          })
          .catch(error => {
            // setErrorMessage(error.message);
            console.error('There was an error!', error);
        });
        setopenfordeletefixtureselection(false)
      
        }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = (event) => {
        const url = endPoints.deepDive.table_Data + `/TabActionInsert?FixedSelection1=${textvaluetoupdate}`;
        axios.post(url).then((res) => {
            if (res.data.status === 'Success') {
                fixedselectionmanage()
            } else {
                fixedselectionmanage()
            }
        });
        // console.log('status', Updatedataresult)
        // if (Updatedataresult === 'Success') {
        //     fixedselectionmanage()
        // }
        setOpen(false);
    };
    const fixedselectionmanage = () => {
        const url = endPoints.tabs.fixtures + `?param=FixedSelection`;
        axios.get(url).then((res) => { (setfixedselectionmanage(res.data)) });
    }
    const [inputfieldtrue, setinputfieldtrue] = useState(false)
    const setTextValue = (event) => {
        setTextvaluetoupdate(event.target.value)
    }

    const deletefunction = (data) => {
        setopenfordeletefixtureselection(true)
        deleteFixtureselectiondetail(data.fixedSelection1)
        // console.log('delete', data)
      }
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
                        <button className="buttondesigninfixturemanagebordercolor" onClick={() => setOpen(true)}> Add Fixed Selection</button>
                    </div>
                </div>
                {fixedselectionManage.length > 0 && fixedselectionManage.map((data) => {
                    return (
                        <div className="col-12 d-flex">
                            <div className="col-lg-6 col-sm-4 col-md-4 designformodelvalues">{data.fixedSelection1}</div>
                            <RiDeleteBin6Line className="mt-4 cursor-pointer"  onClick={() => deletefunction(data)}></RiDeleteBin6Line>

                        </div>
                    )

                })
                }
                {open &&
                    <div>
                        <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                            {/* <DialogTitle id="form-dialog-title">Add Fixed Selection</DialogTitle> */}
                            <DialogContent>
                                <TextField
                                    onChange={setTextValue}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Fixed Selection"
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
                    {openthedeletefixtureselection && 
                <div>
                <Dialog open={openthedeletefixtureselection} onClose={handleCancelthedelete} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                  <DialogContent>
                   <h4>Are you sure you want to delete this Fixed Selection?</h4>
                  </DialogContent>
                  <DialogActions>
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

export default FixedselectionManage;
import './languagestyle.scss'
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


const LanguageManage = (props) => {
    const [open, setOpen] = useState(false);
    const [languagemanage, setlanguageManageApi] = useState([])
    const [textvaluetoupdate, setTextvaluetoupdate] = useState([])
    const [openthedeleteLanguage, setopenfordeleteLanguage] = useState(false)
    const [deleteLanguagedetail, setdeleteLanguagedetail] =useState([])
{/* <div className="buttondesigninfixturemanage">
                        <button className="buttondesigninfixturemanagebordercolor" onClick={() => setOpen(true)}> Add Fixture</button>
                    </div> */}
    useEffect(() => {
        languageManageApi()
    }, [])

  const handleClickOpen = () => {
      
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  }
  const handleCancelthedelete = () => {
    setopenfordeleteLanguage(false)
}
  const handleClosethedelete = () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'DELETE, delete'
  }
      const url = endPoints.deepDive.table_Data + `/TabActionDelete`;
      let params = {
        'Language': deleteLanguagedetail 
      }
      axios.delete(url,{params}, headers).then((res) => {
          if (res.data.status === 'Success') {
            languageManageApi()
          } else {
            languageManageApi()
          }
      })
      .catch(error => {
        // setErrorMessage(error.message);
        console.error('There was an error!', error);
    });
    setopenfordeleteLanguage(false)
  
    }

  const handleSave = () => {
    const url = endPoints.deepDive.table_Data + `/TabActionInsert?Language=${textvaluetoupdate}`;
    axios.post(url).then((res) => {
        if (res.data.status === 'Success') {
            languageManageApi()
        } else {
            languageManageApi()
        }
    });
    setOpen(false);
  };
  const languageManageApi = () => {
    const url = endPoints.tabs.fixtures + `?param=GraphicsLanguage`;
    axios.get(url).then((res) => {(setlanguageManageApi(res.data))});
    }
    const setTextValue = (event) => {
        setTextvaluetoupdate(event.target.value)
    }

    const deletefunction = (data) => {
        setopenfordeleteLanguage(true)
        setdeleteLanguagedetail(data.language)
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
                                <Button variant="contained" onClick={() => setOpen(true)} > Add Language</Button>
                            </div>
                        {/* <button className="buttondesigninfixturemanagebordercolor" onClick={() => setOpen(true)}> Add Graphics Language</button> */}
                    </div>
                </div>
                {languagemanage.length > 0 && languagemanage.map((data) => {
                    return (
                        <div className="col-12 d-flex">
                            <div className="col-lg-6 col-sm-4 col-md-4 designformodelvalues">{data.language}</div>
                            <RiDeleteBin6Line className="mt-4 cursor-pointer"  onClick={() => deletefunction(data)}></RiDeleteBin6Line>

                        </div>
                    )

                })
                }
                {open && 
                <div>
                <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                  {/* <DialogTitle id="form-dialog-title">Add Graphics Language</DialogTitle> */}
                  <DialogContent>
                    <TextField
                    onChange={setTextValue}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Graphics Language"
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
              {openthedeleteLanguage && 
                <div>
                <Dialog open={openthedeleteLanguage} onClose={handleCancelthedelete} aria-labelledby="form-dialog-title">
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

export default LanguageManage;
import React, { useState } from "react";
import "./style.scss"
import { AiFillDelete } from "react-icons/ai"
import ConfirmationModal from "./ConfimationModal";
import Pdficon from "../../../assets/images/pdficon.png"
import { SplitFiles } from "../../../helpers";
// import Dialoguebox from '../../components/Common/dialoguboxforupload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"

const FilePreview = ({ files, removeFile, name, disabled = false, deletecheck }) => {
    console.log("filesdata", files)

    const [modalVisible, setVisible] = useState(false)
    const[deletedialogue,setdeletedialogue] = useState(false)

    const [fileData, setFileData] = useState({
        index: null,
        file: null
    })

    const showLargePreview = (file) => {
        window.open(
            URL.createObjectURL(file),
            '_blank'
        );
    }
    const deleteFile = () => {
        removeFile(fileData.index, fileData.file)
        // cancel()
        setdeletedialogue(false)
    }

    const showFile = (file) => {
        console.log(file)
        window.open(
            file,
            '_blank'
        );
    }

    const modalCancel = () => {
        setVisible(false)
    }

    const deleteConfirmation = (idx, name) => {
console.log('gg')
        if(deletecheck === 'installation'){
       
        setdeletedialogue(true)
        } else {
            setVisible(true)
        }
        setFileData({
            index: idx,
            file: name
        })



    }
  const  handleCancelthedelete = () =>{
    setdeletedialogue(false)
  }
    return (
        <div className="d-flex file__container flex-wrap">
            {files.length > 0 && files.map((file, idx) => {

                return (
                    <>

                        <div className="file__preview p-2 m-3">
                            {!disabled && <span className="cursor-pointer file__preview-close" onClick={() => deleteConfirmation(idx, name)}>
                                <AiFillDelete className="delete__icon" size={25} />
                            </span>}
                            {file.type ? file.type !== "application/pdf" &&
                                <>
                                    <img src={URL.createObjectURL(file)} alt="imagefile" className="cursor-pointer" onClick={() => showLargePreview(file)} />

                                </>
                                :
                                file.type === undefined && file.split(".").pop() !== "pdf" && <>
                                    <img src={file +'?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D'} alt="imagefile" className="cursor-pointer" onClick={() => showFile(file +'?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D')} />
                                </>
                            }

                            {(file.type === "application/pdf" || file.type === undefined && file.split(".").pop() === "pdf") &&
                                <>

                                    <img src={Pdficon} alt="imagefile" className="cursor-pointer d-flex justify-content-center pdf__icon" onClick={() => showFile(file +'?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D')} />

                                    {/* <a href={URL.createObjectURL(file)} target="_blank" className="d-flex align-items-center pdf__file" rel="noreferrer">{file.name}</a> */}
                                </>
                            }
                        </div>



                    </>
                )
            })}
{deletedialogue &&
          <div>
            <Dialog open={deletedialogue} onClose={handleCancelthedelete} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Delete</DialogTitle>
              <DialogContent>
                <h4>Are you sure you want to delete this Fixture?</h4>
              </DialogContent>
              <DialogActions className="fixedselection">
                <Button onClick={handleCancelthedelete} color="primary">
                  Cancel
                </Button>
                <Button onClick={deleteFile} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>}
            {modalVisible && <ConfirmationModal title="Delete" cancel={modalCancel} modalVisible={modalVisible} fileData={fileData} removeFile={removeFile} />}
        </div>
    )
}

export default FilePreview;
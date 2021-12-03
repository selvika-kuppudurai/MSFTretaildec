import React from "react";
import { BsCloudUpload } from 'react-icons/bs';
import {GrDocumentUpload} from 'react-icons/gr'
import Button from "@material-ui/core/Button"
// import file from '../../../assets/images/file.png'
// import uploadimg from '../../../assets/images/Upload.PNG'


const UploadComponent = ({ placeholder, multiple = false, name = "", storeFiles, disabled = false }) => {
console.log('7')
    return (
        <div className="upload__container">
         
            <div className="mt-4 add__asset">
                                    <Button variant="contained" onClick={() => document.getElementById(name).click()} > Upload</Button>
                                </div>
                {/* <button className="btn px-5 d-flex buttondesignforupload" onClick={() => document.getElementById(name).click()}>Upload</button> */}
               {/* <img className="ml-2 icon__clr__upload cursor-pointer" src={uploadimg} onClick={() => document.getElementById(name).click()} />   */}
                {/* <input placeholder={placeholder} onClick={() => document.getElementById("file-upload").click()} /> */}

            <input type="file" disabled={disabled} name={name} onChange={(e) => storeFiles(e, e.target.name)} multiple={multiple} id={name} style={{ display: "none" }} onClick={(e) => e.currentTarget.value = null} />
        </div>
    )
}

export default UploadComponent;